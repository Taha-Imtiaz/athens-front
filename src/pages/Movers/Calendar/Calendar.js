import React, { Component, Children } from "react";
import style from "./Calendar.module.css";
import Chip from "@material-ui/core/Chip";
import "react-calendar/dist/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getMoverJobs } from "../../../Redux/Mover/moverActions";
import parse from "html-react-parser";
import { getCurrentDayJob } from "../../../Redux/Job/jobActions";

const localizer = momentLocalizer(moment);
const now = new Date();

class MoversCalendar extends Component {
  state = {
    date: new Date(),
    myEventsList: [],
    showIndex: null,
    job: "",
    currentDayJobs: [],
    jobs: [],
  };
  componentDidMount = () => {
    const date = new Date();
    getMoverJobs(date).then((res) => {
      let jobs = [];
      console.log(res.data);
      let currentDayJobs = [];
      res.data.data.map((x) => {
        x.dates.map((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x._id,
          };
          jobs.push(obj);
          if (y == date.toDateString()) {
            currentDayJobs.push(x);
          }
        });
      });
      this.setState({
        myEventsList: jobs,
        currentDayJobs,
        jobs: res.data.data,
      });
    });
  };

  changeDate = (x) => {
    var date = x;
    getMoverJobs(x).then((res) => {
      let jobs = [];
      let currentDayJobs = [];

      res.data.data.map((x) => {
        x.dates.map((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x._id,
          };
          jobs.push(obj);
          if (y == date.toDateString()) {
            currentDayJobs.push(x);
          }
        });
      });
      this.setState({
        myEventsList: jobs,
        currentDayJobs,
        date: date,
      });
    });
  };
  //format time
  formatAMPM = (startTime) => {
    let date = new Date(startTime);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  getJobDetails = (e) => {
    getCurrentDayJob(e.id)
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          currentDayJobs: [res.data.data],
          date: new Date(e.start),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getJobDetailsOnSlotClick = (e) => {
    let date = e.end;
    let currentDayJobs = [];
    console.log(this.state.jobs);
    this.state.jobs.map((x) => {
      x.dates.map((y) => {
        if (y == date.toDateString()) {
          currentDayJobs.push(x);
          console.log(currentDayJobs);
        }
      });
    });
    this.setState({
      currentDayJobs,
      date,
    });
  };

  coloredDateCellWrapper = ({ children, value }) => {
    let date = new Date(this.state.date);
    return React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor:
          value.toDateString() == date.toDateString() ? "#eaf6fe" : "white",
        border:
          value.toDateString() == date.toDateString()
            ? "1px solid #00adee"
            : "",
      },
    });
  };

  render() {
    return (
      <div className={style.calenderContainer}>
        <div className={`${style.buttons}`}>
          <Link className={style.link} to="/mover/availability">
            <Button type="button" className={style.button}>
              Set Availability
            </Button>
          </Link>

          <Link className={style.link} to="/mover/holidaycalendar">
            <Button type="button" className={style.button}>
              Request Holidays
            </Button>
          </Link>
        </div>
        <div className={style.calender}>
          <div>
            <Calendar
              className={style.styleCalender}
              selectable={true}
              localizer={localizer}
              events={this.state.myEventsList}
              startAccessor="start"
              endAccessor="end"
              views={{
                month: true,
              }}
              popup={true}
              onNavigate={this.changeDate}
              onSelectEvent={this.getJobDetails}
              onSelectSlot={this.getJobDetailsOnSlotClick}
              // selected = {true}
              // slotPropGetter={(date) => {
              //   return { style: { backgroundColor: '#3174ad', borderTop: '1px solid #3174ad' } }
              // }
              // }
              components={{
                // you have to pass your custom wrapper here
                // so that it actually gets used
                dateCellWrapper: this.coloredDateCellWrapper,
              }}
            />
          </div>
          <div>
            {this.state.currentDayJobs?.length ? (
              <div>
                <h5 className={style.flex}>{this.state.date.toDateString()}</h5>
                {this.state.currentDayJobs.map((job, i) => (
                  <div key={i} id="accordion">
                    <div className={`card ${style.card}`}>
                      <div
                        className={`card-header ${style.cardHeader}`}
                        className="collapsed"
                        id="headingOne"
                        aria-expanded="false"
                        data-toggle="collapse"
                        data-target={`#collapse${i}`}
                        aria-controls="collapse"
                      >
                        <div>
                          <Link
                            className={style.link}
                            to={`/job/detail/${job._id}`}
                          >
                            &nbsp;
                            {job.title}
                          </Link>
                          {/* <h6>{job.title}</h6> */}
                        </div>
                        <div>
                          {job.startTime && (
                            <Chip
                              label={this.formatAMPM(job.startTime)}
                              clickable
                              color="primary"
                              variant="outlined"
                              size="small"
                            />
                          )}
                          <Chip
                            label={job.status}
                            clickable
                            color="primary"
                            variant="outlined"
                            size="small"
                          />
                        </div>
                      </div>

                      <div
                        id={`collapse${i}`}
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <span className={`card-text ${style.jobDescription}`}>
                            {parse(job.description)}
                          </span>
                          <div>
                            {job.services.map((service) => (
                              <Chip
                                label={service.name}
                                size="small"
                                clickable
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </div>
                          <p className="card-text">
                            Customer:
                            <Link
                              className={style.link}
                              to={`/customer/detail/${job.customer._id}`}
                            >
                              &nbsp;
                              {job.customer.email}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <h5 className={style.flex}>{this.state.date.toDateString()}</h5>
                <hr />
                <h5 className={style.flex}>
                  <img src="/images/no-data-found.png" />
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MoversCalendar;
