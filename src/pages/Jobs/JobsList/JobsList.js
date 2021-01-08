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
import JobConfirmation from "../JobConfirmation/JobConfirmation";
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
  
  handleShow = (data) => {
    this.setState({
      show: true,
      jobToConfirm: data,
    });
  };

  handleClose = () => {
    // var { note } = this.state;
    this.setState({
      show: false,
      // note: notes,
    });
  };

  handleCloseAndRefresh = () => {
    this.setState({
      show: false,
      // note: notes,
    });

    var { getAllJobs } = this.props;
    var jobObj = {
      query: "",
      filters: {
        startDate: "",
        endDate: "",
        movedDate: "",
        tag: "ABC",
        startYearMonth: "",
      },
      sort: {
        createdAt: -1,
      },
      page: 1,
    };
    getAllJobs(jobObj);
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
    //sort the jobList by name in ascending order when sort by name is checked
    if (this.state.sortByName === true) {
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
        page: page,
      };
      this.setState({
        currentPage: page,
      });
    }
    //sort the jobList by recently added  when recentlyAdded is checked
    else if (this.state.recentlyAdded === true) {
      var fetchJobsOnPageChange = {
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
      var fetchJobsOnPageChange = {
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
      var fetchJobsOnPageChange = {
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
    console.log(currentPage);
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
    var { jobs,user } = this.props;
    var { pageSize, currentPage } = this.state;
    var { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    var totalCount = jobs?.total;
    
    var { show, showDeleteModal, dates, nearestDate, value } = this.state;
    return (
      <div>
        <div className={`row ${style.toprow}`}>
          <div className="col-3">
            <b>
              <h3 className={style.head}>Jobs List</h3>
            </b>
          </div>

          <div className={`col-6 ${style.search}`}>
            <SearchBar type="job" title="Type title or services" />
          </div>
          <div
            className={`col-2  d-flex justify-content-between ${style.filter}`}
          >
            <i
              className="fa fa-filter dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ transform: "translateY(-0.3rem)" }}
            ></i>
            {/* drop-down-menu */}
            <div
              className={`dropdown-menu`}
              aria-labelledby="dropdownMenuLink"
              
            >
              <h5
                className={`dropdown-item`}
                style={{ fontFamily: "sans-serif" }}
              >
                Sort
              </h5>
              <hr />

              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                className = {style.dropDown}
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
              <h5
                style={{ fontFamily: "sans-serif" }}
                className="dropdown-item"
              >
                Filters
              </h5>
              <hr />
              <h6
                style={{ fontFamily: "sans-serif" }}
                className="dropdown-item"
              >
                On Date Jobs
              </h6>
              <input
                type="date"
                name="dates"
                value={dates}
                id=""
                style={{ width: "11rem", margin: " 1rem 2rem" }}
                onChange={(e) => this.filterOnDateJobs(e)}
              />
              <h6
                style={{ fontFamily: "sans-serif" }}
                className="dropdown-item"
              >
                Upcoming Jobs
              </h6>
              <input
                type="date"
                name="nearestDate"
                value={nearestDate}
                id=""
                style={{ width: "11rem", margin: " 1rem 2rem" }}
                onChange={(e) => this.filterUpComingJobs(e)}
              />
            </div>
            <div style={{ margin: "-0.5rem" }}>
              <Link style={{ textDecoration: "none" }} to="/job/create">
                <Button
                  className=" btn btn-primary"
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                  
                  }}
                >
                  Create New
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {jobs?.docs?.length > 0 ? (
          <div>
            <div className={style.jobListHeaderContainer}>
              <div
                className={style.jobListHeader}
                style={{ fontWeight: "bold" }}
              >
                <div style={{ padding: "0 0.5rem" }}>Title</div>
                <div style={{ padding: "0 0.5rem" }}>Date(s)</div>
                <div style={{ padding: "0 0.5rem" }}>Assignee</div>
                <div style={{ padding: "0 0.5rem" }}>Services</div>
                <div style={{ padding: "0 0.5rem" }}>Status</div>
                {this.props.user?.role == "admin" && (
                  <div style={{ padding: "0 0.5rem" }}>Actions</div>
                )}
              </div>
            </div>

          
            <div>
              {jobs?.docs.map((job, i) => {
                return (
                  <div className={style.listContainer} key={i}>
                    <div className={`${style.listContent}`}>
                      <Link
                        key={i}
                        style={{ color: "black", textDecoration: "none" }}
                        className={style.styleLink}
                        to={{
                          pathname: `/job/details/${job._id}`,
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
                              style={{ marginRight: "0.5rem" }}
                            />{" "}
                            {
                              <span style={{ display: "flex" }}>
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
                                        this.state.openedDatePopoverId ==
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
                                      {job.dates.map((date, i) => (
                                        <Typography key={i}>{date}</Typography>
                                      ))}
                                    </Popover>
                                  </div>
                                )}
                              </span>
                            }
                          </div>
                          <div
                            className={`${style.assignee} ${style.flex} ${style.item}`}
                          >
                            <span style={{ display: "flex" }}>
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ marginRight: "0.5rem" }}
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
                            <div style={{ display: "flex" }}>
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
                        <div className={`${style.actions} ${style.flex}`}>
                          <Button
                            
                            onClick={() => this.openDeleteModal(i, job._id)}
                            style={{
                              background: "#00ADEE",
                              textTransform: "none",
                              color: "#FFF",
                              fontFamily: "sans-serif",
                             
                            }}
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
            <div className={style.jumbotron}>
              <Pagination
                itemCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>

            <Modal
              dialogClassName={`${style.modal}`}
              show={show}
              onHide={this.handleClose}
              animation={false}
              centered
              
            >
              <Modal.Header closeButton>
                <Modal.Title>Booking Confirmation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <JobConfirmation
                  data={this.state.jobToConfirm}
                  close={this.handleCloseAndRefresh}
                />
              </Modal.Body>
            </Modal>
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
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Button
                style={{
                  background: "#00ADEE",
                  textTransform: "none",
                  color: "#FFF",
                  fontFamily: "sans-serif",
                  width: "100%",
                  margin: "0 0.6rem",
                }}
                onClick={() => this.removeJob()}
              >
                Confirm
              </Button>
              <Button
                style={{
                  background: "#00ADEE",
                  textTransform: "none",
                  color: "#FFF",
                  fontFamily: "sans-serif",
                  width: "100%",
                }}
                onClick={this.closeDeleteModal}
              >
                Cancel
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
