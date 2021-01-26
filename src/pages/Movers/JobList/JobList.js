import React, { Component } from "react";
import style from "./JobList.module.css";
import { Link } from "react-router-dom";
import { getMover } from "../../../Redux/Mover/moverActions";
import { updateJob } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
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

class MoversJobsList extends Component {
  state = {
    isLoading: true,
    data: [],
    status: "completed",
    anchorEl: null,
    openedDatePopoverId: null,
    openedAssigneePopoverId: null,
    pageSize: 10,
    dates: "",
    value: "",
    currentPage: 1,
    recentlyAdded: false,
    sortByStatus: false,
  };

  componentDidMount = () => {
    var { getMover } = this.props;

    var moversObj = {
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
  };

  handleJobUpdate = (id) => {
    updateJob(id, { status: this.state.status });
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    this.filterJobByStatus(event.target.value);
  };

  markComplete = (list) => {
    updateJob(list._id, { status: "completed" }).then((res) => {
      if (res.data.status === 200) {
        var { getMover, showMessage } = this.props;
        showMessage(res.data.message);
        getMover();
      }
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

  handleRecentlyAdded = () => {
    var { getMover } = this.props;
    this.setState({
      recentlyAdded: true,
      sortByStatus: false,
    });
    var fetchMoverJobs = {
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
    this.setState({
      currentPage: 1,
    });
    getMover(fetchMoverJobs);
  };

  filterJobByStatus = (value) => {
    var { getMover } = this.props;
    this.setState({
      recentlyAdded: false,
      sortByStatus: true,
    });

    var fetchMoverJobs = {
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
    this.setState({
      currentPage: 1,
    });
    getMover(fetchMoverJobs);
  };

  filterJobByDate = (e) => {
    var { getMover } = this.props;
    this.setState({
      dates: e.target.value,
    });

    let date = new Date(e.target.value);
    var DateFilters = {
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
    this.setState({
      currentPage: 1,
    });
    getMover(DateFilters);
  };

  handlePageChange = (page) => {
    var { getMover } = this.props;
    var fetchMoverJobs;
    if (this.state.recentlyAdded === true) {
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
      this.setState({
        currentPage: page,
      });
    } else if (this.state.sortByStatus === true) {
      fetchMoverJobs = {
        filters: {
          jobStatus: this.state.value,
          dates: "",
          nearestDate: "",
        },
        sort: {
          createdAt: null,
        },
        page: page,
      };
      this.setState({
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
      this.setState({
        currentPage: page,
      });
    }
    getMover(fetchMoverJobs);
  };

  render() {
    const { moverJobs, user } = this.props;
    var { pageSize, currentPage } = this.state;
    var totalCount = moverJobs?.total;
    const open = Boolean(this.state.anchorEl);
    var { classes } = this.props;
    if (user) {
      getMover(user._id);
    }

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
                <p className="dropdown-item" onClick={this.handleRecentlyAdded}>
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
                  onChange={(e) => this.filterJobByDate(e)}
                />{" "}
                <hr />
                <FormControl component="fieldset">
                  <p className="dropdown-item">Filter By Status</p>

                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={this.state.value}
                    size="small"
                    onChange={this.handleChange}
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
                </FormControl>
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
                                    this.handleDatePopoverOpen(e, list._id)
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
                                    this.state.openedDatePopoverId === list._id
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
                                    this.handleAssigneePopoverOpen(e, list._id)
                                  }
                                  onMouseLeave={this.handleAssigneePopoverClose}
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
                                    this.state.openedAssigneePopoverId ===
                                    list._id
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
                              onClick={() => this.markComplete(list)}
                              type="checkbox"
                            ></input>
                            <div onClick={() => this.markComplete(list)}>
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
                  onPageChange={this.handlePageChange}
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
  }
}

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
