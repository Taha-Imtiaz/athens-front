import React, { Component } from "react";
import style from "./JobsList.module.css";
import DatePicker from "react-datepicker";
// import Button from "../../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllJobs, filterJobsByDate, deleteJob } from "../../../Redux/Job/jobActions";
import Pagination from "../../Pagination/Pagination";
import SearchBar from "../../SearchBar/SearchBar";
import Popover from "@material-ui/core/Popover";
// import { PopoverHeader, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faInfoCircle,
  faBook,
  faCalendarAlt,
  faUser,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import JobConfirmation from "../JobConfirmation/JobConfirmation";
import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";
// import { showMessage } from "../../../Redux/Common/commonActions";
import { cloneDeep } from "lodash";

const styles = (theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
});

class JobsList extends Component {
  state = {
    startDateTo1: "",
    startDateTo2: "",
    startDateTo3: "",
    startDateTo4: "",
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
    dates: "",
    jobToConfirm: "",
  };
  handleToggle = () =>
    this.setState({
      popoverOpen: !this.popoverOpen,
    });

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

  handleChangeTo1 = (date) => {
    this.setState({
      startDateTo1: date,
    });
  };

  handlePageChange = (page) => {
    var { getAllJobs } = this.props;
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
    } else if (this.state.recentlyAdded === true) {
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
    } else {
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

  handleChangeTo2 = (date) => {
    this.setState({
      startDateTo2: date,
    });
  };

  handleChangeTo3 = (date) => {
    this.setState({
      startDateTo3: date,
    });
  };

  handleChangeTo4 = (date) => {
    this.setState({
      startDateTo4: date,
    });
  };

  handleSort = () => {
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

  filterJobByDate = (e) => {
    var { filterJobsByDate } = this.props;
    this.setState({
      dates: e.target.value,
    });
    var { dates } = this.state;
    let date = new Date(e.target.value);
    var DateFilters = {
      filters: {
        dates: date.toString(),
        movedDate: "",
        startYearMonth: "",
        nearestDate: "",
        sortLast: null,
      },
      page: 1,
    };
    this.setState({
      currentPage: 1,
    });
    filterJobsByDate(DateFilters);
  };

  handleDateFilter = () => {
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
  handlePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedPopoverId: id,
    });
  };

  handlePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedPopoverId: null,
    });
  };

  handleDatePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedDatePopoverId: id,
    });
  };

  handleDatePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedDatePopoverId: null,
    });
  };

  handleAssigneePopoverOpen = (event, id) => {
    this.setState({
      anchorEl: event.currentTarget,
      openedAssigneePopoverId: id,
    });
  };

  handleAssigneePopoverClose = () => {
    this.setState({
      anchorEl: null,
      openedAssigneePopoverId: null,
    });
  };
 removeJob= (i, id) => {
   var {deleteJob} = this.props
   var {currentPage} = this.state
   console.log(currentPage)
   console.log(i, id)

   deleteJob(id,currentPage)
    // deleteJob(id)
    //   .then((res) => {
    //     let newData = cloneDeep(jobs[0].data.jobs.docs);
    //     console.log(jobs[0].data.jobs.docs);
    //     newData.splice(i, 1);
    //     // setClaimData(newData);
    //     showMessage(res.data.message);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  render() {
    var { jobs } = this.props;
    var { pageSize, currentPage } = this.state;
    var { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    var totalCount = jobs[0]?.data?.jobs.total;
    var { popoverOpen } = this.state;
    var { show, dates } = this.state;
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
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ width: "15rem", cursor: "pointer" }}
            >
              <h5
                className="dropdown-item"
                style={{ fontFamily: "sans-serif" }}
              >
                Sort
              </h5>
              <hr />
              <a className="dropdown-item" onClick={this.handleSort} style={{}}>
                Sort By Title
              </a>
              <a
                className="dropdown-item"
                onClick={this.handleDateFilter}
                style={{}}
              >
                Sort By Recently Added
              </a>

              <a
                className="dropdown-item"
                onClick={this.handleAssigneeRequired}
                style={{}}
              >
                Sort By Assignee Required
              </a>
              <hr />
              <h5
                style={{ fontFamily: "sans-serif" }}
                className="dropdown-item"
              >
                Filters
              </h5>
              <hr />
              <input
                type="date"
                name="dates"
                value={dates}
                id=""
                style={{ width: "11rem", margin: " 1rem 2rem" }}
                onChange={(e) => this.filterJobByDate(e)}
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
                    // transform:
                    //   navigator.userAgent.indexOf("Firefox") !== -1
                    //     ? "translateY(-3rem)"
                    //     : "translateY(-4.3rem)",
                  }}
                >
                  Create New
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {jobs[0] && jobs[0]?.data?.jobs?.docs?.length > 0 ? (
          <div >
            <div
              className={`row ${style.header}`}
              style={{ margin: "1rem 4%", fontWeight: "bold" }}
            >
             <div className="col-11">
            <div className="row">
            <div className="col-3">Title</div>
              <div className="col-3">Date(s)</div>
              <div className="col-2">Assignee</div>
              <div className="col-2">Services</div>
              <div className="col-2">Status</div>
             </div>
            </div>
              {this.props.user?.role == "admin" && (
                <div className="col-1">Actions</div>
              )}
            </div>

            <ul className="list-group">
              <div className={style.li}>
                {jobs[0].data.jobs.docs.map((job, i) => {
                  return (
                   
                      <li
                        key={i}
                        className={`checkbox list-group-item ${style.list}`}
                        style={
                          {
                            // color: "#fff",
                          }
                        }
                      >
                        <div className="row">
                          <div className="col-11">
                          <Link
                      key={i}
                      style={{ textDecoration: "none", color: "black" }}
                      to={{
                        pathname: `/job/details/${job._id}`,
                        jobProps: job,
                      }}
                    >

                            <div className="row">
                              <div className={`col-3 ${style.item}`} >
                                <label>{job.title}</label>
                              </div>
                              <div className={`col-3 ${style.item}`}
                                style={{ display: "flex" }}
                              >
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  style={{ margin: "0.2rem 0.5rem" }}
                                />{" "}
                                {
                                  <span style={{ display: "flex" }}>
                                    {job.dates[0]}
                                    {job.dates.length > 1 && (
                                      <div>
                                        <Typography
                                          aria-owns={
                                            open
                                              ? "mouse-over-popover"
                                              : undefined
                                          }
                                          aria-haspopup="true"
                                          onMouseEnter={(e) =>
                                            this.handleDatePopoverOpen(
                                              e,
                                              job._id
                                            )
                                          }
                                          onMouseLeave={
                                            this.handleDatePopoverClose
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
                                          onClose={this.handlePopoverClose}
                                          disableRestoreFocus
                                        >
                                          {job.dates.map((date) => (
                                            <Typography>{date}</Typography>
                                          ))}
                                        </Popover>
                                      </div>
                                    )}
                                  </span>
                                }
                              </div>
                              <div className={`col-2 ${style.item}`}>
                                <span style={{ display: "flex" }}>
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    style={{ margin: "0.2rem 0.5rem" }}
                                  />
                                  {job.assignee.length > 0
                                    ? job.assignee[0].name
                                    : "N/A"}

                                  {job.assignee.length > 1 && (
                                    <div>
                                      <Typography
                                        aria-owns={
                                          open
                                            ? "mouse-over-popover"
                                            : undefined
                                        }
                                        aria-haspopup="true"
                                        onMouseEnter={(e) =>
                                          this.handleAssigneePopoverOpen(
                                            e,
                                            job._id
                                          )
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
                                        onClose={this.handlePopoverClose}
                                        disableRestoreFocus
                                      >
                                        {job.assignee.map((assignee) => (
                                          <Typography>
                                            {assignee.name}
                                          </Typography>
                                        ))}
                                      </Popover>
                                    </div>
                                  )}
                                </span>
                              </div>
                              <div className={`col-2 ${style.item}`}>
                                <label style={{ display: "flex" }}>
                                  {job.services ? job.services[0].name : null}
                                  {job.services.length > 1 && (
                                    <div>
                                      <Typography
                                        aria-owns={
                                          open
                                            ? "mouse-over-popover"
                                            : undefined
                                        }
                                        aria-haspopup="true"
                                        onMouseEnter={(e) =>
                                          this.handlePopoverOpen(e, job._id)
                                        }
                                        onMouseLeave={this.handlePopoverClose}
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
                                          this.state.openedPopoverId == job._id
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
                                        onClose={this.handlePopoverClose}
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
                                </label>
                              </div>
                              <div className={`col-2 ${style.item}`}>
                                <label>{job.status}</label>
                              </div>
                           
                            </div>
                              </Link>
                          </div>

                          {this.props.user?.role === "admin" && (
                            <div className="col-1">
                              <Button
                                onClick={() => this.removeJob(i, job._id)}
                                style={{
                                  background: "#00ADEE",
                                  textTransform: "none",
                                  color: "#FFF",
                                  fontFamily: "sans-serif",
                                  width: "100%",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </li>
                  
                  );
                })}
              </div>
            </ul>
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
              // backdrop={false}
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
              {/* <Modal.Footer>
                            <button
                              className="btn btn-primary"
                              onClick={this.handleClose}
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-primary"
                              variant="primary"
                            >
                              Next
                            </button>
                          </Modal.Footer> */}
            </Modal>
          </div>
        ) : (
          <div className="text-center">
            <img src="/images/no-data-found.png" />
          </div>
        )}
      </div>
    );
  }
}
var mapStateToProps = (state) => ({
  jobs: state.jobs,
  user: state.users.user,
});

var actions = {
  getAllJobs,
  filterJobsByDate,
  deleteJob
};

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(JobsList);
