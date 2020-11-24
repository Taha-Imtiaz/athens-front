import React, { Component } from "react";
import style from "./Calendar.module.css";
import Chip from '@material-ui/core/Chip';
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
      let jobs = [];
      res.data.jobs.map((x) => {
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
          currentDayJobs: res.data.jobs,
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
    console.log(x);
    var date = x;
    console.log(date.toString());

  };

  getJobDetails = (e) => {
    console.log(e);
    getJob(e.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          currentDayJobs: res.data.job,
          date: res.data.job.dates,
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getJobDetailsOnSlotClick = (e) => {
    let date = e.end;
    getJobsByDate(date).then((res) => {
      let jobs = [];
      res.data.jobs.map((x) => {
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
        console.log(date)
        console.log(res);
        this.setState({
          currentDayJobs: res.data.jobs,
          date: date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.currentDayJobs);
    return (
      <div>
        <div className={`row ${style.toprow}`}>
          <div className="col-9">
            <div className={style.cal}>
              <Calendar
                selectable
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
              />
            </div>
          </div>

          <div className="col-3 text-left">
            <div>
              {this.state.currentDayJobs.length ? (
                <div>
                  <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{this.state.date.toDateString()}</h5>
                  {this.state.currentDayJobs.map((job, i) => (
                    <div
                      className={`card ${style.card}`}
                      style={
                        {
                          marginBottom: "1.5rem",
                          // boxShadow: "0px 2px lightgrey"
                        }
                      }
                    >
                      <div
                        className={`card-header ${style.cardHeader}`}
                        id="headingOne"
                        onClick={() => this.toggleCollapse(i)}
                      >
                        <div>
                        <Link
                              style={{ textDecoration: "none" }}
                              to={`/job/details/${job._id}`}
                            >
                              &nbsp;
                              {job.title}
                            </Link>
                          {/* <h6>{job.title}</h6> */}
                        </div>
                        <div>
                          {/* <label style={{display:"flex",fontWeight:"bold",margin: '0', padding:"0"}}>Start Time</label> */}

                          {job.startTime ? <Chip
                            label={job.startTime}
                            clickable
                            color="primary"
                            variant="outlined"
                            size="small"
                            style={{ margin: " 0 0.2rem" }}
                          /> : null}
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
                        id="#collapse"
                        className={
                          this.state.showIndex === i ? "show" : "collapse"
                        }
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className="card-body">

                          <p
                            className="card-text"
                          // style={{ whiteSpace: "pre" }}
                          >
                            {`${job.description}`}
                          </p>
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
                  ))}
                </div>
              ) : (
                  <div>
                    <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{this.state.date[0]}</h5>
                    {this.state.currentDayJobs.length !== 0 ? (
                      //  currentDayJobs is a object
                      <div id="accordion">
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
                              to={`/job/details/${this.state.currentDayJobs ?._id}`}
                            >
                              &nbsp;
                              {this.state.currentDayJobs ?.title}
                            </Link>
                            </div>
                            <div>
                              <Chip
                                label={this.state.currentDayJobs ?.startTime ? this.state.currentDayJobs ?.startTime : null}
                                clickable
                                color="primary"
                                variant="outlined"
                                size="small"
                                style={{ margin: " 0 0.2rem" }}
                              />
                              <Chip
                                label={this.state.currentDayJobs ?.status}
                                clickable
                                color="primary"
                                variant="outlined"
                                size="small"
                                style={{ margin: " 0 0.2rem" }}
                              />
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

                              >
                                {this.state.currentDayJobs ?.description}
                              </p>
                              <p className="card-text">
                                Customer:
                              <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/customer/detail/${this.state.currentDayJobs ?.customer ?._id}`}
                                >
                                  &nbsp;
                                {this.state.currentDayJobs ?.customer ?.email}
                                </Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div>
                          <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{this.state.date.toDateString()}</h5>
                          <hr />
                          <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>No Jobs Available</h5>
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

{
  /* var actions = {
     getJobsByDate
   }

   export default connect(null, actions)(CalendarApp) */
}
export default CalendarApp;
