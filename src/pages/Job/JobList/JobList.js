import React, { useState, useEffect } from "react";
import style from "./JobsList.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs, filterJobsByDate, deleteJob } from "../../../Redux/Job/jobActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Popover from "@material-ui/core/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";

//use material-ui default styles of popover
const styles = (theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
});

const JobsList = (props) => {
  //defining state
  let { getAllJobs, jobs, user } = props;
  let totalCount = 0;
  if (jobs) {
    var { docs } = jobs;
    totalCount = jobs.total;
  }

  const [state, setState] = useState({
    anchorEl: null,
    openedPopoverId: null,
    openedDatePopoverId: null,
    openedAssigneePopoverId: null,
    currentPage: 1,
    popoverOpen: false,
    sortByName: false,
    recentlyAdded: false,
    assigneeRequired: false,
    show: false,
    showDeleteModal: false,
    dates: "",
    nearestDate: "",
    jobToConfirm: "",
    modalIndex: "",
    jobToDelete: "",
    value: "recently added",
  });

  useEffect(() => {
    //fetch all jobs on page load
    let jobObj = {
      query: "",
      sort: {
        assigneeRequired: null,
        plainTitle: "",
        createdAt: -1,
      },
      page: 1,
    };
    getAllJobs(jobObj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePageChange = (page) => {
    //fetch jobs when the page is changed
    let { getAllJobs } = props;
    let fetchJobsOnPageChange;
    //sort the jobList by name in ascending order when sort by name is checked
    if (state.sortByName === true) {
      fetchJobsOnPageChange = {
        query: "",
        sort: {
          startDate: null,
          endDate: null,
          plainTitle: 1,
          movedDate: null,
          tag: null,
          startYearMonth: null,
          assigneeRequired: null,
          createdAt: null,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    }
    //sort the jobList by recently added  when recentlyAdded is checked
    else if (state.recentlyAdded === true) {
      fetchJobsOnPageChange = {
        query: "",
        sort: {
          assigneeRequired: null,
          plainTitle: "",
          createdAt: -1,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
      //sort the jobList by assignee required  when Assignee Required is checked
    } else if (state.assigneeRequired === true) {
      fetchJobsOnPageChange = {
        query: "",
        sort: {
          assigneeRequired: -1,
          plainTitle: "",
          createdAt: null,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    }
    //sort the list by recently added when no sort is selected and page is changed
    else {
      fetchJobsOnPageChange = {
        query: "",
        sort: {
          assigneeRequired: null,
          plainTitle: "",
          createdAt: -1,
        },
        page: page,
      };
      setState({
        ...state,
        currentPage: page,
      });
    }
    getAllJobs(fetchJobsOnPageChange);
  };
  //sort the jobList by title
  const handleSortByTitle = () => {
    let { getAllJobs } = props;
    setState({
      ...state,
      sortByName: true,
      assigneeRequired: false,
      recentlyAdded: false,
    });
    let fetchJobsOnPageChange = {
      query: "",
      sort: {
        startDate: null,
        endDate: null,
        plainTitle: 1,
        movedDate: null,
        tag: null,
        startYearMonth: null,
        assigneeRequired: null,
        createdAt: null,
      },
      page: 1,
    };
    setState({
      ...state,
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //filter todays(onDate) jobs
  const filterOnDateJobs = (e) => {
    let { filterJobsByDate } = props;
    console.log(state)
    setState({
      ...state,
      dates: e.target.value,
    });

    let date = new Date(e.target.value);
    let DateFilters = {
      filters: {
        dates: date.toString(),
        movedDate: "",
        startYearMonth: "",
        nearestDate: null,
        sortLast: null,
      },
      page: 1,
    };
    setState({
      ...state,
      currentPage: 1,
    });
    filterJobsByDate(DateFilters);
  };

  //filter upcoming jobs
  const filterUpComingJobs = (e) => {
    let { filterJobsByDate } = props;
    setState({
      ...state,
      nearestDate: e.target.value,
    });

    let date = new Date(e.target.value);
    let DateFilters = {
      filters: {
        dates: "",
        startYearMonth: "",
        nearestDate: date.toString(),
        sortLast: null,
      },
      page: 1,
    };
    setState({
      ...state,
      currentPage: 1,
    });
    filterJobsByDate(DateFilters);
  };
  //sort jobList by recently added(when recentlyAdded is clicked)
  const handleRecentlyAdded = () => {
    let { getAllJobs } = props;
    setState({
      ...state,
      recentlyAdded: true,
      sortByName: false,
      assigneeRequired: false,
    });
    let fetchJobsOnPageChange = {
      query: "",
      sort: {
        assigneeRequired: null,
        plainTitle: "",
        createdAt: -1,
      },
      page: 1,
    };
    setState({
      ...state,
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //sort the jobList by assignee required(when assigneeRequired is clicked)
  const handleAssigneeRequired = () => {
    let { getAllJobs } = props;
    setState({
      ...state,
      assigneeRequired: true,
      sortByName: false,
      recentlyAdded: false,
    });

    let fetchJobsOnPageChange = {
      query: "",
      sort: {
        assigneeRequired: -1,
        plainTitle: "",
        createdAt: null,
      },
      page: 1,
    };
    setState({
      ...state,
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //handle Service Popover open
  const handleServicePopoverOpen = (event, id) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      openedPopoverId: id,
    });
  };
  //handle Service Popover close
  const handleServicePopoverClose = () => {
    setState({
      ...state,
      anchorEl: null,
      openedPopoverId: null,
    });
  };
  //handle Date Popover open
  const handleDatePopoverOpen = (event, id) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      openedDatePopoverId: id,
    });
  };
  //handle Date Popover close
  const handleDatePopoverClose = () => {
    setState({
      ...state,
      anchorEl: null,
      openedDatePopoverId: null,
    });
  };
  //handle Assignee Popover open

  const handleAssigneePopoverOpen = (event, id) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      openedAssigneePopoverId: id,
    });
  };
  //handle Assignee Popover close

  const handleAssigneePopoverClose = () => {
    setState({
      ...state,
      anchorEl: null,
      openedAssigneePopoverId: null,
    });
  };

  const removeJob = () => {
    //removes job from jobList
    let { deleteJob } = props;
    let { currentPage } = state;
    deleteJob(state.jobToDelete, currentPage);
    setState({
      ...state,
      showDeleteModal: false,
    });
  };
  //open delete modal
  const openDeleteModal = (i, jobId) => {
    setState({
      ...state,
      modalIndex: i,
      showDeleteModal: true,
      jobToDelete: jobId,
    });
  };
  //change handler of radio buttons
  const handleChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };
  //close delete modal
  const closeDeleteModal = () => {
    setState({
      ...state,
      showDeleteModal: false,
    });
  };

  let { currentPage } = state;
  let { classes } = props;
  const open = Boolean(state.anchorEl);
  let { showDeleteModal, dates, nearestDate, value } = state;

  return (
    <div>
      <div className={`${style.toprow}`}>
        <div className={style.rowContent}>
          <div>
            <h3>Jobs List</h3>
          </div>

          <div>
            <SearchBar type="job" title="Type title or services" />
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
            {/* drop-down-menu */}
            <div
              className={`dropdown-menu`}
              aria-labelledby="dropdownMenuLink"
            >
              <h5 className="dropdown-item">Sort</h5>
              <hr />

              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}

              >
                <FormControlLabel
                  value="recently added"
                  control={<Radio />}
                  label="Recently Added"
                  className="dropdown-item"
                  onClick={handleRecentlyAdded}
                />

                <FormControlLabel
                  value="title"
                  control={<Radio />}
                  label="Title"
                  className="dropdown-item"
                  onClick={handleSortByTitle}
                />
                <FormControlLabel
                  value="assignee required"
                  control={<Radio />}
                  label="Assignee Required"
                  className="dropdown-item"
                  onClick={handleAssigneeRequired}
                />
              </RadioGroup>
              <hr />
              <h5 className="dropdown-item">Filters</h5>
              <hr />
              <h6 className="dropdown-item">On Date Jobs</h6>
              <input
                type="date"
                name="dates"
                value={dates}
                id=""
                className={style.styleDates}
                onChange={(e) => filterOnDateJobs(e)}
              />
              <h6 className="dropdown-item">Upcoming Jobs</h6>
              <input
                type="date"
                name="nearestDate"
                value={nearestDate}
                id=""
                className={style.styleDates}
                onChange={(e) => filterUpComingJobs(e)}
              />
            </div>
          </div>
          <div className={style.btnStyle}>
            <Link to="/job/add" className={style.link}>
              <Button className={style.btn}>Create New</Button>
            </Link>
          </div>
        </div>
      </div>

      {docs && docs.length > 0 ? (
        <div>
          <div className={style.jobListHeaderContainer}>
            <div className={style.jobListHeader}>
              <div>Title</div>
              <div>Date(s)</div>
              <div>Assignee</div>
              <div>Services</div>
              <div>Status</div>
              {user && user.role === "admin" && <div>Actions</div>}
            </div>
          </div>
          <div>
            {docs.map((job, i) => {
              return (
                <div className={style.listContainer} key={i}>
                  <div className={`${style.listContent}`}>
                    <Link
                      key={i}
                      className={style.styleLink}
                      to={{
                        pathname: `/job/detail/${job._id}`,
                        jobProps: job,
                      }}
                    >
                      <div className={`${style.jobList}`}>
                        <div
                          className={`${style.title} ${style.flex} ${style.item}`}
                        >
                          {job.title}
                        </div>
                        <div
                          className={`${style.date} ${style.flex} ${style.item}`}
                        >
                          <FontAwesomeIcon
                            icon={faCalendarAlt}
                            className={style.icon}
                          />{" "}
                          <span className={style.styleSpan}>
                            {/* show 1st item of date array on jobList */}
                            {job.dates[0]}
                            {job.dates.length > 1 && (
                              <div>
                                <Typography
                                  aria-owns={
                                    open ? "mouse-over-popover" : undefined
                                  }
                                  aria-haspopup="true"
                                  onMouseEnter={(e) =>
                                    handleDatePopoverOpen(e, job._id)
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
                                  open={
                                    state.openedDatePopoverId === job._id
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
                                  disableRestoreFocus
                                >
                                  {job.dates.map((date, i) => (
                                    <Typography key={i}>{date}</Typography>
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
                            />
                            {job.assignee.length > 0
                              ? job.assignee[0].name
                              : "N/A"}

                            {job.assignee.length > 1 && (
                              <div>
                                <Typography
                                  aria-owns={
                                    open ? "mouse-over-popover" : undefined
                                  }
                                  aria-haspopup="true"
                                  onMouseEnter={(e) =>
                                    handleAssigneePopoverOpen(e, job._id)
                                  }
                                  onMouseLeave={
                                    handleAssigneePopoverClose
                                  }
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
                                    state.openedAssigneePopoverId ===
                                    job._id
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
                                  disableRestoreFocus
                                >
                                  {job.assignee.map((assignee, i) => (
                                    <Typography key={i}>
                                      {assignee.name}
                                    </Typography>
                                  ))}
                                </Popover>
                              </div>
                            )}
                          </span>
                        </div>
                        <div
                          className={`${style.services} ${style.flex} ${style.item}`}
                        >
                          <div className={style.styleSpan}>
                            {job.services ? job.services[0].name : null}
                            {job.services.length > 1 && (
                              <div>
                                <Typography
                                  aria-owns={
                                    open ? "mouse-over-popover" : undefined
                                  }
                                  aria-haspopup="true"
                                  onMouseEnter={(e) =>
                                    handleServicePopoverOpen(e, job._id)
                                  }
                                  onMouseLeave={
                                    handleServicePopoverClose
                                  }
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
                                    state.openedPopoverId === job._id
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
                                  disableRestoreFocus
                                >
                                  {job.services.map((service, i) => (
                                    <Typography key={i}>
                                      {service.name}
                                    </Typography>
                                  ))}
                                </Popover>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className={`${style.status} ${style.flex} ${style.item}`}
                        >
                          {job.status}
                        </div>
                      </div>
                    </Link>
                    {user && user.role === "admin" && (
                      <div className={`${style.actions} ${style.flex} `}>
                        <Button
                          onClick={() => openDeleteModal(i, job._id)}
                        >
                          Delete
                          </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* pagination for multiple pages */}
          <div className={style.stylePagination}>
            <div className={style.pagination}>
              <Pagination
                itemCount={totalCount}
                pageSize={10}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      ) : (
          <div className="text-center">
            <img src="/images/no-data-found.png" alt="No Data Found" />
          </div>
        )}
      {/* Modal for delete job */}

      <DeleteConfirmation
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        type="job"
        deleteItem={removeJob}
      />
    </div>
  );
}

var mapStateToProps = (state) => ({
  jobs: state.jobs.jobList,
  user: state.users.user
});

var actions = {
  getAllJobs,
  filterJobsByDate,
  deleteJob,
};

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(JobsList);
