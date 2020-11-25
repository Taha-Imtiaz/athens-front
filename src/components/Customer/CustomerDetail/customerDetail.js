import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
// import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal, Alert } from "react-bootstrap";
import Button from '@material-ui/core/Button';

import Chip from "@material-ui/core/Chip";
import MyLocationOutlinedIcon from "@material-ui/icons/MyLocationOutlined";
import LocationOffIcon from "@material-ui/icons/LocationOff";
import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import { updateClaim, updateDeposit } from "../../../Redux/Claims/claimsActions";

import { cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const handleClose = () => setShow(false);

  const [blankets, setBlankets] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(0);
  const handleShow = () => setShow(true);
  var [note, setNote] = useState("");
  var [addClaim, setAddClaim] = useState(false)
  var [edit, setEdit] = useState(false)
  var [blanketValue, setBlanketValue] = useState("")

  var { customer, getCustomer } = props;
  var {
    match: {
      params: { customerId },
    },
  } = props;

  var data = []
  if (customer ?.claim) {
    // setBlanketValue(customer.blanketDeposit.cost)
    data = customer.claim
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
  ;
  useEffect(() => {
    getCustomer(customerId);
  }, []);


  useEffect(() => {
    setBlanketValue(customer ?.blanketDeposit)
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
    setShow(true)
    setAddClaim(true);
    setUpdateIndex(i);
  }


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
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
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
    customer.blanketDeposit.quantity = customer.blanketDeposit.quantity - 1
  };

  const increment = (x, i) => {
    // let newData = cloneDeep(blankets);
    // newData[i].quantity = ++x.quantity;
    // setBlankets(newData);
    customer.blanketDeposit.quantity = customer.blanketDeposit.quantity + 1
  };

  const closeEdit = (type) => {
    // let newData = cloneDeep(blankets);
    // newData.edit = !newData.edit;
    // setBlankets(newData);
    // Call Api
    var { user } = props;
    var obj = {
      id: blanketValue._id,
      userId: user._id,
      quantity: blanketValue.quantity,
      cost: blanketValue.cost,
    };
    updateDeposit(obj)
      .then((res) => {
        var { showMessage } = props;
        setEdit(false)
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
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  // var { children, value, index, ...other } = props;

  
   
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-1">
              {/* <SideBar routes={routes} key={customerId} /> */}
            </div>
            <div className="col-8" style={{ margin: "1rem" }}>
              <div className="row">
                <div className="col-12">
                  <AppBar position="static">
                    <Tabs style= {{background:"#00ADEE", border:"none"}} 
                    
                      onChange={handleChange}

                      value={value}
                      aria-label="simple tabs example"

                    >
                      <Tab
                        label="Customer Information"
                        className={`col-4 `}/>
                      <Tab label="Claims"  className="col-4"/>
                      <Tab    label="Blanket"
                        className="col-4"  />
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                      <h3>Customer Information</h3>
                      <hr />
                      <div className="row" style={{fontFamily:"sans-serif"}}>
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
                            <label className={style.l1}>Email</label>
                          </b>
                          <p
                            style={{
                              transform: "translate3d(0.5rem, -0.5rem,0)",
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
                                    <h5 className="mb-0">
                                      <button
                                        className="btn btn-link"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                      >
                                        {`Contact # ${i + 1}`}
                                      </button>
                                    </h5>
                                  </div>
                                  <div
                                    id="collapseOne"
                                    className="collapse show"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordionExample"
                                  >
                                    <div className="card-body">
                                      <div className="row">
                                        <div className="col-3">
                                          {x.length !== 0 && (
                                            <h6 className={style.l1}>Email</h6>
                                          )}
                                          <label className={style.l1}>
                                            {x.email}
                                          </label>
                                        </div>
                                        <div className="col-3">
                                          {x.length !== 0 && (
                                            <h6 className={style.l1}>Phone</h6>
                                          )}
                                          <label className={style.l2}>
                                            {x.phone}
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
                              <div key={i} className={style.jumbotron}>
                                <div
                                  className="row"
                                  key={i}
                                  style={{ padding: "2rem" }}
                                >
                                  {/* <div className="collapse multi-collapse col-6" id="multiCollapseExample1"> */}

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
                                        <label key={i}
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
                                    {/* <label style={{ transform: "translateY(-1rem)" }}>
                          {" "}
                          {job.startTime}
                        </label> */}
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
                                    <p style ={{whiteSpace: "pre"}}>{job.description}</p>
                                  </div>

                                  {job.locations.map((list, i) => (
                                    <div className="col-12" key={i}>
                                      <span >
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
                                  ))}

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
                    {customer ?.claim.length > 0 && <div className="row" style={{ fontWeight: "bold",fontFamily:"sans-serif" }}>
                      <div className="col-4" style={{ transform: "translateX(1.5rem)" }}>JobId</div>
                      <div className="col-4" style={{ transform: "translateX(1.5rem)" }}>Status</div>
                      <div className="col-4" style={{ transform: "translateX(1.5rem)" }}> Last Update</div>
                    </div>}
                    <div id="accordion">
                      {customer ?.claim.length > 0 ? (
                        customer.claim.map((claim, i) => {
                          return <div key={i} className="card" style={{ cursor: "pointer", fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
                            <div
                              style={{
                                height: "4rem",
                                overflow: "hidden",
                                width: "100%",
                              }}
                              className="card-header"
                              id="headingOne"
                              onClick={() => toggleCollapse(claim._id)}
                            >
                              <h5 className="mb-0">
                                <button
                                  // className="btn btn-link"
                                  data-toggle="collapse"
                                  data-target="#collapse"
                                  aria-expanded="true"
                                  aria-controls="#collapse"
                                  style={{
                                    border: "none",
                                    outline: "none",
                                    background: "transparent",
                                  }}
                                >
                                  <div>{claim.job.jobId}</div>
                                </button>
                              </h5>

                              {/* <div className="col-3">
                          <h6
                            style={{
                              transform: "translate3d(13rem, -1.8rem, 0)",
                            }}
                          >
                            {x.description} 
                          </h6>
                        </div> */}
                              <div
                                className="col-4"
                                style={{
                                  transform: "translate3d(17rem, -1.5rem, 0)",
                                }}
                              >
                                {claim.status}
                              </div>
                              <div
                                className="col-"
                                style={{
                                  transform: "translate3d(35rem, -3rem, 0)",
                                }}>
                                    {/* {claim ?.updatedAt.toDateString()} */}
                                {claim ?.updatedAt.split("T")[0]} <span>|</span> {claim ?.updatedAt.split("T")[1].split(".")[0]}
                              </div>
                            </div>

                            <div
                              id="#collapse"
                              className={
                                showIndex == claim._id
                                  ? "show"
                                  : "collapse"
                              }
                              aria-labelledby="headingOne"
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                <div>
                                  {/* //key={x._id} */}
                                  <div className="row justify-content-between"></div>

                                  {/* <div className="row">
                      <div className="col-10">
                          <p className={style.comp}>from {x.from} - to {x.to}</p>
                      </div>
                  </div> */}
                                  {claim.claims.map((y, j) => {
                                    return (
                                      <div key={j}>
                                        <h6>Claim Type : {y.claimType}</h6>
                                        <div className="row">
                                          <div className="col-11">
                                            <p className={style.para}>
                                              Description : {y.description}
                                            </p>
                                          </div>
                                          <div className="col-1">
                                            <p>${y.price}</p>
                                          </div>


                                        </div>
                                        <hr/>
                                      </div>
                                    );
                                  })}
                                 
                                  {claim.claims.length > 0 ? (
                                    <div className="row">
                                      <div className="col-10">
                                        {/* <Button name="Add Update" onClick={() => handleShow(i)}></Button> */}
                                      </div>
                                      <div className="col-2">
                                        <p>
                                          {" "}
                                          Total: $
                                      {claim.claims.reduce(function (
                                            a,
                                            b
                                          ) {
                                            return a + b["price"];
                                          },
                                            0)}
                                        </p>
                                      </div>
                                    </div>
                                  ) : null}
                                  <hr />
                                  <div className="row">
                                    <div className="col-10">
                                      {claim.updates.length > 0 ? (
                                        <div>
                                          <h3>Updates</h3>
                                          {claim.updates.map((x, i) => (
                                            <div key={i} className="row">
                                              <div className="col-8">
                                                <li> {x.value}</li>
                                              </div>
                                              <div className="col-4">
                                                <li>
                                                  {" "}
                                                  {x.timestamp.split("T")[0]}
                                                </li>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      ) : null}
                                    </div>
                                    <div className="col-6"></div>
                                    <div className="col-6">

                                      <div style={{ float: "right" }}>
                                        {claim.status == "open" ? (
                                          <Button
                                          style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}
                                            onClick={() => handleCloseJob(i)}
                                          > Close Claim</Button>
                                        ) : null}
                                      </div>
                                      <div

                                        style={{ float: "right", margin: " 0 0.2rem" }}
                                      >
                                        {claim.status == "open" ? (
                                          <Button className="btn btn-primary"
                                          style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}

                                            onClick={() => addNewClaim(i)}
                                          >Add Update</Button>
                                        ) : null}
                                      </div>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        })
                      ) : <div className="text-center">
                          <img src='/images/no-data-found.png' />
                        </div>}
                      <Modal show={show} onHide={handleClose} animation={false} centered>
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
                          <button className="btn btn-primary" onClick={handleClose}>Close</button>
                          <button className="btn btn-primary" onClick={updateClaimData}> Add</button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </TabPanel>

                  <TabPanel
                    value={value}
                    index={2}
                    style={{ border: "transparent" }}
                  >
                    {blanketValue ? (
                      <div>
                        <div className={`row`} style={{fontFamily:"sans-serif"}}>
                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Customer</h6>
                          </div>
                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Quantity</h6>
                          </div>
                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Deposit</h6>
                          </div>
                          <div
                            className={`col-3`}
                            style={{ fontWeight: "bold" }}
                          >
                            <h6>Actions</h6>
                          </div>
                        </div>

                        <div className={style.jumbotron} style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                          <ul
                            className="list-group"

                          >

                            <li className="checkbox list-group-item">
                              {/* key={i} */}
                              <div className="row">
                                <div className="col-3">
                                  <label>
                                    {customer ?.firstName} {customer ?.lastName}
                                  </label>
                                </div>

                                <div className="col-3">
                                  <div className="input-group">
                                    {edit ? (
                                      <span className="input-group-btn">
                                        <button
                                          type="button"
                                          className="btn btn-default btn-number"
                                          onClick={() => {
                                            let data = cloneDeep(blanketValue)
                                            data.quantity = data.quantity - 1;
                                            data.cost = data.quantity * 15;
                                            setBlanketValue(data);
                                            customer.blanketDeposit.quantity = customer.blanketDeposit.quantity - 1
                                          }
                                          }
                                        >
                                          <span
                                            className="fa fa-minus"
                                            style={{
                                              transform: "translateY(-0.25rem)",
                                            }}
                                          ></span>
                                        </button>
                                      </span>
                                    ) : null}
                                    <input
                                      disabled={!edit}
                                      type="text"
                                      className="form-control input-number"
                                      value={blanketValue.quantity}
                                      style={{ margin: "-0.25rem 0" }}
                                      min="1"
                                    ></input>
                                    {edit ? (
                                      <span className="input-group-btn">
                                        <button
                                          type="button"
                                          className="btn btn-default btn-number"
                                          onClick={() => {
                                            let data = cloneDeep(blanketValue)
                                            data.quantity = data.quantity + 1;
                                            data.cost = data.quantity * 15;
                                            setBlanketValue(data);
                                            customer.blanketDeposit.quantity = customer.blanketDeposit.quantity + 1
                                          }
                                          }
                                        >
                                          <span
                                            className="fa fa-plus"
                                            style={{
                                              transform: "translateY(-0.25rem)",
                                            }}
                                          ></span>
                                        </button>
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-3">
                                  <label>
                                    {blanketValue.quantity * 15}$
                                  </label>
                                </div>
                                <div className="col-2">
                                  {!edit ? (
                                    <label
                                      className="fa fa-edit"
                                      onClick={() => setEdit(true)}
                                    >
                                      {" "}
                                      Edit
                                    </label>
                                  ) : (
                                      <label
                                        className="fa fa-save"
                                        onClick={() => closeEdit("save")}
                                      >
                                        {" "}
                                        Save
                                    </label>
                                    )}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className={`row ${style.flex}`} style={{ margin: "2rem 0" }}>
                          <Button
                            // className="btn btn-primary"
                            onClick={handleShow}
                            style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}
                          >
                            Activities
                  </Button>
                        </div>
                        <Modal dialogClassName={`${style.modal}`}
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

                            <div className="row" style={{ fontWeight: "bold" , fontFamily: "sans-serif"}}>
                              <div className={`col-2`}>Performer</div>
                              <div className={`col-6`}>Message</div>
                              <div className={`col-4`}>Timestamp</div>
                            </div>

                            {blanketValue && blanketValue.activities.map((activity, i) => <div key={i} className="row" style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                              <div className={`col-2 `}> <p>{activity.performer.name}</p></div>
                              <div className={`col-6`}>
                                {activity.messageLogs.map((x, i) => <p key={i}>* {x}</p>)}
                              </div>
                              <div className={`col-4 `}><p>  {activity.timeStamp.split("G")[0]}</p></div>
                            </div>)}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}} onClick={handleClose}>
                              Close
                            </Button>
                            {/* <Button variant="primary">Add Activity</Button> */}
                          </Modal.Footer>
                        </Modal>
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

            <div className="col-2" style={{ transform: "translateY(1rem)" }}>
              <div>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/job/create",
                    customerId: customer.email,
                  }}
                >
                  {" "}
                  <Button
                    className="btn btn-primary"
                    style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}
                  >
                    Create Job
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <br />
        </div>
      )
      }
      {/* //  : (
      //    <Redirect to="/customer"/>
      //  )} */}
    </div >
  );
};
var mapStateToProps = (state) => ({
  customer: state.customers.data ? state.customers.data.customer : null,
  user: state.users.user
});

var actions = {
  getCustomer,
  showMessage
};
export default connect(mapStateToProps, actions)(CustomerDetail);
