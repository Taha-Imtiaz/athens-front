import React, { useEffect, useState } from "react";
import style from "./CustomerDetails.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import parse from "html-react-parser";
import { AppBar, Box, Tab, Tabs, TextareaAutosize } from "@material-ui/core";
import { updateClaim } from "../../../Redux/Claim/claimActions";
import Badge from "@material-ui/core/Badge";
import TimeAgo from "react-timeago";
import { cloneDeep } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarTimes, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import Blankets from "../../../components/Blankets/Blankets";

const CustomerDetails = (props) => {
  let { customer, getCustomer } = props;
  //delearing state variables
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateIndex, setUpdateIndex] = useState(0);
  const [blanketValue, setBlanketValue] = useState([]);
  const [claimCount, setClaimCount] = useState(0);
  const [value, setValue] = useState(0);
  const [claims, setClaims] = useState([]);
  const [toggleClaim, setToggleClaim] = useState(false)


  //get customerId from props
  let {
    match: {
      params: { customerId },
    },
  } = props;

  useEffect(() => {
    //getCustomer on ComponentDidMount
    getCustomer(customerId);
  }, [getCustomer, customerId]);

  useEffect(() => {
    //calculate blanket and claim Count whwn state of customer is updated
    if (customer) {
      let customerClaims = customer.claim;
      if (customerClaims.length > 0) {
        setClaims(customerClaims);
        let openClaims = customerClaims.filter(
          (claim) => claim.status === "open"
        ).length;
        setClaimCount(openClaims);
      } else {
        setClaimCount(0);
      }
      //set the blanket value to the total # of blankets
      setBlanketValue(customer.blanketDeposit);
    }
  }, [customer]);

  //close modal
  const handleClose = () => setShow(false);

  //update the claim data(whwn update button is clicked through modal)
  const updateClaimData = () => {
    let ob = {
      timestamp: new Date(),
      value: update,
    };
    let newData = cloneDeep(claims);

    newData[updateIndex].updates.unshift(ob);
    let { updateClaim } = props;
    //Call Update Claim Api to update claim
    updateClaim(newData[updateIndex], (res) => {
      newData[updateIndex].updates = res.data.data.updates;
      setClaims(newData);
      setShow(false);
      setUpdate("");
    })
  };

  //onChange handler of textarea of modal
  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  //onChange handler of material-ui tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //add new update modal
  const showUpdateModal = (i) => {
    setUpdateIndex(i);
    setShow(true);
  };



  //tabPanel of material ui
  const TabPanel = (props) => {
    let { children, value, index, ...other } = props;
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

  //close the claim
  const handleCloseClaim = (i) => {
    let { updateClaim } = props;
    let updatedClaims = cloneDeep(claims);
    updatedClaims[i].status = "closed";
    updateClaim(updatedClaims[i], (res) => {
      let updatedCount = cloneDeep(claimCount)
      let newCount = --updatedCount;
      updatedClaims[i].updatedAt = res.data.data.updatedAt;
      setClaimCount(newCount);
      setClaims(updatedClaims);
      setToggleClaim(false)
    })
  };

  const reopenClaim = (i) => {
    let { updateClaim } = props;
    let updatedClaims = cloneDeep(claims);

    updatedClaims[i].status = 'open';
    updateClaim(updatedClaims[i], (res) => {
      let updatedCount = cloneDeep(claimCount)
      let newCount = ++updatedCount;
      updatedClaims[i].updatedAt = res.data.data.updatedAt;
      setClaimCount(newCount);
      setClaims(updatedClaims);
      setToggleClaim(false)
    })


  }
  const updateBlanket = (data) => {
    setBlanketValue(data);
  };
  return (
    <div className={style.customerDetailsContainer}>
      {customer && (
        <div className={style.customerDetails}>
          {/* defining AppBar for material ui tabs */}
          <AppBar position="static">
            <Tabs
              className={style.styleTabs}
              onChange={handleChange}
              value={value}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Customer Information" />
              <Tab
                label={
                  <Badge badgeContent={claimCount} color="primary">
                    Claims
                  </Badge>
                }
              />{" "}
              <Tab
                label={
                  <Badge
                    badgeContent={customer.blanketDeposit.reduce(
                      (sum, currentValue) =>
                        sum + parseInt(currentValue.quantity),
                      0
                    )}
                    color="primary"
                  >
                    Blankets
                  </Badge>
                }
              />
            </Tabs>
          </AppBar>
          {/* Tab Panel of customer */}
          <TabPanel value={value} index={0}>
            <div className={style.customerInfoHeader}>
              <div>
                <h3>Customer Information</h3>
              </div>
              <div>
                <Link
                  className={style.link}
                  to={{
                    pathname: "/job/add",
                    customerId: customer.email,
                    customerName: customer.firstName + " " + customer.lastName,
                    jobs: customer.jobs,
                  }}
                >
                  {" "}
                  <Button className={style.button}>Create Job</Button>{" "}
                </Link>
              </div>
              <div>
                <Link
                  className={style.link}
                  to={{
                    pathname: `/customer/update/${customerId}`,
                    customerId: customer.email,
                  }}
                >
                  {" "}
                  <Button className={style.button}>Edit</Button>{" "}
                </Link>
              </div>
            </div>
            <hr />
            <div className={style.customerInfoHeadings}>
              <div>
                <h6>Name</h6>
              </div>
              <div>
                <h6>Phone</h6>
              </div>
              <div>
                <h6>Email</h6>
              </div>
            </div>
            <div className={style.customerInfoDescription}>
              <div>
                {customer.firstName} {customer.lastName}
              </div>
              <div>{customer.phone}</div>
              <div>{customer.email}</div>
            </div>

            {customer.subContacts.length !== 0 ? (
              <div>
                <h4>Alternate Contact</h4>

                <div className="accordion" id="accordionExample">
                  {customer.subContacts.map((x, i) => (
                    <div key={i} className={`card`}>
                      <div className="card-header" id="headingOne">
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
                          <div className={style.cardBodyHeader}>
                            <div>{x.length !== 0 && <h6>Name</h6>}</div>
                            <div>{x.length !== 0 && <h6>Email</h6>}</div>
                            <div>{x.length !== 0 && <h6>Phone</h6>}</div>
                          </div>
                          <div className={style.cardBodyContent}>
                            <div>{x.name !== "" ? x.name : "N/A"}</div>
                            <div>{x.email !== "" ? x.email : "N/A"}</div>
                            <div>{x.phone !== "" ? x.phone : "N/A"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div >
              {customer.jobs && customer.jobs.length > 0 ? (
                <div>
                  <h3 className={`${style.job}`}>Jobs</h3>
                  <div id="accordion">
                    {customer.jobs.map((job, i) => {
                      return (
                        <div key={i} className={style.jumbotron} >
                          <div
                            className={`card-header ${style.jobCard}`}
                            aria-expanded="true"
                            data-toggle="collapse"
                            data-target={`#jobCollapse${i}`}
                            aria-controls="collapse"
                            id="headingOne"
                          >

                            <div className={style.jobDetails}>
                              <div className={style.jobLink}>
                                <Link
                                  className={style.link}
                                  to={{
                                    pathname: "/job/detail/" + job._id,
                                  }}
                                >
                                  <h5>{job.title}</h5>
                                </Link>
                              </div>
                              <div className={style.jobService}>
                                <span><Chip
                                  size="medium"
                                  label={job.jobId}
                                  clickable
                                  color="primary"
                                /></span>
                                <span><Chip
                                  size="medium"
                                  label={job.status}
                                  clickable
                                  color="primary"
                                /></span>
                              </div>
                            </div>
                            <div className={`${style.jobDates} text-muted`}>
                              {job.dates.map((x, i) => (
                                <div key={i}>
                                  {i === 0 ? (
                                    <div key={i}>{x.date}</div>
                                  ) : (
                                      <div key={i}>
                                        <span className={style.spacing}>|</span>
                                        {x.date}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>

                          </div>

                          <div
                            id={`jobCollapse${i}`}
                            className="collapse"
                            aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div className={`card-body ${style.cardBodyContainer}`}>

                              {/* show services, type */}
                              <div className={style.cardBody___sectionOne}>
                                <div>
                                  <h5>Service:</h5>
                                  {job.services.map((service, i) => (
                                    <Chip
                                      key={i}
                                      size="small"
                                      label={service.name}
                                      clickable
                                      color="primary"
                                      variant="outlined"
                                    />
                                  ))}</div>

                                <div>
                                  <h5>Job Type:</h5>
                                  <Chip
                                    clickable
                                    size="small"
                                    label={job.jobType}
                                    color="primary"
                                    variant="outlined"
                                  /></div>

                              </div>

                              <div className={style.cardBodyContainerTwo}>
                                <div>
                                  <h5>Movers Required:</h5>
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
                                    label={`$${job.price}`}
                                  />
                                </div>

                              </div>
                              <div className={style.cardBodyContainerThree}>
                                <h5>Truck Details</h5>
                                {job.trucks.map((x, i) =>
                                  <div className={style.truckSection}>
                                    <div>
                                      {`Type: `}
                                      <Chip
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
                              <div className={style.cardBodyContainerThree}>
                                <h5>Assignees:</h5>
                                {job.assignee.length > 0 ? (
                                  <div >

                                    {job.assignee.map((assignee, i) =>
                                      i === 0 ? (
                                        <span key={i} className={style.jobAssignee}>
                                          {assignee.name}
                                        </span>
                                      ) : (
                                          <span key={i} className={style.jobAssignee}>
                                            <span className={style.spacing}> | </span>
                                            {assignee.name}
                                          </span>
                                        )
                                    )}
                                  </div>
                                ) : (

                                    <div>
                                      {`Not Assigned`}</div>
                                  )}
                              </div>
                              {/* show job Description */}
                              <div className={style.jobDetailContainer}>
                                <h5>Job Details:</h5>
                                <div className={style.jobDetail}>
                                  {parse(job.description)}
                                </div>
                              </div>
                              {job.locations && (
                                <div className={style.locations}>
                                  {job.locations.map((list, i) =>
                                    list.type === "pickup" ? (
                                      <div key={i}>
                                        <FontAwesomeIcon icon={faDotCircle} />{" "}
                                        <span>{`Pickup`} </span>{" "}
                                        <div className={style.location}>
                                          {list.value} {list.default ? '(Load Only / IA)' : null}
                                        </div>
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
                                    ) : (
                                        <div key={i}>
                                          <FontAwesomeIcon icon={faDotCircle} />{" "}
                                          <span>{`Dropoff`}</span>
                                          <div className={style.location}>
                                            {list.value} {list.default ? '(Unload Only)' : null}
                                          </div>
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

                              {job.note.length !== 0 && (
                                <div className={style.notes}>
                                  <div>
                                    <h5>Notes:</h5>
                                  </div>
                                  <div className={style.notes___text}>
                                    {job.note.map((x, i) => (
                                      <div key={i}>{x.text}</div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                  <h4 className={`${style.flex} ${style.styleEmptyJobs}`}>
                    No job added yet
                </h4>
                )}
            </div>
          </TabPanel>
          {/* Tab Panel of claim */}
          <TabPanel value={value} index={1}>
            <div className={style.claimTopRow}>
              <div>
                <h3>Claims</h3>
              </div>
              <div className={style.newClaimBtn}>
                <Link
                  className={style.link}
                  to={{
                    pathname: "/claim/add",
                    customerId: customer.email,
                    customerName: customer.firstName + " " + customer.lastName,
                    jobs: customer.jobs,
                  }}
                >
                  {" "}
                  <Button className={style.button}>New Claim</Button>{" "}
                </Link>
              </div>
            </div>
            <hr />
            {/* {claims.length > 0 && (
              <div className={style.claimListHeaderContainer}>
                <div className={style.claimListHeader}>
                  <div>Job Id</div>
                  <div>Status</div>
                  <div>Last Update</div>
                </div>
              </div>
            )} */}
            <div id="accordion">
              {claims.length > 0 ? (
                claims.map((claim, i) => {

                  return (
                    <div key={i}>
                      <div
                        className={`card-header ${style.cardHeader}`}
                        aria-expanded="true"
                        data-toggle="collapse"
                        data-target={`#collapse${i}`}
                        aria-controls="collapse"
                        id="headingOne"
                      >
                        <div>
                          <div className={`text-muted ${style.heading}`}>Job ID</div>
                          <div className={style.headingSub}>{claim.job && claim.job.jobId}</div>

                        </div>
                        <div>
                          <div className={`text-muted ${style.heading}`}>Status</div>
                          <div className={`text-capitalize ${style.headingSub}`}>{claim.status}</div>

                        </div>
                        <div>
                          <div className={`text-muted ${style.heading}`}>Last Updated</div>
                          <TimeAgo className={`text-capitalize ${style.headingSub}`} date={claim.updatedAt} />
                        </div>
                      </div>
                      <div
                        id={`collapse${i}`}
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className={`card-body ${style.claimBody}`}>
                          <div key={i} className={style.claimDetail}>
                            <div className={style.claimHead}>

                              <div className={`${style.protectionRow}`}>
                                <div className={style.protectionRow___colOne}>
                                  <div>
                                    <h6>{`Protection Type: `}</h6>
                                    {claim.claimType}
                                  </div>
                                  <div>
                                    <h6>{`Total: `}</h6>
                                    ${claim.price}
                                  </div>
                                  <div>
                                    <h6>{`Title: `}</h6>
                                    {claim.title}
                                  </div>
                                </div>

                                <div className={style.protectionRow___colTwo}>
                                  <h6>{`Actions`}</h6>
                                  <div className={style.protectionRow___buttons} >
                                    <div>
                                      {claim.status === "open" ? (
                                        <Button
                                          className={style.button}
                                          onClick={() => showUpdateModal(i)}
                                        >
                                          Add Update
                                        </Button>
                                      ) : null}
                                    </div>
                                    <div>
                                      {claim.status === "open" ? (
                                        <Button
                                          className={style.button}
                                          onClick={() => setToggleClaim(true)}
                                        >
                                          Close Claim
                                        </Button>
                                      ) : (
                                          <Button
                                            className={style.button}
                                            onClick={() => setToggleClaim(true)}
                                          >
                                            Reopen Claim
                                        </Button>
                                        )}
                                    </div></div>

                                </div>

                              </div>


                              {/* <div className={style.description}> {" "}*/}


                              {/* </div>
                            <div className={`${style.waiting}`}> */}


                              {/* <div className={style.description}>

                                <span>
                                  {claim.status === "open" ? (
                                    <Button
                                      className={style.button}
                                      onClick={() => showUpdateModal(i)}
                                    >
                                      Add Update
                                    </Button>
                                  ) : null}
                                </span>
                                <span>
                                  {claim.status === "open" ? (
                                    <Button
                                      className={style.button}
                                      onClick={() => setToggleClaim(true)}
                                    >
                                      Close Claim
                                    </Button>
                                  ) : (
                                    <Button
                                      className={style.button}
                                      onClick={() => setToggleClaim(true)}
                                    >
                                      Reopen Claim
                                    </Button>
                                  )}
                                </span>

                              </div> */}

                            </div>
                            {/* Update Section */}
                            {/* </div>
                            <div className={`${style.waiting}`}> */}
                            <div className={`${style.title}`}>
                              <div className={style.titleOne}>
                                <h6>Description:</h6>
                                <div className={style.title___textOne}>
                                  {claim.description}
                                </div>
                              </div>
                              <div className={style.titleTwo}>
                                <h6>Waiting To : </h6>
                                <div className={style.title___textTwo}>
                                  {claim.waitTo}
                                </div>
                              </div>
                            </div>

                            {claim.updates.length > 0 ? (
                              <div className={style.updates}>
                                <div className={style.updateHead}>
                                  <h3>Updates:</h3>
                                </div>
                                <div className={style.updateContent}>
                                  {claim.updates.map((x, i) => (
                                    <div className={style.updateContentContainer}>
                                      <div
                                        key={i}
                                        className={style.updateContentRow}
                                      >
                                        {/* {" "} */}
                                        <div>{`${x.value}`}</div>
                                        <div className={`text-muted ${style.timeStamp}`}>
                                          <FontAwesomeIcon icon={faCalendarTimes} />
                                          <TimeAgo date={x.timestamp} />
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* modal for close and reopen claims */}
                      <Modal
                        show={toggleClaim}
                        onHide={() => setToggleClaim(false)}
                        scrollable
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {claim.status === 'open' ? `Do you want to close this claim ?` : `Do you want to reopen this claim ?`}
                        </Modal.Body>
                        <Modal.Footer>
                          <div className={style.flexEnd}>
                            <Button className={style.button} onClick={() => setToggleClaim(false)}>
                              Close
                                </Button>
                            {claim.status === 'open' ? <Button className={style.button} onClick={() => handleCloseClaim(i)}>
                              Confirm
                                </Button>
                              : <Button className={style.button} onClick={() => reopenClaim(i)}>
                                Confirm
                                </Button>
                            }
                          </div>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  )

                })
              ) : (
                  <div className="text-center">
                    <img src="/images/no-data-found.png" alt="Data not found" />
                  </div>
                )}
            </div>
          </TabPanel>

          {/* Tab Panel of blankets */}
          <TabPanel value={value} index={2}>
            <div className={style.toprow}>
              <div>
                <h3>Blanket Deposit</h3>
              </div>
              <div className={style.btn}>
                <Link
                  className={style.link}
                  to={{
                    pathname: "/deposit/add",
                    customerId: customer.email,
                    customerName: customer.firstName + " " + customer.lastName,
                    jobs: customer.jobs,
                  }}
                >
                  {" "}
                  <Button className={style.button}>Deposit</Button>{" "}
                </Link>
              </div>
            </div>
            <hr />
            {blanketValue && blanketValue.length > 0 ? (
              <Blankets
                firstName={customer.firstName}
                lastName={customer.lastName}
                items={blanketValue} update={updateBlanket} />
            ) : (
                <div className="text-center">
                  <img src="/images/no-data-found.png" alt="Data not found" />
                </div>
              )}
          </TabPanel>

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
          <TextareaAutosize
            id=""
            cols="65"
            rows="5"
            name="Note"
            value={update}
            onChange={handleAddUpdate}
            className={style.styleTextArea}
          ></TextareaAutosize>
        </Modal.Body>
        <Modal.Footer>
          <div className={style.flexEnd}>
            <Button className={style.button} onClick={handleClose}>
              Close
            </Button>
            <Button
              className={style.button}
              type="button"
              onClick={updateClaimData}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  customer: state.customers.customer,
  user: state.users.user,
});

var actions = {
  getCustomer,
  updateClaim,
};
export default connect(mapStateToProps, actions)(CustomerDetails);
