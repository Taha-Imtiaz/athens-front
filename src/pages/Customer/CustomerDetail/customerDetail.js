import React, { useEffect, useState } from "react";
import style from "./customerdetail.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal, Alert } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import MyLocationOutlinedIcon from "@material-ui/icons/MyLocationOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import parse from 'html-react-parser';

import {
  AppBar,
  Box,
  FormControl,
  Tab,
  Tabs,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import { updateClaim } from "../../../Redux/Claims/claimsActions";
import Badge from "@material-ui/core/Badge";
import TimeAgo from "react-timeago";
import { cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import BlanketList from "../../BlanketList/BlanketList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [update, setUpdate] = useState("");
  const [updateIndex, setUpdateIndex] = useState(0);

  const [waitTo, setWaitTo] = useState(true);
  const [claimInput, setClaimInput] = useState("");
  const [claimIndex, setClaimIndex] = useState("")

  const [blankets, setBlankets] = useState([]);
  var [note, setNote] = useState("");

  var [addClaim, setAddClaim] = useState(false);
  var [edit, setEdit] = useState(false);

  var [blanketValue, setBlanketValue] = useState([]);
  var [depositValue, setDepositValue] = useState("");
  var { customer, getCustomer } = props;
  var [claimCount, setClaimCount] = useState(0);

  var {
    match: {
      params: { customerId },
    },
  } = props;

  var data = [];
  if (customer ?.claim) {
    // setBlanketValue(customer.blanketDeposit.cost)
    data = customer.claim;
  }

  const updateClaimData = () => {
    let ob = {
      timestamp: new Date(),
      value: update,
    };
    let newData = cloneDeep(data);
    newData[updateIndex].updates.unshift(ob);
    var { showMessage, history } = props;
    updateClaim(newData[updateIndex])
      .then((res) => {
        if (res.data.status == 200) {
          data[updateIndex].updates = res.data.claim.updates;
          setShow(false);
          setUpdate("");
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  useEffect(() => {
    if (customer) {
    }
    getCustomer(customerId);
  }, []);

  useEffect(() => {
    //calculate blanket and claims Count
    var customerClaims = customer ?.claim;
    var customerBlanket = customer ?.blanketDeposit;
    if (customerClaims ?.length > 0) {
      let openClaims = customerClaims.filter((claim) => claim.status === "open")
        .length;
      setClaimCount(openClaims);
    } else {
      setClaimCount(0);
    }

    setBlanketValue(customer ?.blanketDeposit);
  }, [customer]);

  const routes = [
    {
      title: "Claims",
      path: "/claim/customer",
      icon: <i className="fa fa-exchange"></i>,
    },
    {
      title: "Blanket Deposit",
      path: "/claim/customerdeposit",
      icon: <i className="fa fa-bed"></i>,
    },
  ];
  var handleAddNote = (e) => {
    var { name, value } = e.target;
    setNote(value);
  };
  var AddNote = () => { };

  var [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addNewClaim = (i) => {
    setShow(true);
  };

  const TabPanel = (props) => {
    var { children, value, index, ...other } = props;
    return (
      <div
        // role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  };

  const [showIndex, setShowIndex] = useState(null);
  const toggleCollapse = (i) => {
    if (i == showIndex) {
      setShowIndex(null);
    } else {
      setShowIndex(i);
    }
  };

  const decrement = (x, i) => {
    // let newData = cloneDeep(blankets);
    // newData[i].quantity = --x.quantity;
    // setBlankets(newData);
    customer.blanketDeposit.quantity = customer.blanketDeposit.quantity - 1;
  };

  const increment = (x, i) => {
    // let newData = cloneDeep(blankets);
    // newData[i].quantity = ++x.quantity;
    // setBlankets(newData);
    customer.blanketDeposit.quantity = customer.blanketDeposit.quantity + 1;
  };

  const handleCloseJob = (i) => {
    var { showMessage } = props;

    data[i].status = "closed";
    updateClaim(data[i])
      .then((res) => {
        if (res.data.status == 200) {
          let newCount = --claimCount;
          setClaimCount(newCount);
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  const updateBlanket = (data) => {
    setBlanketValue(data);
  };

  var editInput = (e, i) => {
    // e.stopPropagation()
    // e.stopPropagation()
    // e.nativeEvent.stopImmediatePropagation();
    setClaimIndex(i)
    if (claimIndex === i) {
      setWaitTo(false)
    }
    else {
      setWaitTo(true)
    }
  };
  var handleClaimInput = (e, i, claim) => {
    // e.stopPropagation()
    // e.nativeEvent.stopImmediatePropagation();
    if (claimIndex === i) {
      claim.waitTo = e.target.value
      setClaimInput(e.target.value)
    }

  };

  var disableInput = (e, claim, i) => {
    // e.stopPropagation()
    // e.nativeEvent.stopImmediatePropagation();
    var { showMessage } = props;
    if (claimIndex === i) {
      setWaitTo(true);
      claim.waitTo = claimInput



      updateClaim(claim)
        .then((res) => {
          if (res.data.status == 200) {
            showMessage(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }

  };
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-1">
              {/* <SideBar routes={routes} key={customerId} /> */}
            </div>
            <div className="col-10" style={{ margin: "1rem" }}>
              <div className="row">
                <div className="col-12">
                  <AppBar position="static">
                    <div className="row">
                      <Tabs
                        className="col-12"
                        style={{ background: "#00ADEE", border: "none" }}
                        onChange={handleChange}
                        value={value}
                        aria-label="simple tabs example"
                      >
                        <Tab label="Customer Information" className="col-4" />

                        <Tab
                          label={
                            <Badge badgeContent={claimCount} color="primary">
                              Claims
                            </Badge>
                          }
                          className="col-4"
                        />

                        <Tab
                          label={
                            <Badge
                              badgeContent={customer ?.blanketDeposit.reduce(
                                (sum, currentValue) =>
                                  sum + parseInt(currentValue.quantity),
                                0
                              )}
                              color="primary"
                            >
                              Blankets
                            </Badge>
                          }
                          className="col-4"
                        />
                      </Tabs>
                    </div>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div
                      style={{
                        fontFamily:
                          "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                      }}
                    >
                      <div className="row">
                        <div className="col-8">
                          <h3 className={style.head}>Customer Information</h3>
                        </div>
                        <div
                          className="col-2"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-start",
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={{
                              pathname: "/job/create",
                              customerId: customer.email,
                              customerName: customer.firstName + ' ' + customer.lastName,
                              jobs: customer.jobs
                            }}
                          >
                            {" "}
                            <Button
                              style={{
                                background: "#00ADEE",
                                textTransform: "none",
                                color: "#FFF",
                                fontFamily: "sans-serif",
                              }}
                            >
                              Create Job
                            </Button>{" "}
                          </Link>
                        </div>
                        <div className="col-2">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={{
                              pathname: `/customerUpdate/${customerId}`,
                              customerId: customer.email,
                            }}
                          >
                            {" "}
                            <Button
                              style={{
                                background: "#00ADEE",
                                textTransform: "none",
                                color: "#FFF",
                                fontFamily: "sans-serif",
                              }}
                            >
                              Edit
                            </Button>{" "}
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <div className="row" style={{ fontFamily: "sans-serif" }}>
                        <div className="col-4">
                          <b>
                            {" "}
                            <label className={style.l1}>Name</label>
                          </b>
                          <p
                            className={style.l1}
                            style={{ transform: "translateY(-0.5rem)" }}
                          >
                            {customer.firstName} {customer.lastName}
                          </p>
                        </div>
                        <div className="col-4" style={{ padding: "0.5rem 0" }}>
                          <b>
                            {" "}
                            <label className={style.l1}>Phone</label>
                          </b>
                          <p
                            className={style.l1}
                            style={{ transform: "translateY(-0.5rem)" }}
                          >
                            {customer.phone}
                          </p>
                        </div>
                        <div className="col-4" style={{ padding: "0.5rem 0" }}>
                          <b>
                            {" "}
                            <label>Email</label>
                          </b>
                          <p
                            style={{
                              transform: "translate3d(0rem, -0.5rem,0)",
                            }}
                          >
                            {customer.email}
                          </p>
                        </div>
                      </div>

                      {customer.subContacts.length !== 0 ? (
                        <div>
                          <h4>Alternate Contact</h4>

                          <div>
                            <div className="accordion" id="accordionExample">
                              {customer.subContacts.map((x, i) => (
                                <div key={i} className={`card`}>
                                  <div className="card-header" id="headingOne">
                                    {/* <h5
                                      className="mb-0"
                                      // style={{ background: "white" }}
                                    > </h5> */}
                                      <div
                                       
                                        className={`btn-link`}
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={`#collapse${i}`}
                                        aria-expanded="true"
                                        aria-controls="collapse"
                                      >
                                        {`Contact # ${i + 1}`}
                                      </div>
                                   
                                  </div>
                                  <div
                                    id={`collapse${i}`}
                                    className="collapse show"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                  >
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-3">
                                          {x.length !== 0 && (
                                            <h6 className={style.l1}>Name</h6>
                                          )}
                                          <label className={style.l1}>
                                            {x.name !== "" ? x.name : "N/A"}
                                          </label>
                                        </div>
                                        <div className="col-3">
                                          {x.length !== 0 && (
                                            <h6 className={style.l1}>Email</h6>
                                          )}
                                          <label className={style.l1}>
                                            {x.email !== "" ? x.email : "N/A"}
                                          </label>
                                        </div>
                                        <div className="col-3">
                                          {x.length !== 0 && (
                                            <h6 className={style.l1}>Phone</h6>
                                          )}
                                          <label className={style.l2}>
                                            {x.phone !== "" ? x.phone : "N/A"}
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {customer.jobs && customer.jobs.length > 0 ? (
                        <div>
                          <h3 className={`${style.job}`}>Jobs</h3>
                          {customer ?.jobs ?.map((job, i) => {
                            return (
                              <div key={i} className={style.jumbotron} style={{ padding: "1rem 0" }}>
                                <div
                                  className="row"
                                  key={i}
                                  style={{ paddingLeft: "1rem" }}
                                >
                                  <div className="col-7">
                                    <Link
                                      style={{ textDecoration: "none" }}
                                      to={{
                                        pathname: "/job/details/" + job._id,
                                      }}
                                    >
                                      <h5>{job.title}</h5>
                                    </Link>

                                  </div>
                                  <div className="col-3">
                                    {job.assignee.length > 0 ? (
                                      <div style={{ display: "flex" }}>
                                        {job.assignee.map((assignee, i) =>
                                          i === 0 ? (
                                            <p>{assignee.name}</p>
                                          ) : (
                                              <p>
                                                <span
                                                  style={{ padding: "0.5rem" }}
                                                >
                                                  |
                                              </span>
                                                {assignee.name}
                                              </p>
                                            )
                                        )}
                                      </div>
                                    ) : (
                                        <p>No Assignee</p>
                                      )}
                                  </div>
                                  <div className="col-2">
                                    <span>
                                      <Chip
                                        variant="outlined"
                                        size="small"
                                        label={job.status}
                                        clickable
                                        color="primary"
                                      />
                                    </span>
                                  </div>
                                </div>

                                {job.dates.map((x, i) =>
                                  i === 0 ? (
                                    <label key={i} style={{ paddingLeft: "1rem" }}>{x}</label>
                                  ) : (
                                      <label style={{ paddingLeft: "1rem" }}>
                                        <span style={{ padding: "0.5rem" }}>
                                          |
                                          </span>
                                        {x}
                                      </label>
                                    )
                                )}
                                <div>
                                  {job.services.map((service, i) => (
                                    <label
                                      key={i}
                                      style={{
                                        display: "inline",
                                        paddingLeft: "1rem"
                                      }}
                                    >
                                      <Chip
                                        variant="outlined"
                                        size="small"
                                        label={service.name}
                                        clickable
                                        color="primary"
                                      />
                                    </label>
                                  ))}
                                </div>
                                <div className="col-12" style={{ paddingLeft: "1rem" }}>
                                  <p style={{ whiteSpace: "pre-line" }}>
                                    {parse(job.description)}
                                  </p>
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
                                    })} */}

                                {job.locations && (
                                  <div style={{ display: "flex", paddingLeft: "1rem" }} className="row">
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
                                  {/* <p className={style.notesd} > */}
                                  {job.note.length > 0 && (
                                    <h4 className={style.notesh}>Notes</h4>
                                  )}
                                  {job.note.map((note, i) => (
                                    <div key={i} className={`row`}>
                                      <p
                                        style={{
                                          transform: "translateX(1.5rem)",
                                        }}
                                      >
                                        {" "}
                                        {note.text}
                                      </p>
                                    </div>
                                  ))}
                                  {/* </p> */}
                                  {/* Add modal */}
                                  {/* <Button onClick={handleShow} bsClass = "style-button" style= {{margin:" 2rem"}}>
             
                  Add Note
             
           
                </Button> */}

                                  {/* <Modal
                                      show={show}
                                      onHide={handleClose}
                                      animation={false}
                                      centered
                                    >
                                      <Modal.Header closeButton>
                                        <Modal.Title>Add Note</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>
                                        <textarea
                                          name=""
                                          id=""
                                          cols="65"
                                          rows="5"
                                          name="note"
                                          value={note}
                                          onChange={handleAddNote}
                                        ></textarea>
                                      </Modal.Body>
                                      <Modal.Footer>
                                        <Button
                                          variant="secondary"
                                          onClick={handleClose}
                                        >
                                          Close
                                        </Button>
                                        <Button
                                          variant="primary"
                                          onClick={AddNote}
                                        >
                                          Add Note
                                        </Button>
                                      </Modal.Footer>
                                    </Modal> */}
                                </div>
                              </div>

                            );
                          })}
                        </div>
                      ) : (
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "2rem 0",
                            }}
                          >
                            No job added yet
                        </h4>
                        )}
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="row">
                      <div className="col-6">
                        <h3 className={style.head}>Claims</h3>
                      </div>
                      <div className="col-6">
                        <div
                          className={style.btn}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={{
                              pathname: "/claim/newclaim",
                              customerId: customer.email,
                              customerName: customer.firstName + ' ' + customer.lastName,
                              jobs: customer.jobs
                            }}



                          >
                            {" "}
                            <Button
                              style={{
                                background: "#00ADEE",
                                textTransform: "none",
                                color: "#FFF",
                                fontFamily: "sans-serif",
                              }}
                            >
                              New Claim
                            </Button>{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {customer ?.claim.length > 0 && (
                      <div
                        className="row"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          margin: "1rem 0",
                        }}
                      >
                        <div className="col-4">JobId</div>
                        <div
                          className="col-4"
                          style={{ transform: "translateX(-1rem)" }}
                        >
                          Status
                        </div>
                        <div
                          className="col-4"
                          style={{ transform: "translateX(-1.5rem)" }}
                        >
                          {" "}
                          Last Update
                        </div>
                      </div>
                    )}
                    <div id="accordion">
                      {customer ?.claim.length > 0 ? (
                        customer.claim.map((claim, i) => {
                          return (
                            <div
                              key={i}
                              style={{
                                // cursor: "pointer",
                                fontFamily:
                                  "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                              }}
                            >
                              <div
                                className={`card-header row ${style.cardHeader}`}
                                aria-expanded="true"
                                data-toggle="collapse"
                                data-target={`#collapse${i}`}
                                style={{
                                  height: "4rem",
                                  overflow: "hidden",
                                  width: "100%",
                                  cursor: "pointer",
                                  fontFamily:
                                    "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                                }}
                                aria-controls="collapse"
                                id="headingOne"
                              >
                                <div className="col-4">{claim.job.jobId}</div>

                                <div className="col-4">{claim.status}</div>
                                <div className="col-4">
                                  {/* {claim ?.updatedAt.toDateString()} */}
                                  {/* {claim ?.updatedAt.split("T")[0]}{" "}
                                  <span>|</span>{" "}
                                  {claim ?.updatedAt.split("T")[1].split(".")[0]} */}
                                  <TimeAgo date={claim ?.updatedAt} />
                                </div>
                              </div>

                              <div
                                id={`collapse${i}`}
                                class="collapse "
                                aria-labelledby="headingOne"
                                data-parent="#accordion"
                              >
                                <div className={`card-body`}>
                                  <div>
                                    {/* {claim.claims.map((y, j) => {
                                      return ( */}
                                    <div key={i}>
                                      <div className="row">
                                        <div
                                          className={`col-6 ${style.protectionRow}`}
                                        >
                                          <h6>Protection Type : </h6>
                                          <h6 style={{ fontWeight: "normal" }}>
                                            {claim.claimType}
                                          </h6>
                                        </div>
                                        <div
                                          className={`col-2 ${style.protectionRow}`}
                                        >
                                          <h6>Total: $</h6>
                                          <h6
                                            style={{ fontWeight: "normal" }}
                                          >{`${claim.price}`}</h6>
                                        </div>
                                        <div className="col-2">
                                          {claim.status == "open" ? (
                                            <Button
                                              className="btn btn-primary"
                                              style={{
                                                background: "#00ADEE",
                                                textTransform: "none",
                                                color: "#FFF",
                                                fontFamily: "sans-serif",
                                                transform: "translateX(4.5rem)",
                                              }}
                                              onClick={() => addNewClaim(i)}
                                            >
                                              Add Update
                                            </Button>
                                          ) : null}
                                        </div>
                                        <div className="col-2">
                                          {claim.status == "open" ? (
                                            <Button
                                              style={{
                                                background: "#00ADEE",
                                                textTransform: "none",
                                                color: "#FFF",
                                                fontFamily: "sans-serif",
                                              }}
                                              onClick={() => handleCloseJob(i)}
                                            >
                                              {" "}
                                              Close Claim
                                            </Button>
                                          ) : (
                                              <Chip
                                                variant="outlined"
                                                size="small"
                                                label="Closed"
                                                clickable
                                                color="primary"
                                              />
                                            )}
                                        </div>
                                      </div>
                                      <hr />
                                    </div>

                                    <div className="row">
                                      <div className={`col-12`}>
                                        <h6
                                          className={`${style.para} ${style.styleClaims}`}
                                        >
                                          Title :
                                          <span
                                            style={{ fontWeight: "normal" }}
                                          >
                                            {claim.title}
                                          </span>
                                        </h6>
                                      </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                      <div className={`col-12`}>
                                        <h6
                                          className={`${style.para} ${style.styleClaims}`}
                                          style={{ whiteSpace: "pre-line" }}
                                        >
                                          Description :{" "}
                                          <span
                                            style={{ fontWeight: "normal" }}
                                          >
                                            {" "}
                                            {claim.description}
                                          </span>
                                        </h6>
                                      </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                      <div className={`col-12`} >
                                        <h6
                                          className={`${style.styleClaims}`}
                                        >
                                          Waiting To :{" "}

                                          <span style={{ fontWeight: "normal" }}> {claim.waitTo}</span>
                                        </h6>
                                      </div>
                                      {/* <div
                                        className="col-6"
                                        onDoubleClick={(e) => { 
                                          e.stopPropagation()
                                          editInput(e,i)
                                        }}
                                      >
                                        <span style={{ fontWeight: "normal" }}>
                                          <TextField
                                            variant="outlined"
                                            // margin="normal"
                                            required
                                            fullWidth
                                            size="small"
                                            name="claimInput"
                                            value={claim.waitTo}
                                            onChange={(e) =>{ e.stopPropagation()
                                              handleClaimInput(e,i,claim)
                                            }
                                            }
                                            disabled={waitTo}
                                            style={{ fontWeight: "normal" }}
                                          >
                                            {" "}
                                          </TextField>
                                        </span>
                                      </div>
                                      <div className="col-3">
                                        {waitTo === false && (
                                          <Button
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              disableInput(e,claim,i)
                                            }}
                                            style={{
                                              background: "#00ADEE",
                                              textTransform: "none",
                                              color: "#FFF",
                                              fontFamily: "sans-serif",
                                            }}
                                          >
                                            Save
                                          </Button>
                                        )}
                                      </div> */}
                                    </div>

                                    <hr />

                                    <div>
                                      <div>
                                        {claim.updates.length > 0 ? (
                                          <div>
                                            <h4>Updates</h4>
                                            {claim.updates.map((x, i) => (
                                              <div>
                                                <div className="row">
                                                  <div
                                                    className="col-12"
                                                    style={{ display: "flex" }}
                                                  >
                                                    {" "}
                                                    {`${i + 1}.`}{" "}
                                                    <div
                                                      style={{
                                                        margin: "0 0.5rem",
                                                      }}
                                                    >
                                                      {x.value}
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-10"></div>
                                                  <div
                                                    className="col-2"
                                                    style={{ color: "#a8a8a8" }}
                                                  >
                                                    {" "}
                                                    <TimeAgo
                                                      date={x.timestamp}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                          <div className="text-center">
                            <img src="/images/no-data-found.png" />
                          </div>
                        )}

                      {/* <Modal
                        dialogClassName={style.modal}
                        show={show}
                        onHide={handleClose}
                        animation={false}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Add Update</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <textarea
                            name=""
                            id=""
                            cols="65"
                            rows="5"
                            name="Note"
                            value={update}
                            onChange={handleAddUpdate}
                          ></textarea>
                        </Modal.Body>
                        <Modal.Footer>
                          <button
                            className="btn btn-primary"
                            onClick={handleClose}
                          >
                            Close
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={updateClaimData}
                          >
                            {" "}
                            Add
                          </button>
                        </Modal.Footer>
                      </Modal> */}
                    </div>
                  </TabPanel>
                  <TabPanel
                    value={value}
                    index={2}
                    style={{ border: "transparent" }}
                  >
                    <div className="row">
                      <div className="col-6">
                        <h3 className={style.head}>Blanket Deposit</h3>
                      </div>
                      <div className="col-6">
                        <div
                          className={style.btn}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                          }}
                        >
                          <Link
                            style={{ textDecoration: "none" }}
                            to={{
                              pathname: "/claim/customerdeposit/deposit",
                              customerId: customer.email,
                              customerName: customer.firstName + ' ' + customer.lastName,
                              jobs: customer.jobs
                            }}
                          >
                            {" "}
                            <Button
                              style={{
                                background: "#00ADEE",
                                textTransform: "none",

                                color: "#FFF",
                                fontFamily: "sans-serif",
                              }}
                            >
                              Deposit
                            </Button>{" "}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <hr />
                    {blanketValue && blanketValue.length > 0 ? (
                      <BlanketList
                        blanketValue={blanketValue}
                        updateBlanket={updateBlanket}
                      />
                    ) : (
                        <div className="text-center">
                          <img src="/images/no-data-found.png" />
                        </div>
                      )}
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      )}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={style.modal}
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            name=""
            id=""
            cols="65"
            rows="5"
            name="Note"
            value={update}
            onChange={handleAddUpdate}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
              margin: "0 0.4rem",
            }}
          >
            Close
          </Button>
          <Button
            type="button"
            onClick={updateClaimData}
            style={{
              background: "#00ADEE",
              textTransform: "none",
              color: "#FFF",
              fontFamily: "sans-serif",
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  customer: state.customers?.customer,
  user: state.users.user,
});

var actions = {
  getCustomer,
  showMessage,
};
export default connect(mapStateToProps, actions)(CustomerDetail);
