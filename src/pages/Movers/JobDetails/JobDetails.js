import React, { useEffect } from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  getMoverJobDetail,
  updateJob,
} from "../../../Redux/Mover/moverActions";

import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { Chip } from "@material-ui/core";
import parse from "html-react-parser";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoversJobDetails = (props) => {
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
    let { history, showMessage } = props;
    updateJob(job._id, { status: "Paid Cash" }).then((res) => {
      if (res.data.status === 200) {
        showMessage(res.data.message);
        history.push("/mover");
      }
    });
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
                  <h5 className="card-title">Customer</h5>
                  <h5 className="card-title">Account Holder</h5>
                  <div className="card-text">{job.customer.firstName}</div>
                  <div className="card-text">{job.customer.phone}</div>
                  <div className="card-text">{job.customer.email}</div>
                </div>
              </div>
              <div className={`card ${style.assigneeCard}`}>
                {job.assignee.map((assignee, i) => (
                  <div className="card-body" key={i}>
                    <h5 className="card-title">Assignees</h5>
                    <div className={style.assigneehead}>
                      <li> {assignee.name}</li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${style.jobDetail}`}>
              <div className={style.jobHeader}>
                <h3>{job.title}</h3>
                <div>
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
                {job.dates.map((x, i) =>
                  i === 0 ? (
                    <span key={i}>{x}</span>
                  ) : (
                      <span key={i}> | {x} </span>
                    )
                )}
              </div>

              <div className={style.service}>
                {job.services.map((service, i) => (
                  <Chip
                    key={i}
                    variant="outlined"
                    size="small"
                    label={service.name}
                    clickable
                    color="primary"
                  />
                ))}
              </div>

              <div className={style.jobDescription}>
                <div className="">{parse(job.description)}</div>
              </div>

              {job.note.length !== 0 && (
                <div className={style.notes}>
                  <div>
                    <h5>Notes</h5>
                  </div>
                  {job.note.map((x, i) => (
                    <div key={i}>{x.text}</div>
                  ))}
                </div>
              )}

              {job.locations && (
                <div className={style.locations}>
                  {job.locations.map((list, i) =>
                    list.type === "pickup" ? (
                      <div key={i}>
                        <FontAwesomeIcon icon={faDotCircle} />{" "}
                        <span>{`Pickup`} </span>{" "}
                        <div className={style.location}>{list.value}</div>
                      </div>
                    ) : (
                        <div key={i}>
                          <FontAwesomeIcon icon={faDotCircle} />{" "}
                          <span>{`Dropoff`}</span>
                          <div className={style.location}>{list.value}</div>
                        </div>
                      )
                  )}
                </div>
              )}

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
        </>
      )}
    </div>
  );
};

var actions = {
  showMessage,
  getMoverJobDetail,
};
var mapStateToProps = (state) => ({
  job: state.moverJobs.job
});

export default connect(mapStateToProps, actions)(MoversJobDetails);
