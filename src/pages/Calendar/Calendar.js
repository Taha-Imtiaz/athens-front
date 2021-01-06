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
    showIndex: null,
    currentDayJobs: [],
  };

  componentDidMount = () => {
    // const { getJobsByDate } = this.props;
    const date = new Date();
    getJobsByDate(date).then((res) => {
      console.log(res)
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
        console.log(res.data.data)
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

  toggleCollapse = (i) => {
    if (i == this.state.showIndex) {
      this.setState({
        showIndex: null,
      });
    } else {
      this.setState({
        showIndex: i,
      });
    }
  };

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
    var {getJob, job} = this.props
    console.log(job)
    getJob(e.id)
    this.setState({
      currentDayJobs:job,
      date: e.start,
    })
      // .then((res) => {
      //   this.setState({
      //     currentDayJobs: res.data.data,
      //     date: e.start,
      //   });
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };

  getJobDetailsOnSlotClick = (e) => {
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

    getAllJobsOnDate(date)
      .then((res) => {
        console.log(res)
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
    let date = new Date(startTime)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  render() {
    return (
      <div>
        {/* <h2 className={style.toprow}>Calender </h2> */}
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
               {this.state.currentDayJobs.length ? (
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
                  </h5>
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
                          // onClick={() => this.toggleCollapse(i)}
                          aria-expanded="true"
                          data-toggle="collapse"
                          data-target={`#collapse${i}`}
                          aria-controls="collapse"
                        >
                          <div>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/job/details/${job._id}`}
                            >
                              &nbsp;
                              {job.title}
                            </Link>
                             <h6>{job.title}</h6> 
                          </div>
                          <div>
                            <label style={{display:"flex",fontWeight:"bold",margin: '0', padding:"0"}}>Start Time</label>

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
                            <Chip
                              label={job.status}
                              clickable
                              color="primary"
                              variant="outlined"
                              size="small"
                              style={{ margin: " 0 0.2rem" }}
                            /> 
                          </div>
                        </div>

                        <div
                          id={`collapse${i}`}
                          // className={
                          //   // this.state.showIndex === i ? "show" : "collapse"
                          // }
                          class="collapse "
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
                                  size = "small"
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
              ) : 
              ( 
                <div>
                  {this.state.currentDayJobs.length !== 0 ? (
                    //  currentDayJobs is a object

                    <div>
                      <h5
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontFamily: "sans-serif",
                        }}
                      >
                        {this.state.date.toString()}
                      </h5>
                      <div
                        id="accordion"
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        <div className={`card ${style.card}`}>
                          <div
                            class={`card-header ${style.cardHeader}`}
                            id="headingOne"
                            data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <div>
                              {/* <h6>

                                {this.state.currentDayJobs ?.title}
                              </h6> */}
                              <Link
                                style={{ textDecoration: "none" }}
                                to={`/job/details/${this.state.currentDayJobs?._id}`}
                              >
                                &nbsp;
                                {this.state.currentDayJobs?.title}
                              </Link>
                            </div>
                            <div>
                              {this.state.currentDayJobs?.startTime && (
                                <Chip
                                // {this.formatAMPM(job.startTime)}
                                  label={this.formatAMPM(this.state.currentDayJobs?.startTime)}
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: " 0 0.2rem" }}
                                />
                              )}
                              {/* <Chip
                                label={this.state.currentDayJobs?.status}
                                clickable
                                color="primary"
                                variant="outlined"
                                size="small"
                                style={{ margin: " 0 0.2rem" }}
                              /> */}
                            </div>
                          </div>
                          <div
                            id="collapseOne"
                            class="collapse show"
                            // className={this.state.showIndex === i ? "show" : "collapse"}
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              <p
                                className="card-text"
                                style={{ whiteSpace: "pre-line" }}
                              >
                                {parse(this.state.currentDayJobs?.description)}
                              </p>
                              <div>
                              {this.state.currentDayJobs.services.map((service) => (
                                <Chip
                                  label={service.name}
                                  size = "small"
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
                                  to={`/customer/detail/${this.state.currentDayJobs?.customer?._id}`}
                                >
                                  &nbsp;
                                  {this.state.currentDayJobs?.customer?.email}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontFamily:
                          "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
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
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


  var actions = {
     getJob
   }

  var mapStateToProps = (state) =>({
    job: state.jobs?.job
  })  

export default connect(mapStateToProps, actions)(CalendarApp);