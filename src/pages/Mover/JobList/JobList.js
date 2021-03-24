import React, { useEffect, useState } from "react";
import style from "./JobList.module.css";
import { Link } from "react-router-dom";
import { getMover, updateJob } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  FormControlLabel,
  Popover,
  Radio,
  RadioGroup,
  Typography,
  Chip
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

const MoversJobList = (props) => {
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

  let { pageSize, currentPage } = state;
  const open = Boolean(state.anchorEl);
  const { classes } = props;

  const { moverJobs } = props;
  let totalCount = 0;
  if (moverJobs) {
    totalCount = moverJobs.total;
  }

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

  const handleChange = (event) => {
    var newState = state;
    newState.status = event.target.value;
    setState(newState);
    filterJobByStatus(event.target.value);
  };

  const markComplete = (list) => {
    let { updateJob } = props;
    updateJob(list._id, { status: "completed" },
    );
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

  return (
    <div>
      <div className={style.toprow}>
        <div className={style.rowContent}>
          <div>
            <h3>Jobs List</h3>
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

      {/* {moverJobs && moverJobs.length > 0 ? (
        <div className={style.jobListHeaderContainer}>
          <div className={style.jobListHeader}>
            <div>Title</div>
            <div>Date</div>
            <div>Assignee</div>
            <div>Status</div>
          </div>
        </div>
      ) : null} */}

      {moverJobs && moverJobs.length > 0 ? (
        <div>
          {moverJobs.map((list, i) => {
            return (
              <div className={style.listContainer} key={i}>
                <div className={`${style.listContent}`}>
                  <Link
                    className={style.styleLink}
                    to={"/mover/jobdetails/" + list._id}
                  >
                    <div className={`${style.jobList}`}>
                      <div
                        className={`${style.title} 
                        ${style.flex} 
                        ${style.item}`}
                      >
                        <div className={`text-muted ${style.heading}`}>{`title: `}</div>
                        <div className={`text-capitalize ${style.headingSub}`}>{list.title}</div>
                      </div>
                      <div
                        className={`${style.date} ${style.flex} ${style.item}`}
                      >
                        <div className={`text-muted ${style.heading}`}>{`Date:`}</div>
                        <span className={`${style.headingSub} ${style.styleSpan}`}>
                          {list.dates[0].date}
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
                                {list.dates.map((dates, i) => (
                                  <Typography key={i}>{dates.date}</Typography>
                                ))}
                              </Popover>
                            </div>
                          )}
                        </span>
                      </div>

                      <div
                        className={`${style.assignee} ${style.flex}  ${style.item}`}
                      ><div className={`text-muted ${style.heading}`}>{`Assignee: `}</div>
                        <span className={`text-capitalize ${style.headingSub} ${style.styleSpan}`}>
                          {/* <FontAwesomeIcon
                            icon={faUser}
                            className={style.icon}
                          />{" "} */}
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
                    </div>
                  </Link>


                  {list.status === "booked" ? (
                    <div className={`${style.flex} ${style.jobStatus}  ${style.item}`}>
                      <div className={`text-muted ${style.heading}`}>{`Status:`}</div>

                      <div className={`text-capitalize ${style.headingSub}`}>
                        <input
                          className={style.styleCheckBox}
                          onClick={() => markComplete(list)}
                          type="checkbox"
                        ></input>
                        <Chip
                          size="small"
                          label={`Mark Complete`} />
                      </div>

                    </div>
                  ) : (
                    <div className={`${style.status} ${style.flex} ${style.item}`}>
                      <div className={`text-muted ${style.heading}`}>{`Status:`}</div>
                      <div className={`text-capitalize ${style.headingSub}`}>
                        <Chip
                          size="small"
                          label={list.status}
                        />
                      </div>
                    </div>
                  )}
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
  moverJobs: state.moverJobs.jobList,
});

var actions = {
  getMover,
  updateJob,
};

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(MoversJobList);
