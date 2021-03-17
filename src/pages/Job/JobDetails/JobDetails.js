import React from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getJob } from "../../../Redux/Job/jobActions";
import { useEffect } from "react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@material-ui/core";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faEnvelope, faFemale, faHeadSideCough, faMapMarker, faMapMarkerAlt, faMobile, faMoneyBill, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import ActivitiesModal from "../../../components/ActivitiesModal/ActivitiesModal";
import JobConfirmationModal from "../../../components/JobConfirmationModal/JobConfirmationModal";
import DateAndTime from "../../../components/DateAndTime/DateAndTime";

const JobDetails = (props) => {
  let { job } = props;

  let {
    match: {
      params: { jobId },
    },
  } = props;
  const [show, setShow] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  let { getJob } = props;

  useEffect(() => {
    //fetch id on componentDidMount
    getJob(jobId);
  }, [getJob, jobId]);

  //show activities modal
  const handleShow = () => {
    setShow(true);
  };
  //close activities modal
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseAndRefresh = () => {
    setShowBooking(false);
    getJob(jobId);
  };
  // close jobConfirmation modal
  const closeJobConfirmationModal = () => {
    setShowBooking(false)
  }
  // let truckArr = job.trucks.map((x,i)=>{
  //   console.log(x.type)
  // })
  return (
    <div className={style.jobEditContainer}>
      {job ? (
        // defining containerContent CUSTOMER
        <div className={style.containerContent}>
          <div className={style.cards}>
            <div className={`card ${style.customerCard}`}>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">Customer</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <Link
                    className={style.link}
                    to={`/customer/detail/${job.customer._id}`}
                  >
                    <FontAwesomeIcon icon={faUser} />{" "}
                    {job.customer.firstName} {job.customer.lastName}
                  </Link>
                </h6>
                <div className="card-text mb-2">
                  <FontAwesomeIcon icon={faMobile} />{" "}
                  {job.customer.phone}</div>
                <div className="card-text mb-2">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  {job.customer.email}</div>
              </div>
            </div>
            <div>
              <div>
                {/* assinee card */}
                <div className={`card ${style.assigneeCard}`}>
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">Assignees</h5>
                    {job.assignee.length > 0 ? (
                      job.assignee.map((assignee, i) => (
                        <div key={i} className={style.assigneehead}>
                          <li> {assignee.name}</li>
                        </div>
                      ))
                    ) : (
                      <div>
                        <FontAwesomeIcon icon={faUserShield} />{" "}
                        {`Mover: `}

                        {job.assigneeRequired}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* activity button and modal */}
            <div className={`${style.activityBtn}  ${style.center}`}>
              <Button
                className={style.button}
                type="button"
                onClick={handleShow}
              >
                Activities
              </Button>

              <Link to={`/job/update/${jobId}`}>
                <Button className={`${style.button}`} type="button">
                  Edit
                  </Button>
              </Link>


              {job.status !== "booked" ? (
                <div className={style.jobBookBtn}>
                  <Button
                    className={style.button}
                    onClick={() => setShowBooking(true)}
                    type="button">
                    Book
                  </Button>
                </div>
              ) : null}
            </div>

          </div>{" "}

          {/* jobDetails section */}
          <div className={` card ${style.jobDetail}`}>
            <div className={style.jobHeader}>
              <h5>{job.title}</h5>
              <div className={style.jobHeader___childs}>
                <div className={style.jobDates} className="text-muted">
                  {job.dates.map((x, i) =>
                    i === 0 ? (
                      <span key={i}>{x.date}</span>
                    ) : (
                      <span key={i}> | {x.date} </span>
                    )
                  )}
                </div>
                <div className={style.job___IdStatus}>
                  <div>
                    {`Job Id: `}
                    <Chip
                      size="small"
                      label={job.jobId}
                      clickable
                      color="primary"
                    />
                  </div>
                  <div>
                    {`Status: `}
                    <Chip
                      size="small"
                      label={job.status}
                      clickable
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={style.service}>
              <div>
                <div><h5>Job Type:</h5></div>
                <Chip
                  clickable
                  size="small"
                  color="primary"
                  variant="outlined"
                  label={job.jobType}
                /></div>
              <div>
                <div><h5>Service:</h5></div>
                {job.services.map((service, i) => (
                  <Chip
                    key={i}
                    size="small"
                    color="primary"
                    variant="outlined"
                    label={service.name}
                    clickable
                  />
                ))}</div>


            </div>

            <div className={style.numbers}>
              <div>
                <h5>Job Movers:</h5>
                <Chip
                  clickable
                  color="primary"
                  variant="outlined"
                  size="small"
                  label={job.assigneeRequired}
                />
              </div>
              <div>
                <h5>Price:</h5>
                <Chip
                  clickable
                  color="primary"
                  variant="outlined"
                  size="small"
                  label={`${job.price} $`}
                />
              </div>

            </div>
            {/* Trucks */}
            <div>
              <h5>Truck Details:</h5>
              {job.trucks.map((x, i) =>
                <div className={style.truckSection}>
                  <div>
                    {`Type: `}
                    <Chip
                      className={style.truckSectionType}
                      clickable
                      color="primary"
                      variant="outlined"
                      size="small"
                      label={x.type}
                    />
                  </div>
                  <div>
                    {`No. Of Trucks: `}
                    <Chip
                      className={style.truckSectionNum}
                      clickable
                      color="primary"
                      variant="outlined"
                      size="small"
                      label={x.number}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={style.jobDescription}>
              <div className={style.jobDescription___title}>
                {`Job Description: `}
              </div>
              <div className={style.jobDescription___text}>
                {parse(job.description)}
              </div>
            </div>

            {job.locations && (
              <div className={job.locations.length > 0 ? `card ${style.locations}` : `${style.locations}`}>
                {job.locations.map((list, i) =>
                  list.type === "pickup" ? (
                    <div className={style.pickup} key={i}>
                      <FontAwesomeIcon icon={faMapMarker} />{" "}
                      <span className="location___type">{`Pickup: `} </span>{" "}
                      <div className={style.location}>
                        {`${list.value} (Load Only / IA)`}
                      </div>
                      <div>
                        {`Property Type: `}
                        <Chip
                          clickable
                          color="primary"
                          variant="outlined"
                          size="small"
                          label={list.propertyType}
                        /></div>
                    </div>
                  ) : (
                    <div className={style.dropoff} key={i}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                      <span className="location___type">{`Dropoff: `}</span>
                      <div className={style.location}>{`${list.value} (Unload Only)`}</div>
                      <div>
                        {`Property Type: `}
                        <Chip
                          clickable
                          color="primary"
                          variant="outlined"
                          size="small"
                          label={list.propertyType}
                        /></div>
                    </div>
                  )
                )}
              </div>
            )}
            {job.note.length !== 0 && (
              <div className={style.notes}>
                <div className={style.notes___title}>
                  <h5>Notes:</h5>
                </div>
                {job.note.map((x) => (
                  <div className={style.notes___text}>{x.text}</div>
                ))}
              </div>
            )}

          </div>
          <ActivitiesModal
            show={show}
            activities={job.activities}
            handleClose={handleClose}
          />

          <JobConfirmationModal job={job} show={showBooking} handleCloseAndRefresh={handleCloseAndRefresh} closeJobConfirmationModal={closeJobConfirmationModal} />
        </div>
      ) : null}
    </div>
  );
};
var mapStateToProps = (state) => ({
  job: state.jobs.job,
});
var actions = {
  getJob,
};

export default connect(mapStateToProps, actions)(JobDetails);
