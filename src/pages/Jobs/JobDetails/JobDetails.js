import React from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getJob } from "../../../Redux/Job/jobActions";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@material-ui/core";

import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import JobConfirmation from "../JobConfirmation/JobConfirmation";

const JobDetails = (props) => {
  const width = window.innerWidth;
  var { job } = props;

  var {
    match: {
      params: { jobId },
    },
  } = props;
  var [show, setShow] = useState(false);
  var [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    //fetch id on componentDidMount
    var { getJob } = props;
    getJob(jobId);
  }, []);
  //show activities modal
  var handleShow = () => {
    setShow(true);
  };
  //close activities modal
  var handleClose = () => {
    setShow(false);
  };
  const handleCloseAndRefresh = () => {
    setShowBooking(false);
    getJob(jobId);
  };
  return (
    <div className={style.jobEditContainer}>
      {job ? (
        // defining containerContent
        <div className={style.containerContent}>
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
                {/* assinee card */}
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
            {/* activity button and modal */}
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
                    <div className={style.modalContent}>
                      <div> {activitiy?.performer?.name}</div>
                      <div>
                        {activitiy?.messageLogs?.map((x) => (
                          <span>* {x}</span>
                        ))}
                      </div>
                      <div>{activitiy?.timeStamp?.split("G")[0]}</div>
                    </div>
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <div className={style.modalButtons}>
                    <Button className={`${style.button}`} onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                  {/* <Button variant="primary">Add Activity</Button> */}
                </Modal.Footer>
              </Modal>
            </div>
          </div>{" "}
          {/* jobDetails section */}
          <div className={`${style.jobDetail}`}>
            <div className={style.jobHeader}>
              <h3>{job.title}</h3>

              <div>
                {`Job Id:`}
                {job.jobId}
              </div>
              <div>
                {`Status:`}
                <Chip
                  variant="outlined"
                  size="small"
                  label={job.status}
                  clickable
                  color="primary"
                />
              </div>
            </div>
            <div className={style.jobDates}>
              {job.dates.map((x, i) => (i === 0 ? x : <span> | {x} </span>))}
            </div>
            <div className={style.service}>
              {job.services.map((service) => (
                <Chip
                  variant="outlined"
                  size="small"
                  label={service.name}
                  clickable
                  color="primary"
                />
              ))}
            </div>
            <div className={style.jobDescription}>{parse(job.description)}</div>
            {job.note.length !== 0 && (
              <div className={style.notes}>
                <div>
                  <h5>Notes</h5>
                </div>
                {job.note.map((x) => (
                  <div>{x.text}</div>
                ))}
              </div>
            )}

            {job.locations && (
              <div className={style.locations}>
                {job.locations.map((list) =>
                  list.type === "pickup" ? (
                    <div>
                      <FontAwesomeIcon icon={faDotCircle} />{" "}
                      <span>{`Pickup`} </span>{" "}
                      <div className={style.location}>{list.value}</div>
                    </div>
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faDotCircle} />{" "}
                      <span>{`Dropoff`}</span>
                      <div className={style.location}>{list.value}</div>
                    </div>
                  )
                )}
              </div>
            )}

            <div className={style.jobEditBtns}>
              
                <div className = {style.jobEditBtn}>
                  <Link className={`${style.link}`} to={`/job/update/${jobId}`}>
                  <Button className={style.buttons} type="button">
                    Edit
                  </Button>
                  </Link>
                </div>
              
              {job.status != "booked" ? (
                <div className = {style.jobBookBtn}>
                  <Button
                    className={style.buttons}
                    onClick={() => setShowBooking(true)}
                    type="button"
                  >
                    Book
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
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
