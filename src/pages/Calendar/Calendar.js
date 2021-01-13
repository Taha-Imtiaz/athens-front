import React, { Component, Children } from "react";
import style from "./Calendar.module.css";
import Chip from "@material-ui/core/Chip";
// import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import 'react-big-calendar/lib/sass/styles';
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getJobsByDate,
  getJob,
  getAllJobsOnDate,
  getCurrentDayJob,
} from "../../Redux/Job/jobActions";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

import axios from "axios";
import { connect } from "react-redux";

const localizer = momentLocalizer(moment);
const now = new Date();

class CalendarApp extends Component {
  state = {
    date: new Date(),
    job: "",
    myEventsList: [],
   

    currentDayJobs: [],
  };

  componentDidMount = () => {
    // const { getJobsByDate } = this.props;
    const date = new Date();
    getJobsByDate(date).then((res) => {
      console.log(res);
      let jobs = [];
      res.data.data.map((x) => {
        x.dates.map((y) => {
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

  onSelect = (x) => console.log(x);
  onChange = (date) => this.setState({ date });
  handleSelect = (x) => console.log(x);

  // toggleCollapse = (e, i, id) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   console.log(i);
  //   if (i === this.state.showIndex && id === e.id) {
  //     console.log(this.state.showIndex, i);
  //     this.setState({
       
  //     });
  //   } else {
  //     console.log(this.state.showIndex, i);
  //     this.setState({
  //       showIndex: i,
  //     });
  //   }
  // };

  changeDate = (x) => {
    var date = x;
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.data.map((x) => {
        x.dates.map((y) => {
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

  getJobDetails = (e) => {
    // var { getJob, job } = this.props;
    console.log(e);
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

  getJobDetailsOnSlotClick = (e) => {
    console.log(e);
    let date = e.end;
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.data.map((x) => {
        x.dates.map((y) => {
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
    console.log(date);
    getAllJobsOnDate(date)
      .then((res) => {
        console.log(res);
        this.setState({
          currentDayJobs: res.data.data,
          date: date,
         
        });
      })
      .catch((error) => {
        console.log(error);
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
    console.log(this.state.currentDayJobs);
    return (
      <div>
        <div className={`row ${style.toprow}`}>
          <div
            className="col-9"
            style={{
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <div className={style.cal}>
              <Calendar
                selectable={true}
                localizer={localizer}
                events={this.state.myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: "99%" }}
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
          </div>

          <div className="col-3 text-left">
            <div>
              {this.state?.currentDayJobs?.length ? (
                <div>
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {this.state.date.toDateString()}
                  </h5>{" "}
                  <hr />
                  {this.state.currentDayJobs.map((job, i) => (
                    <div
                      id="accordion"
                      style={{
                        fontFamily:
                          "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                      }}
                    >
                      <div
                        className={`card ${style.card}`}
                        style={{
                          marginBottom: "1.5rem",
                        }}
                      >
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
                                style={{ textDecoration: "none" }}
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
                                  style={{ margin: " 0 0.2rem" }}
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
                            <p
                              className="card-text"
                              style={{ whiteSpace: "pre-line" }}
                            >
                              {parse(job.description)}
                            </p>
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
                                style={{ textDecoration: "none" }}
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
                <div
                  style={{
                    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {this.state.date.toDateString()}
                  </h5>
                  <hr />
                  <h5
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <img src="/images/no-data-found.png" />
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CalendarApp;
