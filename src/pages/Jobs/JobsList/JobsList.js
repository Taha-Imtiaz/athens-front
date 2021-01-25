import React, { Component } from "react";
import style from "./JobsList.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllJobs,
  filterJobsByDate,
  deleteJob,
} from "../../../Redux/Job/jobActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Popover from "@material-ui/core/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";

import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";

//use material-ui default styles of popover
const styles = (theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
});

class JobsList extends Component {
  //defining state
  state = {
    anchorEl: null,
    openedPopoverId: null,
    openedDatePopoverId: null,
    openedAssigneePopoverId: null,
    pageSize: 10,
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
  };

  componentDidMount = () => {
    //fetch all jobs on componentDidMount
    var { getAllJobs } = this.props;
    var jobObj = {
      query: "",
      sort: {
        assigneeRequired: null,
        plainTitle: "",
        createdAt: -1,
      },
      page: 1,
    };
    getAllJobs(jobObj);
  };

  handlePageChange = (page) => {
    //fetch jobs when the page is changed
    var { getAllJobs } = this.props;
    var fetchJobsOnPageChange;
    //sort the jobList by name in ascending order when sort by name is checked
    if (this.state.sortByName === true) {
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
      this.setState({
        currentPage: page,
      });
    }
    //sort the jobList by recently added  when recentlyAdded is checked
    else if (this.state.recentlyAdded === true) {
       fetchJobsOnPageChange = {
        query: "",
        sort: {
          assigneeRequired: null,
          plainTitle: "",
          createdAt: -1,
        },
        page: page,
      };
      this.setState({
        currentPage: page,
      });
      //sort the jobList by assignee required  when Assignee Required is checked
    } else if (this.state.assigneeRequired === true) {
       fetchJobsOnPageChange = {
        query: "",
        sort: {
          assigneeRequired: -1,
          plainTitle: "",
          createdAt: null,
        },
        page: page,
      };
      this.setState({
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
      this.setState({
        currentPage: page,
      });
    }
    getAllJobs(fetchJobsOnPageChange);
  };
  //sort the jobList by title
  handleSortByTitle = () => {
    var { getAllJobs } = this.props;
    this.setState({
      sortByName: true,
      assigneeRequired: false,
      recentlyAdded: false,
    });
    var fetchJobsOnPageChange = {
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
    this.setState({
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //filter todays(onDate) jobs
  filterOnDateJobs = (e) => {
    var { filterJobsByDate } = this.props;
    this.setState({
      dates: e.target.value,
    });

    let date = new Date(e.target.value);
    var DateFilters = {
      filters: {
        dates: date.toString(),
        movedDate: "",
        startYearMonth: "",
        nearestDate: null,
        sortLast: null,
      },
      page: 1,
    };
    this.setState({
      currentPage: 1,
    });
    filterJobsByDate(DateFilters);
  };

  //filter upcoming jobs
  filterUpComingJobs = (e) => {
    var { filterJobsByDate } = this.props;
    this.setState({
      nearestDate: e.target.value,
    });

    let date = new Date(e.target.value);
    var DateFilters = {
      filters: {
        dates: "",
        startYearMonth: "",
        nearestDate: date.toString(),
        sortLast: null,
      },
      page: 1,
    };
    this.setState({
      currentPage: 1,
    });
    filterJobsByDate(DateFilters);
  };
  //sort jobList by recently added(when recentlyAdded is clicked)
  handleRecentlyAdded = () => {
    var { getAllJobs } = this.props;
    this.setState({
      recentlyAdded: true,
      sortByName: false,
      assigneeRequired: false,
    });
    var fetchJobsOnPageChange = {
      query: "",
      sort: {
        assigneeRequired: null,
        plainTitle: "",
        createdAt: -1,
      },
      page: 1,
    };
    this.setState({
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //sort the jobList by assignee required(when assigneeRequired is clicked)
  handleAssigneeRequired = () => {
    var { getAllJobs } = this.props;
    this.setState({
      assigneeRequired: true,
      sortByName: false,
      recentlyAdded: false,
    });

    var fetchJobsOnPageChange = {
      query: "",
      sort: {
        assigneeRequired: -1,
        plainTitle: "",
        createdAt: null,
      },
      page: 1,
    };
    this.setState({
      currentPage: 1,
    });
    getAllJobs(fetchJobsOnPageChange);
  };
  //handle Service Popover open
  handleServicePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedPopoverId: id,
    });
  };
  //handle Service Popover close
  handleServicePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedPopoverId: null,
    });
  };
  //handle Date Popover open
  handleDatePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedDatePopoverId: id,
    });
  };
  //handle Date Popover close
  handleDatePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedDatePopoverId: null,
    });
  };
  //handle Assignee Popover open

  handleAssigneePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedAssigneePopoverId: id,
    });
  };
  //handle Assignee Popover close

  handleAssigneePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedAssigneePopoverId: null,
    });
  };
  removeJob = () => {
    //removes job from jobList
    var { deleteJob } = this.props;
    var { currentPage } = this.state;
    deleteJob(this.state.jobToDelete, currentPage);
    this.setState({
      showDeleteModal: false,
    });
  };
  //open delete modal
  openDeleteModal = (i, jobId) => {
    this.setState({
      modalIndex: i,
      showDeleteModal: true,
      jobToDelete: jobId,
    });
  };
  //change handler of radio buttons
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  //close delete modal
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  render() {
    var { jobs, user } = this.props;
    var { pageSize, currentPage } = this.state;
    var { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    var totalCount = jobs?.total;

    var { show, showDeleteModal, dates, nearestDate, value } = this.state;
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
                  onChange={this.handleChange}
                >
                  <FormControlLabel
                    value="recently added"
                    control={<Radio />}
                    label="Recently Added"
                    onClick={this.handleRecentlyAdded}
                  />

                  <FormControlLabel
                    value="title"
                    control={<Radio />}
                    label="Title"
                    onClick={this.handleSortByTitle}
                  />
                  <FormControlLabel
                    value="assignee required"
                    control={<Radio />}
                    label="Assignee Required"
                    onClick={this.handleAssigneeRequired}
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
                  onChange={(e) => this.filterOnDateJobs(e)}
                />
                <h6 className="dropdown-item">Upcoming Jobs</h6>
                <input
                  type="date"
                  name="nearestDate"
                  value={nearestDate}
                  id=""
                  className={style.styleDates}
                  onChange={(e) => this.filterUpComingJobs(e)}
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

        {jobs?.docs?.length > 0 ? (
          <div>
            <div className={style.jobListHeaderContainer}>
              <div className={style.jobListHeader}>
                <div>Title</div>
                <div>Date(s)</div>
                <div>Assignee</div>
                <div>Services</div>
                <div>Status</div>
                {this.props.user?.role == "admin" && <div>Actions</div>}
              </div>
            </div>

            <div>
              {jobs?.docs.map((job, i) => {
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
                                      this.handleDatePopoverOpen(e, job._id)
                                    }
                                    onMouseLeave={this.handleDatePopoverClose}
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
                                      this.state.openedDatePopoverId == job._id
                                    }
                                    anchorEl={this.state.anchorEl}
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
                                      this.handleAssigneePopoverOpen(e, job._id)
                                    }
                                    onMouseLeave={
                                      this.handleAssigneePopoverClose
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
                                      this.state.openedAssigneePopoverId ==
                                      job._id
                                    }
                                    anchorEl={this.state.anchorEl}
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
                                      this.handleServicePopoverOpen(e, job._id)
                                    }
                                    onMouseLeave={
                                      this.handleServicePopoverClose
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
                                    open={this.state.openedPopoverId == job._id}
                                    anchorEl={this.state.anchorEl}
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
                      {user?.role === "admin" && (
                        <div className={`${style.actions} ${style.flex} `}>
                          <Button
                            onClick={() => this.openDeleteModal(i, job._id)}
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
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img src="/images/no-data-found.png" />
          </div>
        )}
        {/* Modal for delete job */}
        <Modal
          show={showDeleteModal}
          onHide={this.closeDeleteModal}
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title> Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>Are you sure you want to delete Job?</Modal.Body>
          <Modal.Footer>
            <div className={style.modalButtons}>
              <Button className={style.button} onClick={this.closeDeleteModal}>
                Cancel
              </Button>
              <Button className={style.button} onClick={() => this.removeJob()}>
                Confirm
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

var mapStateToProps = (state) => ({
  jobs: state.jobs?.jobList,
  user: state.users.user,
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
