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
  var { user } = props;

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
      getJobsByDate(body).then((res) => {
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

        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //handler called when we change date
  const changeDate = (x) => {
    console.log(x)
    let { user } = props;
    let body;
    if (user.role === "mover") {
      body = {
        date: x.toDateString(),
        id: user._id,
      };
    } else {
      body = {
        date: x.toDateString(),
      };
    }
    getJobsByDate(body).then((res) => {
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
        date: x
      });
      console.log(currentDayJobs)
    });
  };

  //get job details when we click a job of a particular date
  const getJobDetails = (e) => {
    console.log(e)

    let jobs = cloneDeep(state.jobs);
    let index = jobs.findIndex((x) => x._id === e.id);
    setState({
      ...state,
      currentDayJobs: [jobs[index]],
      date: new Date(jobs[index].dates),
    });
  };
  //get all jobs of a particular date(when we clicked a box)
  const getJobDetailsOnSlotClick = (e) => {
    console.log(e)
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
      date: e.end
    });
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
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
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
              <h5 className={style.flex}>{state.date.toDateString()}</h5> <hr />
              {state.currentDayJobs.map((job, i) => (
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
                            &nbsp;
                            {job.title}
                          </Link>
                        </div>
                        <div>
                          {job.startTime && (
                            <Chip
                              label={formatAMPM(job.startTime)}
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
                <h5 className={style.flex}>{state.date.toDateString()}</h5>
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
};

var mapStateToProps = (state) => ({
  user: state.users.user,
});
export default connect(mapStateToProps)(CalendarApp);