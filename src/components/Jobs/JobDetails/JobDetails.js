import React from "react";
import style from "./JobDetails.module.css";
import { Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getJob } from "../../../Redux/Job/jobActions";
import { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chip } from "@material-ui/core";

import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';
import LocationOffIcon from '@material-ui/icons/LocationOff';

const JobDetails = (props) => {
  const width = window.innerWidth;
  var jobprops = props.location.jobProps;
  // var job = null
  var [job, setJob] = useState(null);

  // var {getJob, jobs} = props
  var {
    match: {
      params: { jobId },
    },
  } = props;
  var [show, setShow] = useState(false);
  useEffect(() => {
    getJob(jobId)
      .then((res) => {
        console.log(res.data.job.activities)
        setJob(res.data.job);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  var handleShow = () => {
    setShow(true);
  };

  var handleClose = (notes) => {
    setShow(false);
  };
  console.log(job ?.activities)
  return (
    <div>
      <div>
        {job ? (
          <>
            {" "}
            <div className={`row ${style.toprow}`}>
              <div className="col-3 col-md-3">
                <div className={`card ${style.cardCustom}`}>
                  <div className="card-body">
                    <h5 className="card-title">Customer</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {job.customer.firstName} {job.customer.lastName}
                    </h6>
                    <p className="card-text">{job.customer.phone}</p>
                    <p className="card-text">{job.customer.email}</p>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginTop: "2rem", marginRight: "0.25rem" }}
                >
                  <div
                    className={`card ${style.cardCustom}`}
                    style={{
                      margin: "1rem",
                      width: "100%",
                      transform: "translateY(-1rem)",
                    }}
                  >
                    <div
                      className={`container ${style.cont}`}
                      style={{ margin: "1rem" }}
                    >
                      <h5
                        className={style.assigneehead}
                        style={{ flexWrap: "nowrap" }}
                      >
                        Assignees
                      </h5>
                      {job.assignee.map((assignee) => (
                        <p
                          className={style.assigneehead}
                          style={{ flexWrap: "nowrap" }}
                        >
                          <li> {assignee.name}</li>
                        </p>
                      ))}

                      {/* <p className={style.assigneehead} style = {{flexWrap:"nowrap"}}>Assignee 2</p> */}
                      <div>
                        {/* <Button name="Activities"  style = {{margin: "0"}}/> */}

                        {/* <!-- Modal --> */}
                        <Modal dialogClassName={`${style.modal}`}
                          show={show}
                          onHide={handleClose}
                          animation={false}
                          centered

                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Activities</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>

                            <div className="row" style={{ fontWeight: "bold" }}>
                              <div className={`col-2`}>Performer</div>
                              <div className={`col-6`}>Message</div>
                              <div className={`col-4`}>Timestamp</div>
                            </div>

                            {job.activities.map((activitiy) => <div className="row">
                              <div className={`col-2 `}> <p>{activitiy.performer.name}</p></div>
                              <div className={`col-6`}>
                                {activitiy.messageLogs.map(x => <p>* {x}</p>)}
                              </div>
                              <div className={`col-4 `}><p>  {activitiy.timeStamp.split("G")[0]}</p></div>
                            </div>)}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            {/* <Button variant="primary">Add Activity</Button> */}
                          </Modal.Footer>
                        </Modal>
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
                  </div>
                </div>
              </div>

              <div className="col-8 jumbotron">
                <div className="row">
                  <div className="col-8">
              <h3>{job.title}</h3>

              <div>
                 
                
                  <p>
                   
                  </p>
               
                  <label
                    // className={style.para}
                    // style={{ transform: "translateY(-2rem)" }}
                  >
                    {job.dates.map((x) => x)}
                  </label>
                 <p>
                 {job.services.map((service) => (
                      <Chip
                      variant = "outlined"
                        size="small"
                        label={service.name}
                        clickable
                        color="primary"
                        style = {{margin:"0.2rem"}}
                      />
                  ))}
                
                 </p>

                 {/* <h3 className={style.jobHead}>Job Description</h3> */}
                  <p className={style.para}>{job.description}</p>

                  {job.note.length !== 0 && (
                    <div>
                      <h3 className={style.jobHead}>Notes</h3>
                      {job.note.map((x) => (
                        <p className={style.para}>{x.text}</p>
                      ))}
                    </div>
                  )}

                  {job.locations &&
                    job.locations.map((list) => {
                      return (
                        <>
                          <p
                            className={style.para}
                           
                          >
                          <MyLocationOutlinedIcon color = "primary" style={{marginRight:"0.4rem"}} /> {list.from} <br></br> <LocationOffIcon color = "primary" style={{marginRight:"0.4rem"}}/>  {list.to}
                          </p>
                        </>
                      );
                    })}

                  
                </div>
                  </div>
                  <div className="col-2">
               <h5> Job Id: {job.jobId}</h5>
                  </div>
                  <div className="col-2">
                  <Chip
                              variant = "outlined"
                                size="small"
                                label={job.status}
                                clickable
                                color="primary"
                              />
                  </div>
                </div>
                <div >
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/job/edit/${jobId}`}
                  >
                    <button
                      type="button"
                      className={`btn btn-primary`}
                      style={{
                        background: "#0275d8",
                        border: "none",
                        outline: "none",
                        padding: "0.5rem 2rem",
                        color: "#fff",
                        float:"right",
                        borderRadius: "0.25rem",
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                </div>
              </div>

              
            </div>
            
                  
                  {/* <button className={`btn btn-primary ${style.btnCustom}`}>Add Notes</button> */}
              
          </>
        ) : null}
      </div>
    </div>
  );
};
// var mapStateToProps = (state) => ({
//     jobs: state.jobs
// })
// var actions = {
//     getJob
// }

export default JobDetails;
