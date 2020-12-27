import React, { useState, useEffect } from "react";
import style from "./JobDetails.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { updateJob } from "../../../Redux/Mover/moverActions";

import { getJob } from "../../../Redux/Job/jobActions";
import { connect } from "react-redux";
import { showMessage } from "../../../Redux/Common/commonActions";
import { Chip } from "@material-ui/core";
import MyLocationOutlinedIcon from "@material-ui/icons/MyLocationOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import parse from 'html-react-parser';
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MoversJobDetails = (props) => {
  var [job, setJob] = useState(null);
  var {
    match: {
      params: { jobId },
    },
  } = props;
  useEffect(() => {
    getJob(jobId)
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const paidInCash = () => {
    let { history, showMessage } = props;
    updateJob(job._id, { status: "Paid Cash" }).then((res) => {
      if (res.data.status == 200) {
        showMessage(res.data.message);
        history.push("/mover");
      }
    });
  };

  return (
    <div className={style.main}>
      {job && (
        <>
          <div className={`row ${style.toprow}`}>
            <div className="col-3">
              <h4 style={{ fontFamily: "Roboto" }}>Customer</h4>
              <div className={`card ${style.cardCustom}`}>
                <div className="card-body" style={{ fontFamily: "Roboto" }}>
                  <h5 className="card-title">Account Holder</h5>
                  <p className="card-text">{job.customer.firstName}</p>
                </div>
                <ul className="list-group list-group-flush">
                  {/* <li className="list-group-item"><span>Location: </span>{job.customer.}</li> */}
                  <li className="list-group-item">
                    <span>Phone Number: </span>
                    {job.customer.phone}
                  </li>
                  <li className="list-group-item">
                    <span>Email: </span>
                    {job.customer.email}
                  </li>
                </ul>
              </div>
              <div className="row">
                <h4 className={style.head} style={{ fontFamily: "Roboto" }}>
                  Assignee
                </h4>
                <div className="col-11">
                  {job.assignee.map((assignee, i) => (
                    <div className={`card ${style.cardCustom}`}>
                      <div
                        className="card-body"
                        style={{ fontFamily: "Roboto" }}
                      >
                        <span className="card-title" key={i}>
                          {assignee.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`col-8 jumbotron ${style.jumbotron}`}>
              <div className="row">
                <h3 className="col-10">{job.title}</h3>
                <div className={`col-2`}>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={job.status}
                    clickable
                    color="primary"
                    style={{ margin: "0.2rem" }}
                  />

                  {/* <Button name={`${job.status}`} /> */}
                </div>
                <div className="col-12">
                  <p>
                    {job.dates.map((x, i) =>
                      i === 0 ? x : <span> | {x} </span>
                    )}
                  </p>
                </div>
                {/* <div className = "col-12">
                  <p>
                    {job.startTime} {job.meetTime ? "- " + job.meetTime : null}
                  </p>
                </div> */}
                {/* {job.locations.map((list, i) => (
                <div className = "col-12">
                      <p key={i} >
                    {list.from} to {list.to}
                  </p>
                </div>
                ))} */}
                <div className="col-12">
                  {job.services.map((service, i) => (
                    <Chip
                      variant="outlined"
                      size="small"
                      label={service.name}
                      clickable
                      color="primary"
                      style={{ margin: "0.2rem" }}
                    />
                  ))}
                </div>

                <h5
                  className={` col-12 card-text`}
                  style={{ fontFamily: "Roboto", margin: "0.7rem 0" }}
                >
                  Job Description
                </h5>
                <div
                  className={`col-12`}
                //   style={{ border: "2px solid rgba(0,0,0,0.125)" }}
                >
                  <div className="" style={{ fontFamily: "Roboto" }}>
                    <p className="card-text">{parse(job.description)}</p>
                  </div>
                </div>

                {job.length > 0 && (
                  <h5 className={style.head} style={{ fontFamily: "Roboto" }}>
                    Notes
                  </h5>
                )}
                <div
                //   className={`card`}
                //   style={{ border: "2px solid rgba(0,0,0,0.125)" }}
                >
                  {job.note.map((note, i) => (
                    <div
                      key={i}
                      //   className="card-body"
                      style={{ fontFamily: "Roboto" }}
                    >
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
                {/* {job.locations &&
                  job.locations.map((list) => {
                    return (
                      <div
                        className="col-12"
                        style={{ transform: "translateY(1rem)" }}
                      >
                        <p
                          style={{
                            fontFamily:
                              "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                          }}
                        >
                          <MyLocationOutlinedIcon
                            color="primary"
                            style={{ marginRight: "0.4rem" }}
                          />{" "}
                          {list.from} <br></br>{" "}
                          <LocationOffIcon
                            color="primary"
                            style={{ marginRight: "0.4rem" }}
                          />{" "}
                          {list.to}
                        </p>
                      </div>
                    );
                  })}
                   */}
                {job.locations.map((list) =>
                  list.type === "pickup" ?

                    <span style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", margin: "0" }}>
                      <FontAwesomeIcon icon = {faDotCircle} style={{ marginRight: "0.4rem" }} /> {list.value} <br></br>
                    </span>
                    :
                    <span style={{ fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", margin: "0" }}>
                      <FontAwesomeIcon icon = {faDotCircle} />  {list.value}
                    </span>)}
                <div className="col-12">
                  {job.status == "booked" || job.status == "completed" ? (
                    <div className={`row`}>
                      <div className="col-8"></div>
                      <div
                        className="col-2"
                        style={{ transform: "translateX(3rem)" }}

                      >
                        <Button
                          type="button"
                          style={{
                            background: "#00ADEE",
                            textTransform: "none",
                            color: "#FFF",
                            fontFamily: "sans-serif",
                            float: "right",
                            margin: "1rem 0rem",
                          }}
                          onClick={paidInCash}
                        >Pay in Cash</Button>
                      </div>
                      <div
                        className={`col-2 `}
                        style={{ transform: "translate3d(0rem,1rem, 0)" }}
                      >
                        <Link
                          to={{
                            pathname: "/mover/payment",
                            jobId: job._id,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          {" "}
                          <Button
                            type="button"
                            style={{
                              background: "#00ADEE",
                              textTransform: "none",
                              color: "#FFF",
                              fontFamily: "sans-serif",
                              float: "right",
                              // margin: "0 0.4rem",
                            }}
                          >Pay Online</Button>
                          {/* <Button name="Pay Online" /> */}
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

var actions = {
  showMessage,
};

export default connect(null, actions)(MoversJobDetails);
