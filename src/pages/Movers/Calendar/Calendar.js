import React, { Component, Children } from "react";
import style from "./Calendar.module.css";
import Chip from "@material-ui/core/Chip";

// import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import 'react-big-calendar/lib/sass/styles';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getMoverJobs, getJob } from "../../../Redux/Mover/moverActions";
import { getJobsByDate } from "../../../Redux/Job/jobActions";
import { connect } from "react-redux";

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
    const { user } = this.props;
    const date = new Date();
    getMoverJobs(date).then((res) => {
      let jobs = [];
      let currentDayJobs = [];
      res.data.jobs.map((x) => {
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
        jobs: res.data.jobs,
      });
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
    getMoverJobs(x).then((res) => {
      let jobs = [];
      let currentDayJobs = [];

      res.data.jobs.map((x) => {
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

  getJobDetails = (e) => {
    getJob(e.id)
      .then((res) => {
        console.log(res.data.job)
        this.setState({ currentDayJobs: res.data.job, date: e.start });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getJobDetailsOnSlotClick = (e) => {
    let date = e.end;
    let currentDayJobs = [];
    this.state.jobs.map((x) => {
      x.dates.map((y) => {
        if (y == date.toDateString()) {
          currentDayJobs.push(x);
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
      <div>
        <div className={`row ${style.toprow}`}>
          <div
            className="col-9"
            style={{
              fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
               <div className={`d-flex `} >
                    <div className={` ${style.btn}`} style={{margin:"1rem 0"}}>
                        <Link style={{ textDecoration: "none" }} to='/mover/availability'>
                             {/* <Button name="Set Availability" /> */}
                             <Button
                    type="button"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                      float: "right",
                    //   margin: "0 0rem",
                    }}>
                  Set Availability</Button>
                             
                             </Link>
                    </div>
                    <div className={style.btn2} style={{margin:"1rem 0rem"}}>
                        <Link style={{ textDecoration: "none" }} to='/mover/holidaycalendar'>
                        <Button
                    type="button"
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                      float: "right",
                      margin: "0 0.4rem",
                    }}>
                  Request Holidays</Button>
                             {/* <Button name="Request Holidays" /> */}
                             </Link>
                    </div>
                </div>
            <div >
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
                      key={i}
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
                          // boxShadow: "0px 2px lightgrey"
                        }}
                      >
                        {/* data-toggle="collapse"
                            data-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne" */}
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
                            {/* <h6>{job.title}</h6> */}
                          </div>
                          <div>
                            {/* <label style={{display:"flex",fontWeight:"bold",margin: '0', padding:"0"}}>Start Time</label> */}

                            {job.startTime && (
                              <Chip
                                label={job.startTime}
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
                          className="collapse "
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <p
                              className="card-text"
                              style={{whiteSpace:"pre-line" }}
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
                    </div>
                  ))}
                </div>
              ) : (
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
                            className={`card-header ${style.cardHeader}`}
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
                                  label={this.state.currentDayJobs?.startTime}
                                  clickable
                                  color="primary"
                                  variant="outlined"
                                  size="small"
                                  style={{ margin: " 0 0.2rem" }}
                                />
                              )}
                              <Chip
                                label={this.state.currentDayJobs?.status}
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
                            className="collapse show"
                            // className={this.state.showIndex === i ? "show" : "collapse"}
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className="card-body">
                              <p className="card-text">
                                {this.state.currentDayJobs?.description}
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

        {/* <div className={`row ${style.toprow}`}>
                    <div className="col-8">
                        <div className={style.cal}>
                            <Calendar
                                selectable
                                localizer={localizer}
                                events={this.state.myEventsList}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500, width: '90%' }}
                                views={{
                                    month: true
                                }}
                                popup={true}
                                onNavigate={this.changeDate}
                                onSelectEvent={this.getJobDetails}
                                onSelectSlot={this.getJobDetailsOnSlotClick}
                            />
                        </div>
                    </div>

                    <div className="col-3 text-left">
                        {this.state.job ? <div>
                            <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>{this.state.date.toDateString()}</h5>

                            <div id="accordion" style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>

                                <div className={`card ${style.cardCustom} ${style.card}`}
                                    style={{ marginBottom: "1.5rem" }}
                                >
                                    <div
                                        className={`card-header ${style.cardHeader}`}
                                        id="headingOne"
                                        aria-expanded="true"
                                        data-toggle="collapse"
                                        href={`#collapse${this.state.myEventsList.length}`}
                                        aria-controls="collapse"
                                    >
                                        <div>
                                            <Link
                                                style={{ textDecoration: "none" }}
                                                to={`/job/details/${this.state.job._id}`}
                                            >
                                                &nbsp;
                                        {this.state.job.title}
                                            </Link>
                                        </div>
                                        <div>
                                            {this.state.job.startTime && <Chip
                                                label={this.state.job.startTime}
                                                clickable
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                style={{ margin: " 0 0.2rem" }}
                                            />}
                                            <Chip
                                                label={this.state.job.status}
                                                clickable
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                style={{ margin: " 0 0.2rem" }}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        id={`collapse${this.state.myEventsList.length}`}
                                        className="collapse show"
                                        aria-labelledby="headingOne"
                                        data-parent="#accordion"
                                    >

                                        <div className="card-body">
                                            <h5 className="card-title">{this.state.job.title}</h5>
                                            <p className="card-text" style={{ whiteSpace:"pre-line"}}>{this.state.job.description}</p>
                                            <p className="card-text">Customer:
                                                        <Link
                                                    style={{ textDecoration: "none" }}
                                                    to={`/customer/detail/${this.state.job.customer._id}`}>
                                                    &nbsp;
                                                                {this.state.job.customer.email}
                                                </Link></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> : <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>No Jobs available</h5>}



                    </div>
                </div> */}
      </div>
    );
  }
}

// export default MoversCalendar;
var mapStateToProps = (state) => ({
  // moverJobs: state.moverJobs,
  user: state.users.user,
});

// var actions = {
//     getMover
// };

export default connect(mapStateToProps, null)(MoversCalendar);
