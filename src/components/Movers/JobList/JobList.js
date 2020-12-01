import React, { Component } from "react";
import style from "./JobList.module.css";
import DatePicker from "react-datepicker";
import Button from "../../Button/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { getMover } from "../../../Redux/Mover/moverActions";
import { updateJob } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { Popover, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "redux";

const width = window.innerWidth;

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
    openedAssigneePopoverId: null
  };

  componentDidMount = () => {
    var { getMover } = this.props;
    getMover();
    // if (user) {
    //     getMover(user._id)
    // }
    // this.setState({
    //     isLoading: false,
    //     data: this.props.moverJobs.data
    // })
  };

  // componentDidUpdate(props) {
  //     var { getMover } = props
  // }

  handleJobUpdate = (id) => {
    updateJob(id, { status: this.state.status });
  };

  markComplete = (list) => {
    updateJob(list._id, { status: "completed" }).then((res) => {
      if (res.data.status == 200) {
        var { getMover, showMessage } = this.props;
        showMessage(res.data.message);
        getMover();
      }
    });
  };

  handleDatePopoverOpen = (event, id) => {
    console.log(id);
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
    console.log(id);
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
  render() {
    const { moverJobs, user } = this.props;
    const open = Boolean(this.state.anchorEl);
    var { classes } = this.props;
    if (user) {
      getMover(user._id);
    }

    return (
      <div className={style.toprow}>
        <div className="row">
          <div className="col-6">
            <h3 className={style.head}>Jobs List Page</h3>
          </div>

          <div className="col-6">
            <div className={`d-flex justify-content-end ${style.buttons}`}>
              {/* <div className={` ${style.create}`}>
                                <Link style={{ textDecoration: "none" }} to='/job/create'> <Button name="Create New" /></Link>
                            </div>
                            <div className={style.btndel}>
                                <Button name="Delete" />
                            </div> */}
            </div>
          </div>
        </div>
        {moverJobs?.data?.jobs.length > 0 ? (
          <div
            className={`row  ${style.li}`}
            style={{
              fontWeight: "bold",
              marginTop: "2rem",
              marginBottom: "0.5rem",
            }}
          >
            <div className="col-3">Title</div>
            <div className="col-3">Date</div>
            <div className="col-3">Assignee</div>
            <div className="col-3">Status</div>
            {/* <div className="col-1" style={{ transform: "translateX(-1rem)" }}>
                    Actions
                </div> */}
          </div>
        ) : null}
        {moverJobs?.data?.jobs.length > 0 ? (
          moverJobs.data.jobs.map((list) => {
            return (
              <>
                <div>
                  <ul className="list-group ">
                    <div className={style.li}>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={"/mover/jobdetails/" + list._id}
                      >
                        <li
                          className={`checkbox list-group-item ${style.list}`}
                        >
                          <div className="row">
                            <div className={`col-3`}>
                              <div>
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleCheck1"
                                >
                                  {list.title}
                                </label>
                              </div>
                            </div>
                            <div className="col-3" style={{ display: "flex" }}>
                              {/* <i className="fa fa-calendar ">{list.dates.map(x => `${x}`)}</i> */}
                              <FontAwesomeIcon
                                icon={faCalendarAlt}
                                style={{ margin: "0.2rem 0.5rem" }}
                              />{" "}
                              {list.dates[0]}
                              {list.dates.length > 1 && (
                                <div style={{ display: "flex" }}>
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
                                      this.state.openedDatePopoverId == list._id
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
                            </div>

                            <div className="col-3" style={{display:"flex"}}>
                              <span style={{display:"flex"}}>
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ margin: "0.2rem 0.5rem" }}
                              />{" "}
                                {list.assignee.length > 0 ? (
                                  <div style={{display:"flex"}}>
                                    <label
                                      className={`checkbox-inline ${style.assignee}`}
                                      htmlFor="defaultCheck1"
                                    >
                                      {list.assignee[0].name}
                                    </label>
                                    {list.assignee.length > 1 && (
                                <div style={{display:"flex"}}>
                                  <Typography
                                    aria-owns={
                                      open ? "mouse-over-popover" : undefined
                                    }
                                    aria-haspopup="true"
                                    onMouseEnter={(e) =>
                                      this.handleAssigneePopoverOpen(e, list._id)
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
                                    {list.assignee.map((assignee) => (
                                      <Typography>{assignee.name}</Typography>
                                    ))}
                                  </Popover>
                                </div>
                              )}
                                  </div>
                                ) : (
                                  "No Assignees"
                                )}
                              </span>
                            </div>
                            {/* })} */}
                            {/* <div className="col-4 col-md-2 d-flex justify-content-center ">
                                            {list.status === 'completed' ? <label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label> : <><label className="form-check-label" htmlFor="exampleCheck1">{list.status}</label>&nbsp;&nbsp;&nbsp;<Button onClick={() => this.handleJobUpdate(list._id)} name="Completed" /></>}
                                        </div> */}
                            {list.status === "booked" ? (
                              <div className="col-3">
                                <input
                                  onClick={() => this.markComplete(list)}
                                  type="checkbox"
                                  id="exampleCheck1"
                                  style={{ margin: "0 0.4rem" }}
                                ></input>
                                <label
                                  onClick={() => this.markComplete(list)}
                                  className="form-check-label"
                                  htmlFor="exampleCheck1"
                                >
                                  Mark Complete
                                </label>
                              </div>
                            ) : (
                              <div className="col-2">{list.status}</div>
                            )}
                            <div>
                              {/* <Link style={{ textDecoration: "none" }} to={'/mover/jobdetails/' + list._id}> <Button name="Details" /></Link> */}
                            </div>
                          </div>
                        </li>
                      </Link>
                    </div>
                  </ul>
                </div>
              </>
            );
          })
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
  moverJobs: state.moverJobs,
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
