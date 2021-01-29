import React, { useEffect, useState } from "react";
import style from "./JobList.module.css";
import { Link } from "react-router-dom";
import { getMover } from "../../../Redux/Mover/moverActions";
import { updateJob } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Pagination from "../../../components/Pagination/Pagination";


const styles = (theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
});

const MoversJobsList = (props) => {
  const [state, setState] = useState({
    isLoading: true,
    data: [],
    status: "booked",
    anchorEl: null,
    openedDatePopoverId: null,
    openedAssigneePopoverId: null,
    pageSize: 10,
    dates: "",
    value: "",
    currentPage: 1,
    recentlyAdded: false,
    sortByStatus: false,
  });
  // const [status,setStatus] = useState("completed")
  const { moverJobs, user } = props;
  let { pageSize, currentPage } = state;
  let totalCount = moverJobs?.total;
  const open = Boolean(state.anchorEl);
  const { classes } = props;

  useEffect(() => {
    let { getMover } = props;

    let moversObj = {
      filters: {
        jobStatus: "",
        dates: null,
        nearestDate: "",
      },
      sort: {
        createdAt: null,
      },
      page: 1,
    };
    getMover(moversObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   let { getMover } = props;

  //   let moversObj = {
  //     filters: {
  //       jobStatus: "",
  //       dates: null,
  //       nearestDate: "",
  //     },
  //     sort: {
  //       createdAt: null,
  //     },
  //     page: 1,
  //   };
  //   getMover(moversObj);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [moverJobs]);

  // const handleJobUpdate = (id) => {
  //   updateJob(id, { status: state.status });
  // };

  const handleChange = (event) => {
    var newState = state;
    newState.status = event.target.value;
    setState(newState);
    // setState((prevState) => ({
    //   ...prevState,
    //   status:event.target.value
    // }))
    // setStatus("booked")
    filterJobByStatus(event.target.value);
  };

  const markComplete = (list) => {
    updateJob(list._id, { status: "completed" }).then((res) => {
      if (res.data.status === 200) {
        let { getMover, showMessage } = props;
        showMessage(res.data.message);
        getMover();
      }
    });
  };

  const handleDatePopoverOpen = (event, id) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      openedDatePopoverId: id,
    });
  };

  const handleDatePopoverClose = () => {
    setState({
      ...state,
      anchorEl: null,
      openedDatePopoverId: null,
    });
  };

  const handleAssigneePopoverOpen = (event, id) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      openedAssigneePopoverId: id,
    });
  };

  const handleAssigneePopoverClose = () => {
    setState({
      ...state,
      anchorEl: null,
      openedAssigneePopoverId: null,
    });
  };

  const handleRecentlyAdded = () => {
    let { getMover } = props;

    let fetchMoverJobs = {
      filters: {
        jobStatus: "",
        dates: "",
        nearestDate: "",
      },
      sort: {
        createdAt: -1,
      },
      page: 1,
    };
    setState({
      ...state,
      recentlyAdded: true,
      sortByStatus: false,
      currentPage: 1,
    });

    getMover(fetchMoverJobs);
  };

  const filterJobByStatus = (value) => {
    let { getMover } = props;

    let fetchMoverJobs = {
      filters: {
        jobStatus: value,
        dates: "",
        nearestDate: "",
      },
      sort: {
        createdAt: null,
      },
      page: 1,
    };
    setState({
      ...state,
      recentlyAdded: false,
      sortByStatus: true,
      currentPage: 1,
    });

    getMover(fetchMoverJobs);
  };

  const filterJobByDate = (e) => {
    let { getMover } = props;

    let date = new Date(e.target.value);
    let DateFilters = {
      filters: {
        dates: date.toDateString(),
        jobStatus: "",
        nearestDate: "",
      },
      sort: {
        createdAt: null,
      },
      page: 1,
    };
    setState({
      ...state,
      dates: e.target.value,
      currentPage: 1,
    });

    getMover(DateFilters);
  };

  const handlePageChange = (page) => {
    let { getMover } = props;
    let fetchMoverJobs;
    if (state.recentlyAdded === true) {
      fetchMoverJobs = {
        filters: {
          jobStatus: "",
          dates: "",
          nearestDate: "",
        },
        sort: {
          createdAt: -1,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    } else if (state.sortByStatus === true) {
      fetchMoverJobs = {
        filters: {
          jobStatus: state.value,
          dates: "",
          nearestDate: "",
        },
        sort: {
          createdAt: null,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    } else {
      fetchMoverJobs = {
        filters: {
          jobStatus: "",
          dates: "",
          nearestDate: "",
        },
        sort: {
          createdAt: null,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    }
    getMover(fetchMoverJobs);
  };

  if (user) {
    getMover(user._id);
  }
  console.log(state.status);
  return (
    <div>
      <div className={style.toprow}>
        <div className={style.rowContent}>
          <div>
            <h3>Job List </h3>
          </div>
          <div>
            <SearchBar type="mover" title="Type title or services" />
          </div>

          <div className={`${style.filter}`}>
            <i
              className="fa fa-filter dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            ></i>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <h5 className="dropdown-item">Sort</h5>
              <p className="dropdown-item" onClick={handleRecentlyAdded}>
                Sort By Recently Added
              </p>
              <hr />
              <h5 className="dropdown-item">Filters</h5>
              <p className="dropdown-item">Filter By Date</p>
              <input
                type="date"
                name="dates"
                id=""
                className={style.styleDates}
                onChange={(e) => filterJobByDate(e)}
              />{" "}
              <hr />
              <p className="dropdown-item">Filter By Status</p>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={state.status}
                size="small"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="completed"
                  className="dropdown-item"
                  control={<Radio />}
                  label="completed"
                />
                <FormControlLabel
                  value="booked"
                  className="dropdown-item"
                  control={<Radio />}
                  label="booked"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      {moverJobs?.docs?.length > 0 ? (
        <div className={style.jobListHeaderContainer}>
          <div className={style.jobListHeader}>
            <div>Title</div>
            <div>Date</div>
            <div>Assignee</div>
            <div>Status</div>
          </div>
        </div>
      ) : null}

      {moverJobs?.docs?.length > 0 ? (
        <div>
          {moverJobs.docs.map((list, i) => {
            return (
              <div className={style.listContainer} key={i}>
                <div className={`${style.listContent}`}>
                  <Link
                    className={style.styleLink}
                    to={"/mover/jobdetails/" + list._id}
                  >
                    <div className={`${style.jobList}`}>
                      <div
                        className={`${style.title} ${style.flex} ${style.item}`}
                      >
                        {list.title}
                      </div>
                      <div
                        className={`${style.date} ${style.flex} ${style.item}`}
                      >
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className={style.icon}
                        />{" "}
                        <span className={style.styleSpan}>
                          {list.dates[0]}
                          {list.dates.length > 1 && (
                            <div>
                              <Typography
                                aria-owns={
                                  open ? "mouse-over-popover" : undefined
                                }
                                aria-haspopup="true"
                                onMouseEnter={(e) =>
                                  handleDatePopoverOpen(e, list._id)
                                }
                                onMouseLeave={handleDatePopoverClose}
                              >
                                ...
                              </Typography>

                              <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                  paper: classes.paper,
                                }}
                                open={state.openedDatePopoverId === list._id}
                                anchorEl={state.anchorEl}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                onClose={handleDatePopoverClose}
                                disableRestoreFocus
                              >
                                {list.dates.map((date) => (
                                  <Typography>{date}</Typography>
                                ))}
                              </Popover>
                            </div>
                          )}
                        </span>
                      </div>

                      <div
                        className={`${style.assignee} ${style.flex}  ${style.item}`}
                      >
                        <span className={style.styleSpan}>
                          <FontAwesomeIcon
                            icon={faUser}
                            className={style.icon}
                          />{" "}
                          {list.assignee.length > 0
                            ? list.assignee[0].name
                            : "No Assignees"}
                          {list.assignee.length > 1 && (
                            <div>
                              <Typography
                                aria-owns={
                                  open ? "mouse-over-popover" : undefined
                                }
                                aria-haspopup="true"
                                onMouseEnter={(e) =>
                                  handleAssigneePopoverOpen(e, list._id)
                                }
                                onMouseLeave={handleAssigneePopoverClose}
                              >
                                ...
                              </Typography>

                              <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                  paper: classes.paper,
                                }}
                                open={
                                  state.openedAssigneePopoverId === list._id
                                }
                                anchorEl={state.anchorEl}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                                onClose={handleAssigneePopoverClose}
                                disableRestoreFocus
                              >
                                {list.assignee.map((assignee, i) => (
                                  <Typography key={i}>
                                    {assignee.name}
                                  </Typography>
                                ))}
                              </Popover>
                            </div>
                          )}
                        </span>
                      </div>

                      {list.status === "booked" ? (
                        <div
                          className={`${style.status} ${style.flex} ${style.item}`}
                        >
                          <input
                            className={style.styleCheckBox}
                            onClick={() => markComplete(list)}
                            type="checkbox"
                          ></input>
                          <div onClick={() => markComplete(list)}>
                            Mark Complete
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`${style.status} ${style.flex} ${style.item}`}
                        >
                          {list.status}
                        </div>
                      )}
                      <div></div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className={style.stylePagination}>
            <div className={style.pagination}>
              <Pagination
                itemCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <img src="/images/no-data-found.png" alt="" />
        </div>
      )}
    </div>
  );
};

var mapStateToProps = (state) => ({
  moverJobs: state.moverJobs?.jobList,
  user: state.users.user,
});

var actions = {
  getMover,
  showMessage,
};

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(MoversJobsList);
