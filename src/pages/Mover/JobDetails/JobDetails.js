import React, { useEffect } from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getMoverJobDetail, updateJob } from "../../../Redux/Mover/moverActions";
import { connect } from "react-redux";
import { Chip } from "@material-ui/core";
import parse from "html-react-parser";
import {  faEnvelope,  faMapMarker, faMapMarkerAlt, faMobile, faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoverJobDetails = (props) => {
  let { getMoverJobDetail } = props;
  let {
    match: {
      params: { jobId },
    },
  } = props;

  useEffect(() => {
    getMoverJobDetail(jobId);
  }, [getMoverJobDetail, jobId]);

  const paidInCash = () => {
    let { history, updateJob } = props;
    updateJob(job._id, { status: "Paid Cash" }, () => history.push("/mover"))
  };
  let { job } = props;
  return (
    <div className={style.jobEditContainer}>
      {job && (
        <>
          <div className={style.containerContent}>
            <div className={style.cards}>
              <div className={`card ${style.customerCard}`}>
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Customer</h5>
                  <h6 className="card-subtitle mb-2 text-capitalize">
                    <FontAwesomeIcon icon={faUser} />{" "}
                    {job.customer.firstName} {job.customer.lastName}
                  </h6>
                  <div className="card-text mb-2">
                    <FontAwesomeIcon icon={faMobile} />{" "}
                    {job.customer.phone}
                  </div>
                  <div className="card-text">
                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                    {job.customer.email}
                  </div>
                </div>
              </div>
              {/* assignee card */}
              <div className={`card ${style.assigneeCard}`}>
                <div className="card-body">
                  <h5 className="card-title font-weight-bold">Assignees</h5>
                  {job.assignee.map((assignee, i) => (
                    <div className={style.assigneehead} key={i}>
                      <li><FontAwesomeIcon icon={faUserShield} />{" "}{assignee.name}</li>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`${style.activityBtn}`}>
                {job.status === "booked" || job.status === "completed" ? (
                  <div className={style.payBtns}>
                    <div className={style.payOnlineBtn}>
                      <Button
                        className={style.buttons}
                        type="button"
                        onClick={paidInCash}
                      >
                        Pay in Cash
                    </Button>
                    </div>
                    <div className={style.payCashBtn}>
                      <Link
                        className={style.link}
                        to={{
                          pathname: "/mover/payment",
                          jobId: job._id,
                        }}
                      >
                        {" "}
                        <Button className={style.buttons} type="button">
                          Pay Online
                      </Button>
                      </Link>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={`${style.jobDetail}`}>
              <div className={style.jobHeader}>
                <h5>{job.title}</h5>

                <div className={style.jobHeader___childs}>
                  <div className={`text-muted ${style.jobDates}`}>
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
                  />
                </div>
                <div>
                  <div><h5>Services:</h5></div>
                  {job.services.map((service, i) => (
                    <Chip
                      key={i}
                      size="small"
                      color="primary"
                      variant="outlined"
                      label={service.name}
                      clickable
                    />
                  ))}
                </div>
              </div>

              <div className={style.jobDescription}>
                <div className={style.jobDescription___title}>
                  {`Job Description: `}
                </div>
                <div className={style.jobDescription___text}>
                  {parse(job.description)}
                </div>
              </div>

              {job.note.length !== 0 && (
                <div className={style.notes}>
                  <div className={style.notes___title}>
                    <h5>Notes:</h5>
                  </div>
                  {job.note.map((x, i) => (
                    <div className={style.notes___text} key={i}>{x.text}</div>
                  ))}
                </div>
              )}

              {job.locations && (
                <div className={style.locations}>
                  {job.locations.map((list, i) =>
                    list.type === "pickup" ? (
                      <div key={i}>
                        <FontAwesomeIcon icon={faMapMarker} />{" "}
                        <span className={style.locationType}>{`Pickup`} </span>{" "}
                        <div className={style.location}>{list.value}</div>
                      </div>
                    ) : (
                      <div key={i}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                        <span className={style.locationType}>{`Dropoff`}</span>
                        <div className={style.location}>{list.value}</div>
                        <div className="text-muted">
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

              {/* {job.status === "booked" || job.status === "completed" ? (
                <div className={style.payBtns}>
                  <div className={style.payOnlineBtn}>
                    <Button
                      className={style.buttons}
                      type="button"
                      onClick={paidInCash}
                    >
                      Pay in Cash
                    </Button>
                  </div>
                  <div className={style.payCashBtn}>
                    <Link
                      className={style.link}
                      to={{
                        pathname: "/mover/payment",
                        jobId: job._id,
                      }}
                    >
                      {" "}
                      <Button className={style.buttons} type="button">
                        Pay Online
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : null} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

var actions = {
  getMoverJobDetail,
  updateJob
};
var mapStateToProps = (state) => ({
  job: state.moverJobs.job
});

export default connect(mapStateToProps, actions)(MoverJobDetails);
