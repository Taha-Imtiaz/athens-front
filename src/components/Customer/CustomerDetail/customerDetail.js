import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal, Alert } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import MyLocationOutlinedIcon from "@material-ui/icons/MyLocationOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import {
  updateClaim,
  updateDeposit,
} from "../../../Redux/Claims/claimsActions";
import Badge from "@material-ui/core/Badge";
import TimeAgo from "react-timeago";

import { cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const handleClose = () => setShow(false);

  const [blankets, setBlankets] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(0);
  // var [claimCount, setClaimCount] = useState(0)
  const handleShow = (deposit) => {
    setDepositValue(deposit);
    setShow(true);
  };
  var [note, setNote] = useState("");
  var [addClaim, setAddClaim] = useState(false);
  var [edit, setEdit] = useState(false);
  var [depositToEdit, setDepositToEdit] = useState(null);
  var [blanketValue, setBlanketValue] = useState([]);
  var [depositValue, setDepositValue] = useState("");

  var { customer, getCustomer } = props;
  var [claimCount, setClaimCount] = useState(0);
  // var [blanketCount, setBlanketCount] = useState(0);
  var {
    match: {
      params: { customerId },
    },
  } = props;

  var data = [];
  if (customer?.claim) {
    // setBlanketValue(customer.blanketDeposit.cost)
    data = customer.claim;
  }

  const updateClaimData = () => {
    let ob = {
      timestamp: new Date(),
      value: update,
    };
    let newData = cloneDeep(data);
    newData[updateIndex].updates.push(ob);
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
      console.log(customer);
    }

    getCustomer(customerId);
    console.log(customer);
  }, []);

  useEffect(() => {
    //calculate blanket and claims Count
    var customerClaims = customer?.claim;
    var customerBlanket = customer?.blanketDeposit;

    console.log(customerClaims);
    console.log(claimCount);
    if (customerClaims?.length > 0) {
      let count = customerClaims?.map(
        (claim) =>
          claim.status === "open" && setClaimCount((count) => count + 1)
      );
    } else {
      setClaimCount(0);
    }

    // var blanketsCount = customerBlanket?.map((blanket) => setBlanketCount((count) => count + 1 ))
    setBlanketValue(customer?.blanketDeposit);
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
  var AddNote = () => {};

  var [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const addNewClaim = (i) => {
    setShow(true);
    setAddClaim(true);
    setUpdateIndex(i);
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

  const closeEdit = (type) => {
    // let newData = cloneDeep(blankets);
    // newData.edit = !newData.edit;
    // setBlankets(newData);
    // Call Api
    var { user } = props;
    var obj = {
      id: depositValue._id,
      userId: user._id,
      quantity: depositValue.quantity,
      cost: depositValue.cost,
    };
    updateDeposit(obj)
      .then((res) => {
        var { showMessage } = props;
        setEdit(false);
        showMessage(res.data.message);
      })
      .catch((err) => console.log(err));
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
  // var { children, value, index, ...other } = props;

  const editDeposit = (i) => {
    setDepositToEdit(i);
    setEdit(true);
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
                          // label={`Blanket: ${customer ?.blanketDeposit.reduce(
                          //   (sum, currentValue) =>
                          //     sum + parseInt(currentValue.quantity),
                          //   0
                          // )}`}
                          label={
                            <Badge
                              badgeContent={customer?.blanketDeposit.reduce(
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
                        <div className="col-6">
                          <h3 className={style.head}>Customer Information</h3>
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
                                pathname: "/job/create",
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
                                Create Job
                              </Button>{" "}
                            </Link>
                          </div>
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
                                    <h5
                                      className="mb-0"
                                      style={{ background: "white" }}
                                    >
                                      <div
                                        style={{
                                          outline: "none",
                                          background: "white",
                                        }}
                                        className={`btn-link ${style.button}`}
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={`#collapse${i}`}
                                        aria-expanded="true"
                                        aria-controls="collapse"
                                      >
                                        {`Contact # ${i + 1}`}
                                      </div>
                                    </h5>
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

                          {customer?.jobs?.map((job, i) => {
                            return (
                              <div key={i} className={style.jumbotron}>
                                <div
                                  className="row"
                                  key={i}
                                  style={{ padding: "2rem" }}
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
                                    {job.dates.map((x, i) =>
                                      i === 0 ? (
                                        <label key={i}>{x}</label>
                                      ) : (
                                        <label>
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
                                            padding: "0 0.2rem",
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

                                  <div className="col-12">
                                    <p style={{ whiteSpace: "pre-line" }}>
                                      {job.description}
                                    </p>
                                  </div>
                                  {job.locations && (
                                    <div>
                                      <MyLocationOutlinedIcon
                                        color="primary"
                                        style={{ marginRight: "0.4rem" }}
                                      />{" "}
                                      {job.locations.from} <br></br>
                                      {job.locations.to.map((list) => (
                                        <p
                                          // className={style.para}
                                          style={{
                                            fontFamily:
                                              "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                                            margin: "0",
                                          }}
                                        >
                                          <LocationOffIcon color="primary" />{" "}
                                          {list}
                                        </p>
                                      ))}
                                    </div>
                                  )}
                                  {/* {job.locations.map((list, i) => (
                                    <div className="col-12" key={i}>
                                      <span>
                                        {" "}
                                        <label>
                                          {" "}
                                          <MyLocationOutlinedIcon
                                            color="primary"
                                            style={{ margin: "0 0.5rem" }}
                                          />{" "}
                                          {list.from}{" "}
                                        </label>
                                        <div>
                                          {" "}
                                          <b>
                                            {" "}
                                            <LocationOffIcon
                                              color="primary"
                                              style={{ margin: "0 0.5rem" }}
                                            />
                                          </b>{" "}
                                          {list.to}
                                        </div>
                                        <hr />
                                      </span>
                                    </div>
                                  ))} */}

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

                                    <Modal
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
                                    </Modal>
                                  </div>
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
                            to="/claim/newclaim"
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
                    {customer?.claim.length > 0 && (
                      <div
                        className="row"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          margin: "1rem 0",
                        }}
                      >
                        <div className="col-4">JobId</div>
                        <div className="col-4">Status</div>
                        <div className="col-4"> Last Update</div>
                      </div>
                    )}
                    <div id="accordion">
                      {customer?.claim.length > 0 ? (
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
                                  <TimeAgo date={claim?.updatedAt} />
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
                                        <div className={`col-6 ${style.protectionRow}`} >
                                          <h6>Protection Type : </h6>
                                          <span>{claim.claimType}</span>
                                        </div>
                                        <div className={`col-2 ${style.protectionRow}`}>
                                          <h6>Total: $</h6>
                                          <span>{`${claim.price}`}</span>
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
                                        <p className={`${style.para} ${style.styleClaims}`}>
                                       <h6>Title :</h6>    {claim.title}
                                        </p>
                                      </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                      <div className={`col-12`}>
                                        <p
                                          className={`${style.para} ${style.styleClaims}`}
                                          style={{ whiteSpace: "pre-line" }}
                                        >
                                       <h6> Description :</h6>   {claim.description}
                                        </p>
                                      </div>
                                    </div>
                                    <hr />

                                    <div className="row">
                                      <div className={`col-12`}>
                                        <p className={`${style.para} ${style.styleClaims}`}>
                                         <h6> Waiting To :</h6> {claim.waitTo}
                                        </p>
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                  <div className="row">
                                    {/* );
                                    })} */}

                                    {/* {claim.length > 0 ? (
                                      <div className="row">
                                        <div className="col-10">
                                         
                                        </div>
                                        <div className="col-2">
                                          <p>
                                            {" "}
                                            Total: $
                                            {claim.reduce(function (
                                              a,
                                              b
                                            ) {
                                              return a + b["price"];
                                            },
                                            0)}
                                          </p>
                                        </div>
                                      </div>
                                    ) : null} */}
                                    <hr />
                                    <div className="row">
                                      <div className="col-12">
                                        {claim.updates.length > 0 ? (
                                          <div>
                                            <h3>Updates</h3>
                                            {claim.updates.map((x, i) => (
                                              <div >
                                                <div key={i} className="row">
                                                  <div className="col-12">
                                                    <li
                                                      style={{
                                                        listStyle: "none",
                                                      }}
                                                    >
                                                      {" "}
                                                      {`${i + 1}.${x.value}`}
                                                    </li>
                                                  </div>
                                                </div>
                                                <div className="row">
                                                  <div className="col-10"></div>
                                                  <div className="col-2">
                                                    <li
                                                      style={{
                                                        listStyle: "none",
                                                        color: "#a8a8a8",
                                                      }}
                                                    >
                                                      {" "}
                                                      <TimeAgo
                                                        date={x.timestamp}
                                                      />
                                                    </li>
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
                      <Modal
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
                      </Modal>
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
                            to="/claim/customerdeposit/deposit"
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
                      <div>
                        <div
                          className={`row`}
                          style={{ fontFamily: "sans-serif" }}
                        >
                          {/* <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Customer</h6>
                          </div> */}
                          <div
                            className={`col-2`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Job Id</h6>
                          </div>
                          <div
                            className={`col-2`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Quantity</h6>
                          </div>
                          <div
                            className={`col-2`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Deposit</h6>
                          </div>

                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Last Updated</h6>
                          </div>

                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Actions</h6>
                          </div>
                        </div>

                        <div
                          className={style.jumbotron}
                          style={{
                            fontFamily:
                              "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                          }}
                        >
                          <ul className="list-group">
                            {blanketValue.map((deposit, i) => {
                              return (
                                <li className="checkbox list-group-item">
                                  {/* key={i} */}
                                  <div className="row">
                                    {/* <div className="col-3">
                                    <label>
                                      {deposit.customer ?.firstName} {deposit.customer ?.lastName}
                                    </label>
                                  </div> */}
                                    <div className="col-2">
                                      <Link
                                        to={`/job/details/${deposit?.job._id}`}
                                      >
                                        {deposit?.job?.jobId}
                                      </Link>
                                    </div>
                                    <div className="col-2">
                                      <div className="input-group">
                                        {/* {edit && depositToEdit == i ? (
                                          <span className="input-group-btn">
                                            <button
                                              type="button"
                                              className="btn btn-default btn-number"
                                              onClick={() => {
                                                // let data = cloneDeep(blanketValue);
                                                deposit.quantity =
                                                  deposit.quantity - 1;
                                                deposit.cost =
                                                  deposit.quantity * 15;
                                                setDepositValue(deposit);
                                                customer.blanketDeposit.quantity =
                                                  customer.blanketDeposit
                                                    .quantity - 1;
                                              }}
                                            >
                                              <span
                                                className="fa fa-minus"
                                                style={{
                                                  transform:
                                                    "translateY(-0.25rem)",
                                                }}
                                              ></span>
                                            </button>
                                          </span>
                                        ) : null} */}
                                        <input
                                          disabled={!edit}
                                          type="text"
                                          className="form-control input-number"
                                          value={deposit.quantity}
                                          style={{ margin: "-0.25rem 0" }}
                                          min="1"
                                        ></input>
                                        {/* {edit && depositToEdit == i ? (
                                          <span className="input-group-btn">
                                            <button
                                              type="button"
                                              className="btn btn-default btn-number"
                                              onClick={() => {
                                                // let deposit = cloneDeep(blanketValue);
                                                deposit.quantity =
                                                  deposit.quantity + 1;
                                                deposit.cost =
                                                  deposit.quantity * 15;
                                                setDepositValue(deposit);
                                                customer.blanketDeposit.quantity =
                                                  customer.blanketDeposit
                                                    .quantity + 1;
                                              }}
                                            >
                                              <span
                                                className="fa fa-plus"
                                                style={{
                                                  transform:
                                                    "translateY(-0.25rem)",
                                                }}
                                              ></span>
                                            </button>
                                          </span>
                                        ) : null} */}
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <input
                                        disabled={!edit}
                                        type="text"
                                        className="form-control input-number"
                                        value={deposit.quantity * 15}
                                        style={{ margin: "-0.25rem 0" }}
                                        min="1"
                                      ></input>
                                    </div>
                                    <div className="col-3">
                                      {/* {deposit ?.updatedAt.split("T")[0]}{" "}
                                      <span> | </span>{" "}
                                      {
                                        deposit ?.updatedAt
                                          .split("T")[1]
                                          .split(".")[0]
                                      }{" "} */}
                                      <TimeAgo date={deposit?.updatedAt} />
                                    </div>
                                    <div className="col-3">
                                      {!edit || depositToEdit != i ? (
                                        <Button
                                          onClick={() => editDeposit(i)}
                                          style={{
                                            background: "#00ADEE",
                                            textTransform: "none",
                                            margin: "0 1rem",
                                            color: "#FFF",
                                            fontFamily: "sans-serif",
                                          }}
                                        >
                                          {" "}
                                          <i
                                            className="fa fa-edit"
                                            style={{ margin: "0.2rem" }}
                                          ></i>{" "}
                                          Edit{" "}
                                        </Button>
                                      ) : (
                                        // <label

                                        // >
                                        //   {" "}

                                        // </label>
                                        <Button
                                          onClick={() => closeEdit("save")}
                                          style={{
                                            background: "#00ADEE",
                                            textTransform: "none",
                                            margin: "0 1rem",
                                            color: "#FFF",
                                            fontFamily: "sans-serif",
                                          }}
                                        >
                                          {" "}
                                          <i
                                            className="fa fa-save"
                                            style={{ margin: "0.2rem" }}
                                          ></i>{" "}
                                          Save
                                        </Button>
                                      )}
                                      <Button
                                        onClick={() => handleShow(deposit)}
                                        style={{
                                          background: "#00ADEE",
                                          textTransform: "none",
                                          margin: "0 1rem",
                                          color: "#FFF",
                                          fontFamily: "sans-serif",
                                        }}
                                      >
                                        Activities
                                      </Button>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div
                          className={`row ${style.flex}`}
                          style={{ margin: "2rem 0" }}
                        ></div>
                        {/* <Modal
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

                            {depositValue &&
                              depositValue ?.activities.map((activity, i) => (
                                <div
                                  key={i}
                                  className="row"
                                  style={{
                                    fontFamily:
                                      "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
                                  }}
                                >
                                  <div className={`col-2 `}>
                                    {" "}
                                    <p>{activity.performer.name}</p>
                                  </div>
                                  <div className={`col-6`}>
                                    {activity.messageLogs.map((x, i) => (
                                      <p key={i}>* {x}</p>
                                    ))}
                                  </div>
                                  <div className={`col-4 `}>
                                    <p> {activity.timeStamp.split("G")[0]}</p>
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
                            <Button variant="primary">Add Activity</Button> 
                          </Modal.Footer>
                        </Modal> */}
                      </div>
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
    </div>
  );
};
var mapStateToProps = (state) => ({
  customer: state.customers.data ? state.customers.data.customer : null,
  user: state.users.user,
});

var actions = {
  getCustomer,
  showMessage,
};
export default connect(mapStateToProps, actions)(CustomerDetail);
