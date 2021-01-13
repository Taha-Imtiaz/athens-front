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
  var {job} = props
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
    var {getJob} = props
    getJob(jobId)
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
    getJob(jobId)
      // .then((res) => {
      //   setJob(res.data.job);
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };
  
  return (
    <div>
      <div>
        {job ? (
          <>
            {" "}
            <div className={`row ${style.toprow}`}>
              <div className="col-3 col-md-3">
                <div
                  className={`card ${style.cardCustom}`}
                  style={{
                    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                  }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      Customer
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/customer/detail/${job.customer._id}`}
                      >
                        {job.customer.firstName} {job.customer.lastName}
                      </Link>
                    </h6>
                    <p className="card-text">{job.customer.phone}</p>
                    <p className="card-text">{job.customer.email}</p>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "2rem" }}>
                  <div className="col-11 col-md-11">
                    <div
                      className={`card ${style.cardCustom}`}
                      style={{
                        // margin: "1rem",
                        // width: "100%",
                        transform: "translateY(-1rem)",
                      }}
                    >
                      <div
                        className={`container ${style.cont}`}
                        style={{ margin: "1rem" }}
                      >
                        <h5
                          className={style.assigneehead}
                          style={{
                            flexWrap: "nowrap",
                            fontFamily: "sans-serif",
                          }}
                        >
                          Assignees
                        </h5>
                        {job.assignee.length > 0 ? (
                          job.assignee.map((assignee) => (
                            <p
                              style={{
                                fontFamily:
                                  "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                              }}
                              className={style.assigneehead}
                              style={{ flexWrap: "nowrap" }}
                            >
                              <li> {assignee.name}</li>
                            </p>
                          ))
                        ) : (
                            <p
                              style={{
                                fontFamily:
                                  "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                              }}
                            >
                              Not Added
                          </p>
                          )}
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-10">
                    <button
                      type="button"
                      onClick={handleShow}
                      type="submit"
                      className={`btn btn-primary ${style.btnCustom}`}
                      style={{
                        background: "#0275d8",
                        border: "none",
                        outline: "none",
                        padding: "0.5rem 1rem",
                        color: "#fff",
                        borderRadius: "0.25rem",
                      }}
                    >
                      Activities
                    </button>
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
                        <div
                          className="row"
                          style={{
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                          }}
                        >
                          <div className={`col-2`}>Performer</div>
                          <div className={`col-6`}>Message</div>
                          <div className={`col-4`}>Timestamp</div>
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
                </div>
              </div>

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
                      <span style={{ color: "#a8a8a8" }}>
                        {`Job Id:`} </span>
                      {" "}
                      {job.jobId}
                    </h6>
                  </div>
                  <div className="col-2">
                    <span style={{ color: "#a8a8a8" }}>
                      {`Status:`} </span>
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
                          <span style={{ color: "#a8a8a8" }}>
                            {`Pickup`} </span>{" "}
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
                            <span style={{ color: "#a8a8a8" }}>
                              {`Dropoff`}</span>
                            <div className={style.location} >
                              <p className={style.locationValue} >{list.value}</p>
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
  );
};
var mapStateToProps = (state) => ({
    job: state.jobs?.job
})
var actions = {
    getJob
}

export default connect(mapStateToProps, actions)(JobDetails);
