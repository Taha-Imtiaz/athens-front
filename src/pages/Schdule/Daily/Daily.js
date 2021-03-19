import React, { useState } from "react";
import style from "./Daily.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import {
  getalljobs, getalljobsfiveday
} from "../../../Redux/Schedule/scheduleAction";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { updateJob } from "../../../Redux/Job/jobActions";
import { cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Chip from "@material-ui/core/Chip";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { faUser, faClock, faBan } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-horizontal-datepicker";
import parse from "html-react-parser";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { htmlToText } from "html-to-text";
import Badge from '@material-ui/core/Badge';

const DailySchedule = (props) => {

  const [newAssignee, setAssignee] = useState("");
  const [showIndex, setShowIndex] = useState(null);
  const [today, setToday] = useState(new Date().toString());
  const [modalShow, setModalShow] = useState(false);
  const [mover, setMover] = useState("");
  const [moverAssignedJobs, setMoverAssignedJobs] = useState([]);
  const { getalljobs, getalljobsfiveday, movers, newDate } = props;

  const routes = [
    {
      title: "Daily Schedule",
      path: "/schedule",
      icon: <FontAwesomeIcon icon={faClock} />,
    },

    {
      title: "Unavailable",
      path: "/schedule/unavailable",
      icon: <FontAwesomeIcon icon={faBan} />,
    },

    {
      title: "Movers",
      path: "/schedule/movers",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  const generatePDF = (e, job) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    let dates = job.dates.map(x => x.date).join(" | ");
    console.log(dates)
    let services = job.services.map((e) => e.name).join(" | ");

    const doc = new jsPDF("p", "pt");
    const date = new Date();
    const columns = [
      { title: "Name", dataKey: "name" },
      { title: "Email", dataKey: "email" },
      { title: "Phone", dataKey: "phone" },
    ];
    const items = [
      {
        name: job.customer.firstName + job.customer.lastName,
        email: job.customer.email,
        phone: job.customer.phone,
      },
    ];

    let imgA = document.createElement("img");
    imgA.src = "/images/movers-logo.jpg";
    doc.addImage(imgA, "JPEG", 45, 10, 90, 90);

    doc.setFont("times").setFontSize(22).text(420, 40, "JOB DETAILS");
    doc.setFont("times").setFontSize(10).text(400, 70, "Print Date:");
    doc.setFont("times").setFontSize(10).text(490, 70, date.toDateString());
    doc.setFont("times").setFontSize(10).text(400, 85, "Job Id:");
    doc.setFont("times").setFontSize(10).text(490, 85, `${job.jobId}`);
    doc.setFont("times").setFontSize(10).text(400, 100, "Movers Required:");
    doc
      .setFont("times")
      .setFontSize(10)
      .text(490, 100, `${job.assigneeRequired}`);
    doc.setFont("times").setFontSize(10).text(400, 115, "Job Type:");
    doc.setFont("times").setFontSize(10).text(490, 115, job.jobType);

    doc.setFont("times").setFontSize(15).text(50, 200, job.title);

    doc.setFont("times").setFontSize(11).text(50, 235, dates);

    doc.setFont("times").setFontSize(11).text(50, 260, services);

    doc
      .setFont("times")
      .setFontSize(11)
      .text(
        50,
        285,
        job.dates[0].time ? formatAMPM(job.dates[0].time) : "No Time Added"
      );

    doc.autoTable(columns, items, { margin: { top: 310 } });

    doc
      .setFont("times")
      .setFontSize(11)
      .text(50, 375, htmlToText(job.description));

    // doc.save(`${job.title}.pdf`);

    doc.autoPrint();
    //This is a key for printing
    doc.output('dataurlnewwindow');
  };

  const formatAMPM = (startTime) => {
    let date = new Date(startTime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const updateJobAssignee = (e, job) => {
    if (e) {
      e.stopPropagation();
    }
    let { loggedinUser, updateJob } = props;
    let jobToUpdate = cloneDeep(job);
    jobToUpdate.userId = loggedinUser._id;
    jobToUpdate.customerId = jobToUpdate.customer.email;
    delete jobToUpdate.assignee;
    delete jobToUpdate.customer;
    updateJob(jobToUpdate._id, jobToUpdate, (res) => {
      getalljobs({
        date: today,
      });
      getalljobsfiveday({
        date: today,
      });
    });
  };

  const removeAssignee = (e, job, assignee) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    let { loggedinUser, updateJob } = props;
    let jobToUpdate = cloneDeep(job);
    jobToUpdate.userId = loggedinUser._id;
    jobToUpdate.customerId = jobToUpdate.customer.email;
    let assigneesId = jobToUpdate.assignee.map((x) => x._id);
    let assigneeIndex = jobToUpdate.assignee.findIndex(
      (x) => x._id === assignee
    );
    assigneesId.splice(assigneeIndex, 1);
    jobToUpdate.assigneesId = assigneesId;
    delete jobToUpdate.assignee;
    delete jobToUpdate.customer;
    updateJob(jobToUpdate._id, jobToUpdate, (res) => {
      getalljobs({
        date: today,
      });
      getalljobsfiveday({
        date: today,
      });
    });
  };

  const toggleCollapse = (i) => {
    if (i === showIndex) {
      setShowIndex(null);
    } else {
      setShowIndex(i);
    }
  };

  const jobDetailsNavigate = (jobId) => {
    let { history } = props;
    history.push(`/job/detail/${jobId}`);
  };

  const updateJobAssigneeList = (e, moverObj) => {
    e.stopPropagation();
    setModalShow(false);
    moverObj.assigneesId.push(moverObj.moverId);
    moverObj.jobToUpdate.assigneesId = moverObj.assigneesId;
    let job = cloneDeep(moverObj.jobToUpdate);
    updateJobAssignee(e, job);
  };

  const useStyles = makeStyles((theme) => ({
    popover: {
      pointerEvents: "none",
    },
  }));

  useStyles();

  const printAllJobs = (e) => {
    for (var job of props.jobs) {
      generatePDF(e, job);
    }
  };

  const Navigate = (e) => {
    setModalShow(false);
  };

  const onSelectedDay = (d) => {
    getalljobs({
      date: d.toString(),
    });
    getalljobsfiveday({
      date: d.toString(),
    });
    setToday(new Date(d).toString());
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    let { showMessage } = props;
    let moverId = source.droppableId;
    if (!destination) {
      console.log('destination not found')
      showMessage("Please drop on job item.");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      showMessage("Please drop on job item.");
      return;
    }

    let jobToUpdate = props.jobs.filter(
      (job) => job.jobId === parseInt(destination.droppableId)
    );

    if (jobToUpdate.length > 0) {
      let index = jobToUpdate[0].assignee.findIndex(
        (x) => x._id === source.droppableId
      );
      if (index !== -1) {
        // Already Assigned
        showMessage("Already Assigned");
      } else {
        let assigneesId = jobToUpdate[0].assignee.map((x) => x._id);

        let index = movers.findIndex((x) => x.mover._id === moverId);
        let moverAssignedDate = movers[index].mover.jobs.filter((job) => {
          return (
            job.dates.some((date) => date === new Date(today).toDateString()) &&
            job.status === "booked"
          );
        });

        let moverJobs = moverAssignedDate.length > 0 ? true : false;
        if (moverJobs) {
          let mover = movers.find((x) => x.mover._id === moverId);
          setMover(mover);
          setMoverAssignedJobs(moverAssignedDate)
          let newAssigneeObj = {
            moverId,
            assigneesId: assigneesId,
            jobToUpdate: jobToUpdate[0],
          };
          setAssignee(newAssigneeObj);
          setModalShow(true);
        } else {
          assigneesId.push(moverId);
          jobToUpdate[0].assigneesId = assigneesId;
          let job = cloneDeep(jobToUpdate[0]);
          updateJobAssignee(null, job);
        }
      }
    }
  };
  return (
    <div className={`${style.scheduleContainer}`}>
      <div className={style.sidebar}>
        <SideBar routes={routes} />
      </div>
      <div className={style.dragContent}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={style.jobContent}>
            <div className={style.styleDatePicker}>
              <DatePicker
                endDate={365}
                getSelectedDay={(e) => {
                  onSelectedDay(e);
                }}
                labelFormat={"MMMM yyyy"}
                color={"#323232"}
                selectDate={newDate}
              />
            </div>
            <hr className={style.styleLine}></hr>
            {props.jobs && props.movers && (
              <div className={style.moverAssigneeInfo}>
                <div>
                  <h6>
                    {`Total Jobs: `} <span>{props.jobs.length}</span>{" "}
                  </h6>
                </div>
                <div>
                  <h6>
                    {`Movers Available:`} <span> {props.movers.length}</span>{" "}
                  </h6>
                </div>
                <div>
                  <h6>
                    Movers Required:{" "}
                    {props.jobs.length > 0 ? (
                      props.jobs.reduce(
                        (sum, currentValue) =>
                          sum + currentValue.assigneeRequired,
                        0
                      )
                    ) : (
                      <span>0</span>
                    )}
                  </h6>
                </div>
                <div>
                  <Button className={style.button} onClick={printAllJobs}>
                    <i className="fa fa-print"></i>
                    Print All
                  </Button>
                </div>
              </div>
            )}

            <hr className={style.styleLine}></hr>
            {/* {props.jobs && props.jobs.length > 0 && (
              <div className={style.jobListHeader}>
                <div>Title</div>
                <div>Movers Req.</div>
                <div>Time</div>
                <div>Assignee</div>
                <div>Action</div>
              </div>
            )} */}

            {props.jobs && props.jobs.length > 0 ? (

              props.jobs.map((list, i) => {

                return (
                  <Droppable
                    droppableId={list.jobId.toString()}
                    type="TASK"
                    key={i}

                  >
                    {(provided, snapshot) => (
                      <div
                        id="accordion"
                        key={i}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div
                          className={list.assignee.length < list.assigneeRequired ? `${style.cardHeader} card-header ${style.dangerClass} ${style.flex}` : `card-header ${style.cardHeader} ${style.flex}`}
                          aria-expanded="true"
                          data-toggle="collapse"
                          data-target={`#collapse${i}`}
                          aria-controls="collapse"
                          id="headingOne"
                          onClick={() => toggleCollapse(i)}
                          onDoubleClick={() => jobDetailsNavigate(list._id)}
                        >
                          <div>
                            <div className={style.heading}>{`Title:`}</div>
                            <div className={style.content}>{list.title}</div>
                          </div>

                          <div>
                            <div className={style.heading}>{`Movers Req:`}</div>
                            <div className={style.content}>{list.assigneeRequired}</div>

                            <span className={style.hideJobId}>
                              {list.jobId}
                            </span>
                          </div>

                          <div>
                            <div className={style.heading}>{`Time:`}</div>
                            <div className={style.content}>{list.startTime
                              ? formatAMPM(list.startTime)
                              : "N/A"}</div>
                          </div>

                          <div>
                            <div className={style.heading}>{`Assignee:`}</div>
                            <div className={style.content}>{list.assignee.length > 0 ? (

                              <div>

                                {list.assignee.map((assignee, i) => (
                                  <div key={i} className={style.assignee}>

                                    <div className={style.assigneeName}>
                                      {assignee.name}
                                    </div>

                                    <div className={style.closeIcon}>
                                      <FontAwesomeIcon
                                        onClick={(e) =>
                                          removeAssignee(e, list, assignee._id)
                                        }
                                        icon={faTimes}
                                        size="1x"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div>N/A</div>
                            )}</div>

                          </div>

                          <div>
                            <Button className={style.deleteButton} onClick={(e) => generatePDF(e, list)}>
                              <i className="fa fa-print"></i>
                              {` Print`}
                            </Button>
                          </div>
                        </div>
                        <div
                          id={`collapse${i}`}
                          className="collapse"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className={`card-body ${style.cardBody}`}>
                            <h4>Job Details</h4>
                            <div className={style.jobDetailList}>
                              <div className={style.jobTitle}>
                                <div className={`text-muted ${style.heading}`}>{`Job Title:`}</div>
                                <div className={style.content}>{list.title} </div>
                              </div>
                              <div className={style.jobsId}>
                                <div className={`text-muted ${style.heading}`}>{`Job ID:`}</div>
                                <div className={style.content}>{list.jobId}</div>
                              </div>

                              <div className={style.jobTypee}>
                                <div className={`text-muted ${style.heading}`}>{`Job Type:`}</div>
                                <div className={style.content}>{list.jobType}</div>
                              </div>
                              <div className={style.jobStatus}>
                                
                                  <div className={`text-muted ${style.heading}`}>{`Status:`}</div>
                                  <Chip
                                   className={style.content}
                                    label={list.status}
                                    clickable
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                  ></Chip>
                                </div>
                              
                            </div>

                            <div className={style.jobDescriptionHeader}>
                              <h4>Job Description</h4>
                            </div>
                            <div className={style.jobDescription}>
                              <span className={style.jobDescriptionText}>{parse(list.description)}</span>
                            </div>
                            <hr />
                            <div className={style.customerDetailContainer}>
                              <h4>Customer Details</h4>
                              <div className={style.customerDetailList}>
                                <div className={style.customerDetailListContent}>
                                  <div>
                                    <div className={`text-muted ${style.heading}`}>{`Name:`}</div>
                                    <div className={style.content}>
                                      {list.customer.firstName}
                                      {list.customer.lastName}
                                    </div>
                                  </div>

                                  <div>
                                    <div className={`text-muted ${style.heading}`}>{`E-Mail:`}</div>
                                    <div className={style.contentMail}>{list.customer.email}</div>
                                  </div>
                                  <div>
                                    <div className={`text-muted ${style.heading}`}>{`Phone:`}</div>
                                    <div className={style.content}>{list.customer.phone}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                );
              })
            ) : (
              <div className="text-center">
                <img src="/images/no-data-found.png" alt="" />
              </div>
            )}
          </div>

          <div className={`${style.movers}  ${style.mov}`} id="mov">
            <div className={` ${style.scroll}`}>
              <h4 className={`  ${style.movehead}`}>Movers</h4>
              <div className={`${style.scrollBar}`}>
                <div className={`  ${style.scrollContent}`}>
                  {movers &&
                    movers.map((list, i) => {
                      return (
                        <div key={i}>
                          <Droppable
                            droppableId={list.mover._id.toString()}
                            type="TASK"
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                <Draggable
                                  draggableId={list.mover._id.toString()}
                                  index={i}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                    >
                                      {" "}
                                      <h6 className={style.moverHeader} key={i}>
                                        <label>{i + 1}.</label>{" "}
                                        <Badge badgeContent={list.mover.todayJobs} color="primary">
                                          {list.mover.name}
                                        </Badge>
                                        {" "}
                                        <span className={style.hideAssigneeId}>
                                          {list.mover._id}
                                        </span>
                                      </h6>
                                    </div>
                                  )}
                                </Draggable>
                              </div>
                            )}
                          </Droppable>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={(e) => Navigate(e)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mover && (
            <h5>
              {mover.mover.name}{" "}
              <span className={style.styleText}>
                has been assigned to these jobs:
              </span>{" "}
            </h5>
          )}

          {moverAssignedJobs &&
            moverAssignedJobs.map((job, i) => (
              <div key={i} className={style.styleModalBody}>
                <a
                  className={style.styleLink}
                  href="/#"
                  onClick={() =>
                    window.open(`/job/detail/${job._id}`, "_blank")
                  }
                >
                  &#42;{job.title}
                </a>
                <Chip
                  label={job.startTime ? formatAMPM(job.startTime) : "N/A"}
                  clickable
                  color="primary"
                  variant="outlined"
                ></Chip>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <div className={style.modalBtns}>
            <Button
              className={style.button}
              onClick={(e) => updateJobAssigneeList(e, newAssignee)}
            >
              Confirm
            </Button>
            <Button
              className={style.button}
              onClick={(e) => {
                Navigate(e);
              }}
            >
              Close
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  jobs: state.schedule.jobList,
  movers: state.schedule.moverList,
  loggedinUser: state.users.user,
  newDate: state.common.scheduleDate,
});

var actions = {
  getalljobs,
  getalljobsfiveday,
  showMessage,
  updateJob,
};
export default connect(mapStateToProps, actions)(DailySchedule);
