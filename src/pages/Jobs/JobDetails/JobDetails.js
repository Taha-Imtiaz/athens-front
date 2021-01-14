import React from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getJob } from "../../../Redux/Job/jobActions";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@material-ui/core";
import MyLocationOutlinedIcon from "@material-ui/icons/MyLocationOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import JobConfirmation from "../JobConfirmation/JobConfirmation";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDotCircle,
  faLocationArrow,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const JobDetails = (props) => {
  const width = window.innerWidth;
  var { job } = props;
  var jobprops = props.location.jobProps;
  // var [job, setJob] = useState(null);
  var {
    match: {
      params: { jobId },
    },
  } = props;
  var [show, setShow] = useState(false);
  var [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    var { getJob } = props;
    getJob(jobId);
    // .then((res) => {
    //   setJob(res.data.job);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }, []);

  var handleShow = () => {
    setShow(true);
  };

  var handleClose = (notes) => {
    setShow(false);
  };

  const handleCloseAndRefresh = () => {
    setShowBooking(false);
    getJob(jobId);
  };

  return (
    <div className={style.jobEditContainer}>
      <div className={style.containerContent}>
        {job ? (
          <>
            <div className={style.cards}>
              <div className={`card ${style.customerCard}`}>
                <div className="card-body">
                  <h5 className="card-title">Customer</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <Link
                      className={style.link}
                      to={`/customer/detail/${job.customer._id}`}
                    >
                      {job.customer.firstName} {job.customer.lastName}
                    </Link>
                  </h6>
                  <div className="card-text">{job.customer.phone}</div>
                  <div className="card-text">{job.customer.email}</div>
                </div>
              </div>
              <div>
                <div>
                  <div className={`card ${style.assigneeCard}`}>
                    <div className="card-body">
                      <h5 className="card-title">Assignees</h5>
                      {job.assignee.length > 0 ? (
                        job.assignee.map((assignee) => (
                          <div className={style.assigneehead}>
                            <li> {assignee.name}</li>
                          </div>
                        ))
                      ) : (
                        <div>Not Added</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${style.activityBtn}  ${style.center}`}>
                <Button
                  className={`${style.button}`}
                  type="button"
                  onClick={handleShow}
                >
                  Activities
                </Button>
                <Modal
                  dialogClassName={`${style.modal}`}
                  show={show}
                  onHide={handleClose}
                  // animation={false}
                  centered
                  scrollable
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Activities</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className={style.modalHeader}>
                      <div>Performer</div>
                      <div>Message</div>
                      <div>Timestamp</div>
                    </div>

                    {job.activities.map((activitiy) => (
                      <div
                        className="row"
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        <div className={`col-2 `}>
                          {" "}
                          <p>{activitiy?.performer?.name}</p>
                        </div>
                        <div className={`col-6`}>
                          {activitiy?.messageLogs?.map((x) => (
                            <p>* {x}</p>
                          ))}
                        </div>
                        <div className={`col-4 `}>
                          <p> {activitiy?.timeStamp?.split("G")[0]}</p>
                        </div>
                      </div>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      style={{
                        background: "#00ADEE",
                        textTransform: "none",
                        color: "#FFF",
                        fontFamily: "sans-serif",
                      }}
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    {/* <Button variant="primary">Add Activity</Button> */}
                  </Modal.Footer>
                </Modal>
              </div>
            </div>{" "}
            <div className={`${style.toprow}`}>
              <div className="col-8 jumbotron">
                <div className="row">
                  <div className="col-8">
                    <h3>{job.title}</h3>

                    <div>
                      <label
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                        // className={style.para}
                        // style={{ transform: "translateY(-2rem)" }}
                      >
                        {job.dates.map((x, i) =>
                          i === 0 ? x : <span> | {x} </span>
                        )}
                      </label>
                      <p
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                      >
                        {job.services.map((service) => (
                          <Chip
                            variant="outlined"
                            size="small"
                            label={service.name}
                            clickable
                            color="primary"
                            style={{ margin: "0.2rem" }}
                          />
                        ))}
                      </p>

                      {/* <h3 className={style.jobHead}>Job Description</h3> */}
                    </div>
                  </div>
                  <div className="col-2">
                    <h6 style={{ fontFamily: "sans-serif" }}>
                      <span style={{ color: "#a8a8a8" }}>{`Job Id:`} </span>{" "}
                      {job.jobId}
                    </h6>
                  </div>
                  <div className="col-2">
                    <span style={{ color: "#a8a8a8" }}>{`Status:`} </span>
                    <Chip
                      variant="outlined"
                      size="small"
                      label={job.status}
                      clickable
                      color="primary"
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  <div className="col-12" style={{ margin: "1rem 0" }}>
                    {/* <p className={style.para} style={{whiteSpace:"pre-line"}}> {job.description}</p> */}
                    {parse(job.description)}
                  </div>
                </div>

                {job.note.length !== 0 && (
                  <div>
                    <h5 className={style.jobHead}>Notes</h5>
                    {job.note.map((x) => (
                      <p
                        style={{
                          fontFamily:
                            "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                        }}
                        className={style.para}
                      >
                        {x.text}
                      </p>
                    ))}
                  </div>
                )}

                {job.locations && (
                  <div style={{ display: "flex" }} className="row">
                    {job.locations.map((list) =>
                      list.type === "pickup" ? (
                        <span
                          className="col-4"
                          style={{
                            fontFamily:
                              "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                            margin: "0",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faDotCircle}
                            style={{
                              margin: "0 0.4rem",
                              color: "rgb(223, 71, 89)",
                            }}
                          />{" "}
                          <span style={{ color: "#a8a8a8" }}>{`Pickup`} </span>{" "}
                          <div className={style.location}>
                            <p className={style.locationValue}>{list.value}</p>
                          </div>
                        </span>
                      ) : (
                        <span
                          className="col-4"
                          style={{
                            fontFamily:
                              "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                            margin: "0",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faDotCircle}
                            style={{
                              margin: "0 0.4rem",
                              color: "rgb(223, 71, 89)",
                            }}
                          />{" "}
                          <span style={{ color: "#a8a8a8" }}>{`Dropoff`}</span>
                          <div className={style.location}>
                            <p className={style.locationValue}>{list.value}</p>
                          </div>
                        </span>
                      )
                    )}
                  </div>
                )}

                <div>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/job/update/${jobId}`}
                  >
                    <Button
                      type="button"
                      style={{
                        background: "#00ADEE",
                        textTransform: "none",
                        color: "#FFF",
                        fontFamily: "sans-serif",
                        float: "right",
                        margin: "0 0.4rem",
                      }}
                    >
                      Edit
                    </Button>
                  </Link>
                  {job.status != "booked" ? (
                    <Button
                      onClick={() => setShowBooking(true)}
                      type="button"
                      style={{
                        background: "#00ADEE",
                        textTransform: "none",
                        color: "#FFF",
                        fontFamily: "sans-serif",
                        float: "right",
                      }}
                    >
                      Book
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <Modal
        dialogClassName={`${style.modal}`}
        show={showBooking}
        onHide={() => setShowBooking(false)}
        // animation={false}
        centered
        // backdrop={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobConfirmation data={job} close={handleCloseAndRefresh} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  job: state.jobs?.job,
});
var actions = {
  getJob,
};

export default connect(mapStateToProps, actions)(JobDetails);
