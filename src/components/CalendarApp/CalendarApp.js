import React, { useEffect, useState, Children } from "react";
import { getJobsByDate } from "../../Redux/Job/jobActions";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { connect } from "react-redux";
import "react-calendar/dist/Calendar.css";
import style from "./CalendarApp.module.css";
import Chip from "@material-ui/core/Chip";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { cloneDeep } from "lodash";

const localizer = momentLocalizer(moment);

const CalendarApp = (props) => {
  const [state, setState] = useState({
    date: new Date(),
    myEventsList: [],
    currentDayJobs: [],
    jobs: [],
  });
  const [count, setCount] = useState({
    job: "",
    movers: "",
  });
  let { user, getJobsByDate } = props;
  //get count of job and movers
  const getCount = (e, jobs) => {
    // let jobs = cloneDeep(state.jobs);
    let currentDayJobs = [];
    jobs.forEach((x) => {
      x.dates.forEach((y) => {
        if (new Date(y).toDateString() === new Date(e.end).toDateString()) {
          currentDayJobs.push(x);
        }
        else if (new Date(y).toDateString() === new Date(e).toDateString()) {
          currentDayJobs.push(x);
        }
      });
    });

    setCount({
      ...count,
      job: currentDayJobs.length,
      movers: currentDayJobs.reduce(
        (sum, currentValue) => sum + currentValue.assigneeRequired,
        0
      ),
    });
  };
  useEffect(() => {
    let body;
    if (user) {
      if (user.role === "mover") {
        body = {
          date: new Date().toDateString(),
          id: user._id,
        };
      } else {
        body = {
          date: new Date().toDateString(),
        };
      }
      //fetch jobs of current month
      getJobsByDate(body, (res) => {
        let jobs = [];
        let currentDayJobs = [];
        res.data.data.forEach((x) => {
          // Set Calendar Jobs
          x.dates.forEach((y) => {
            let obj = {
              start: y,
              end: y,
              title: x.title,
              id: x._id,
            };
            jobs.push(obj);
            // Set Current Date Jobs
            if (y === new Date().toDateString()) {
              currentDayJobs.push(x);
            }
          });
        });
        setState({
          ...state,
          myEventsList: jobs,
          currentDayJobs,
          jobs: res.data.data,
          date: new Date(),

        });
        getCount(new Date(), res.data.data)

      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);



  //handler called when we change date
  const changeDate = (x) => {
    let date = x;
    let { user } = props;
    let body;
    if (user.role === "mover") {
      body = {
        date: date.toDateString(),
        id: user._id,
      };
    } else {
      body = {
        date: date.toDateString(),
      };
    }
    getJobsByDate(body, (res) => {
      let jobs = [];
      let currentDayJobs = [];
      res.data.data.forEach((x) => {
        x.dates.forEach((y) => {
          let obj = {
            start: y,
            end: y,
            title: x.title,
            id: x._id,
          };
          jobs.push(obj);
          if (y === date.toDateString()) {
            currentDayJobs.push(x);
          }
        });
      });
      setState({
        ...state,
        myEventsList: jobs,
        currentDayJobs,
        jobs: res.data.data,
        date: x,
      });
      getCount(x, res.data.data);

    });
  };

  //get job details when we click a job of a particular date
  const getJobDetails = (e) => {
    let jobs = cloneDeep(state.jobs);
    let index = jobs.findIndex((x) => x._id === e.id);
    setState({
      ...state,
      currentDayJobs: [jobs[index]],
      date: new Date(jobs[index].dates),
    });
    getCount(e, jobs);
  };
  //get all jobs of a particular date(when we clicked a box)
  const getJobDetailsOnSlotClick = (e) => {
    let jobs = cloneDeep(state.jobs);
    let currentDayJobs = [];
    jobs.forEach((x) => {
      x.dates.forEach((y) => {
        if (y === e.end.toDateString()) {
          currentDayJobs.push(x);
        }
      });
    });
    setState({
      ...state,
      currentDayJobs,
      date: e.end,
    });
    getCount(e, jobs);
  };

  //coloured box(box-styling)
  const coloredDateCellWrapper = ({ children, value }) => {
    let date = new Date(state.date);
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
  const formatAMPM = (startTime) => {
    let date = new Date(startTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  return (
    <div className={style.calenderContainer}>
      <div className={style.calender}>
        <div className={style.calenderContent}>
          <Calendar
            className={style.styleCalender}
            selectable={true}
            localizer={localizer}
            events={state.myEventsList}
            startAccessor="start"
            endAccessor="end"
            views={{
              month: true,
            }}
            popup={true}
            onNavigate={changeDate}
            onSelectEvent={getJobDetails}
            onSelectSlot={getJobDetailsOnSlotClick}
            components={{
              // you have to pass your custom wrapper here
              // so that it actually gets used
              dateCellWrapper: coloredDateCellWrapper,
            }}
          />
        </div>

        <div className={style.sideContent}>
          {state.currentDayJobs.length ? (
            <div>
              <h5 className={`${style.flex} `}>{state.date.toDateString()}</h5>{" "}
              <hr />
              <div className={style.jobInfo}>
                <h6>{`Total Jobs: `}
                  <Chip
                    label={count.job}
                    clickable
                    // color="primary"
                    // variant="outlined"
                    size="medium"
                  /></h6>
                <h6>{`Total Movers: `}
                  <Chip
                    label={count.movers}
                    clickable
                    // color="primary"
                    // variant="outlined"
                    size="medium"
                  />
                </h6>
              </div>
              {state.currentDayJobs.map((job, i) => (
                <div>

                  <div id="accordion" key={i}>
                    <div className={`card ${style.card}`}>
                      <div
                        className={`card-header ${style.cardHeader}`}
                        id="headingOne"
                      >
                        <div
                          className="collapsed"
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
                              {job.title}
                            </Link>
                          </div>
                          <div className={style.flexEnd}>
                            {job.jobId && (
                              <Chip
                                label={(job.jobId)}
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
                        <div className={`card-body ${style.cardBody}`}>



                          <div className="card-text">
                            <div className={style.heading}>
                              {`Customer Email: `}
                            </div>
                            <div className={style.customerMail}>
                              <Link

                                to={`/customer/detail/${job.customer._id}`}
                              >
                                {job.customer.email}
                              </Link></div>
                          </div>
                          <div className={`card-text ${style.jobDescription}`}>
                            <div className={style.heading}>
                              {`Job Description: `}
                            </div>
                            <div className={style.jobText}>
                              {parse(job.description)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h5 className={`${style.flex} ${style.flexCenter}`}>{state.date.toDateString()}</h5>

              <hr />
              <div className={style.jobInfo}>
                <h6>{`Total Jobs: `}
                  <Chip
                    label={state.currentDayJobs.length}
                    clickable
                    // color="primary"
                    // variant="outlined"
                    size="medium"
                  />
                </h6>
                <h6>{`Total Movers: `}
                  <Chip
                    label="0"
                    clickable
                    // color="primary"
                    // variant="outlined"
                    size="medium"
                  />
                </h6>
              </div>
              <img src="/images/no-data-found.png" alt="" width="100%" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
var action = {
  getJobsByDate,
};
var mapStateToProps = (state) => ({
  user: state.users.user,
});
export default connect(mapStateToProps, action)(CalendarApp);
