import React, { Component, Children } from "react";
import style from "./Calendar.module.css";
import Chip from "@material-ui/core/Chip";

import "react-calendar/dist/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getJobsByDate,
  getAllJobsOnDate,
  getCurrentDayJob,
} from "../../Redux/Job/jobActions";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const localizer = momentLocalizer(moment);

class CalendarApp extends Component {
  //defining state
  state = {
    date: new Date(),
    job: "",
    myEventsList: [],

    currentDayJobs: [],
  };

  componentDidMount = () => {
    // const { getJobsByDate } = this.props;
    const date = new Date();
    //fetch jobs of current month
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.data.forEach((x) => {
        x.dates.forEach((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x.id,
          };
          jobs.push(obj);
        });
      });
      this.setState({
        myEventsList: jobs,
      });
    });
    //fetch jobs of current date/day

    getAllJobsOnDate(date)
      .then((res) => {
        this.setState({
          currentDayJobs: res.data.data,
          date: date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //handler called when we change date
  changeDate = (x) => {
    var date = x;
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.data.forEach((x) => {
        x.dates.forEach((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x.id,
          };
          jobs.push(obj);
        });
      });
      this.setState({
        myEventsList: jobs,
      });
    });

    getAllJobsOnDate(date)
      .then((res) => {
        this.setState({
          currentDayJobs: res.data.data,
          date: date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //get job details when we click a job of a particular date
  getJobDetails = (e) => {
    getCurrentDayJob(e.id)
      .then((res) => {
        this.setState({
          currentDayJobs: [res.data.data],
          date: new Date(e.start),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //get all jobs of a particular date(when we clicked a box)
  getJobDetailsOnSlotClick = (e) => {
    let date = e.end;
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.data.forEach((x) => {
        x.dates.forEach((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x.id,
          };
          jobs.push(obj);
        });
      });
      this.setState({
        myEventsList: jobs,
      });
    });
    getAllJobsOnDate(date)
      .then((res) => {
        this.setState({
          currentDayJobs: res.data.data,
          date: date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //coloured box(box-styling)
  coloredDateCellWrapper = ({ children, value }) => {
    let date = new Date(this.state.date);
    return React.cloneElement(Children.only(children), {
      style: {
        ...children.style,
        backgroundColor:
          value.toDateString() === date.toDateString() ? "#eaf6fe" : "white",
        border:
          value.toDateString() === date.toDateString()
            ? "1px solid #00adee"
            : "",
      },
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

  render() {
    return (
      <div className={style.calenderContainer}>
        <div className={style.calender}>
          <div className={style.calenderContent}>
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

          <div className={style.sideContent}>
            {this.state?.currentDayJobs?.length ? (
              <div>
                <h5 className={style.flex}>{this.state.date.toDateString()}</h5>{" "}
                <hr />
                {this.state.currentDayJobs.map((job, i) => (
                  <div id="accordion" key={i}>
                    <div className={`card ${style.card}`}>
                      <div
                        className={`card-header ${style.cardHeader}`}
                        id="headingOne"
                      >
                        <div
                          className="collapsed"
                          aria-expanded="false"
                          // onClick = {(e) =>this.toggleCollapse(e, i,job._id)}
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
                          </div>
                        </div>
                      </div>

                      <div
                        id={`collapse${i}`}
                        className={"collapse"}
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body">
                          <div className={`card-text ${style.jobDescription}`}>
                            {parse(job.description)}
                          </div>
                          <div>
                            {job.services.map((service, i) => (
                              <Chip
                                key={i}
                                label={service.name}
                                size="small"
                                clickable
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </div>
                          <div className="card-text">
                            Customer:
                            <Link
                              className={style.link}
                              to={`/customer/detail/${job.customer._id}`}
                            >
                              &nbsp;
                              {job.customer.email}
                            </Link>
                          </div>
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
                <h5>
                  <img src="/images/no-data-found.png" alt="" />
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarApp;
