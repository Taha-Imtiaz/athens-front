import React, { Component } from "react";
import style from "./Calendar.module.css";

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
   showIndex:null,
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
        showIndex:null
      })
    } else {
      this.setState({
        showIndex:i
      })
    }
  };
  changeDate = (x) => {
    console.log(x);
    var date = x;
    getJobsByDate(x).then((res) => {
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
          console.log(res)
        this.setState({
          currentDayJobs: res.data.jobs,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getJobDetails = (e) => {
    console.log(e);
    getJob(e.id)
      .then((res) => {
        console.log(res.data);
        this.setState({ currentDayJobs: res.data.job });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.currentDayJobs);
    return (
      <div>
        <div className={`row ${style.toprow}`}>
          <div className="col-9">
            <div className={style.cal}>
              <Calendar
                // selectable
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
              />
            </div>
          </div>

          <div className="col-3 text-center">
            {this.state.job ? (
              <div>
                <h5 className={style.head}>{new Date().toString()}</h5>

                  <div className="card-header row"
                  id="headingOne"
                  onClick={() => this.toggleCollapse()}>


               <div>
               {this.state.job.description}
               </div>

                <div
                  id="#collapse"
                  // className={this.state.showIndex== i ? "show" : "collapse"}
                  aria-labelledby="headingOne"
                  
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <h5>{this.state.job.title}</h5>
                    <h6 >
                      {this.state.job.status}
                    </h6>
                    <p style={{ whiteSpace: "pre" }}>
                      {this.state.job.description}
                    </p>
                    <p >
                      Customer:
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/customer/detail/${this.state.job.customer._id}`}
                      >
                        &nbsp;
                        {this.state.job.customer.email}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              </div>
            ) : (
              <div>
               
                {this.state.currentDayJobs.length  ?
                <div>
                  {this.state.currentDayJobs.map((job) => (
                  <div>
                    <div className={`card ${style.cardCustom}`}>
                      <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {job.status}
                        </h6>
                        <p className="card-text" style={{ whiteSpace: "pre" }}>
                          {job.description}
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
                </div> :
                
               <div>
                 {this.state.currentDayJobs.length !== 0 ? 
                //  currentDayJobs is a object
                <div className={`card ${style.cardCustom}`}>
                <div className="card-body">
                  <h5 className="card-title">
                    { this.state.currentDayJobs?.title}
                    
                    </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                 { this.state.currentDayJobs?.status}   
                  </h6>
                  <p className="card-text" style={{ whiteSpace: "pre" }}>
                    { this.state.currentDayJobs?.description}
                  </p>
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
              </div> : <h6>No Jobs Available</h6> 
                }
               </div>
                }
                </div>
             
            )}
            



                {/* <div
                  key={i}
                  className="row"
                  style={{
                    // height: "4rem",
                    overflow: "hidden",
                    // backgroundColor: "red",
                    width: "100%",
                    display: "flex",
                  }}
                  className="card-header"
                  id="headingOne"
                  onClick={() => this.toggleCollapse(i)}
                  onDoubleClick={() => jobDetailsNavigate(list._id)}
                >

                  <div
                  id="#collapse"
                  className={this.state.showIndex== i ? "show" : "collapse"}
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <h4 style={{ margin: "1rem 0" }}>Job Details</h4>
                    <div className="row">
                      <div className="col-3">
                        <h6>Job Id</h6>
                      </div>
                      <div className="col-3">
                        <h6>Job Title</h6>
                      </div>
                      <div className="col-3">
                        <h6>Job Type</h6>
                      </div>
                      <div className="col-3">
                        <h6>Status</h6>
                      </div>
                    </div>

                    <div className="row" style={{ fontSize: "0.92rem" }}>
                      <div className="col-3">
                        {list.jobId} {list.customer.lastName}
                      </div>
                      <div className="col-3">{list.title}</div>
                      <div className="col-3">{list.jobType}</div>
                      <div className="col-3">
                        <Chip
                          label={list.status}
                          clickable
                          size="small"
                          color="primary"
                          variant="outlined"
                        ></Chip>
                      </div>
                    </div>
                    <div className="row">
                      <h5
                        style={{
                          margin: "1rem 0",
                          transform: "translateX(1rem)",
                        }}
                      >
                        Job Description
                      </h5>
                    </div>
                    <div className="row" style={{ margin: "0.4rem 0" }}>
                      <p>{list.description}</p>
                    </div>
                    <hr />
                    <h6 style={{ margin: "1rem 0" }}>Customer Details</h6>
                    <div className="row">
                      <div className="col-4">
                        <h6>Name</h6>
                      </div>
                      <div className="col-4">
                        <h6>Email</h6>
                      </div>
                      <div className="col-4">
                        <h6>Phone</h6>
                      </div>
                    </div>*/}

                    {/* key={x._id} */}
                    {/* <div className="row " style={{ fontSize: "0.92rem" }}>
                      <div className="col-4">
                        {list.customer.firstName} {list.customer.lastName}
                      </div>
                      <div className="col-4">{list.customer.email}</div>
                      <div className="col-4">{list.customer.phone}</div>
                    </div>
                  </div>
                </div>
                </div>  */}
           </div>
         </div>
       </div>
    );
  }
}

 {/* var actions = {
     getJobsByDate
   }

   export default connect(null, actions)(CalendarApp) */}
export default CalendarApp;
