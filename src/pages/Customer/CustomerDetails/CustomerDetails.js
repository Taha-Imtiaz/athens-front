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
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
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
    })
    // .then((res) => {
    //   if (res.data.status === 200) {
    //     let updatedCount = cloneDeep(claimCount)
    //     let newCount = --updatedCount;
    //     updatedClaims[i].updatedAt = res.data.data.updatedAt;
    //     setClaimCount(newCount);
    //     setClaims(updatedClaims);
    //     showMessage(res.data.message);
    //   }
    // })
    // .catch((err) => console.log(err));
  };
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

            {customer.jobs && customer.jobs.length > 0 ? (
              <div>
                <h3 className={`${style.job}`}>Jobs</h3>
                {customer.jobs.map((job, i) => {
                  return (
                    <div key={i} className={style.jumbotron}>
                      {/* show job Details */}
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

                        {job.assignee.length > 0 ? (
                          <div className={style.jobAssignee}>
                            {job.assignee.map((assignee, i) =>
                              i === 0 ? (
                                <div key={i}>{assignee.name}</div>
                              ) : (
                                  <div key={i}>
                                    <span className={style.spacing}>|</span>
                                    {assignee.name}
                                  </div>
                                )
                            )}
                          </div>
                        ) : (
                            <div>No Assignee</div>
                          )}

                        <div className={style.jobService}>
                          <Chip
                            variant="outlined"
                            size="small"
                            label={job.status}
                            clickable
                            color="primary"
                          />
                        </div>
                      </div>
                      {/* show dates */}
                      <div className={style.jobDates}>
                        {job.dates.map((x, i) => (
                          <div key={i}>
                            {i === 0 ? (
                              <div key={i}>{x}</div>
                            ) : (
                                <div key={i}>
                                  <span className={style.spacing}>|</span>
                                  {x}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                      {/* show services */}
                      <div className={style.services}>
                        {job.services.map((service, i) => (
                          <div key={i}>
                            <Chip
                              variant="outlined"
                              size="small"
                              label={service.name}
                              clickable
                              color="primary"
                            />
                          </div>
                        ))}
                      </div>
                      {/* show job Description */}
                      <div className={style.jobDetailContainer}>
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
                                  {list.value}
                                </div>
                              </div>
                            ) : (
                                <div key={i}>
                                  <FontAwesomeIcon icon={faDotCircle} />{" "}
                                  <span>{`Dropoff`}</span>
                                  <div className={style.location}>
                                    {list.value}
                                  </div>
                                </div>
                              )
                          )}
                        </div>
                      )}

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
                    </div>
                  );
                })}
              </div>
            ) : (
                <h4 className={`${style.flex} ${style.styleEmptyJobs}`}>
                  No job added yet
              </h4>
              )}
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
            {claims.length > 0 && (
              <div className={style.claimListHeaderContainer}>
                <div className={style.claimListHeader}>
                  <div>JobId</div>
                  <div>Status</div>
                  <div> Last Update</div>
                </div>
              </div>
            )}
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
                        <div>{claim.job.jobId}</div>

                        <div>{claim.status}</div>
                        <div>
                          <TimeAgo date={claim.updatedAt} />
                        </div>
                      </div>

                      <div
                        id={`collapse${i}`}
                        className="collapse"
                        aria-labelledby="headingOne"
                        data-parent="#accordion"
                      >
                        <div className={`card-body`}>
                          <div key={i} className={style.claimDetail}>
                            <div className={`${style.protectionRow}`}>
                              <div>
                                <h6>Protection Type : </h6>
                              </div>
                              <div>{claim.claimType}</div>

                              <div>
                                <h6>{`Total: `}</h6>
                              </div>
                              <div>{`$${claim.price}`}</div>

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
                                    onClick={() => handleCloseClaim(i)}
                                  >
                                    Close Claim
                                  </Button>
                                ) : (
                                    <Chip
                                      label="Closed"
                                      clickable
                                      color="primary"
                                      variant="outlined"
                                      size="small"
                                    />
                                  )}
                              </div>
                            </div>
                            <div className={`${style.title} `}>
                              <h6>Title:</h6> <div>{claim.title}</div>
                            </div>

                            <div className={style.description}>
                              <h6>Description:</h6>{" "}
                              <span>{claim.description}</span>
                            </div>
                            <div className={`${style.waiting}`}>
                              <div>
                                <h6>Waiting To : </h6>
                              </div>
                              <div>{claim.waitTo}</div>
                            </div>
                            {claim.updates.length > 0 ? (
                              <div className={style.updates}>
                                <div className={style.updateHead}>
                                  <h3>Updates</h3>
                                </div>
                                <div className={style.updateContent}>
                                  {claim.updates.map((x, i) => (
                                    <div
                                      key={i}
                                      className={style.updateContentRow}
                                    >
                                      {" "}
                                      <div>{`${i + 1}.  ${x.value}`}</div>
                                      <div>
                                        <TimeAgo date={x.timestamp} />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
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
              <Blankets items={blanketValue} update={updateBlanket} />
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
