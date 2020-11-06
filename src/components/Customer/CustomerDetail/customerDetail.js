import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
// import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Chip from '@material-ui/core/Chip';
import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';
import LocationOffIcon from '@material-ui/icons/LocationOff';
const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [note, setNote] = useState("");

  var { customer, getCustomer } = props;
  // var formatStartDate, formatEndDate;
  if (customer?.jobs.length !== 0) {
    // formatStartDate = new Date(customer ?.jobs[0].startDate);
    // formatEndDate = new Date(customer ?.jobs[0].endDate);
  }
  var {
    match: {
      params: { customerId },
    },
  } = props;

  useEffect(() => {
    getCustomer(customerId);
  }, []);

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
  var AddNote = () => {
    var jobId = customer.job._id;
    var jobObj = {
      //   title:"Deputy Officer",
      // description:"ABC 123",
      // services:["ABC","ABC1"],
      // date:"12/12/12",
      // time:"24:45 AM",
      // from:"ABC Road",
      // to:"ABCD Road",
      // status:"updated",
      //  note:[{
      //     text:"Hi 1 2 3"
      // },{
      //     text:"Hi 1 2 3 4"
      // },{
      //     text:"Hi 1 2 3 4 5"
      // }]
      // {...jobObj}
      // ...customer.job.note.push()
    };

    // updateJob(jobObj, jobId)
    //     handleClose()
  };
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} key={customerId} />
            </div>
            <div
              className="col"
              
              style={{ margin: "2rem 1rem", height: "5rem" }}
            >
              <h3>Customer Information</h3>
              <hr />
              <div className="row" >
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
                  <p style={{ transform: "translate3d(0.5rem, -0.5rem,0)" }}>
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-3" style={{ transform: "translateY(2rem)" }}>
              {/* <div className={`row ${style.toprow}`}>
                <div className="col-2">
                  <Button icon="fa fa-edit">Edit</Button>
                </div>
                <div className="col-2">
                  <Button icon="fa fa-trash">Delete</Button>
                </div>
              </div> */}
              <div className={style.btn}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={{
                    pathname: "/job/create",
                    customerId: customer.email,
                  }}
                >
                  {" "}
                  <button
                    className="btn btn-primary"
                    style={{ background: "#00ADEE" }}
                  >
                    Create Job
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {customer.jobs.length !== 0 ? (
            <div>
              <h4 className={style.sub}>Sub Contact</h4>

              <div className={style.container}>
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
                          <div className="col-2">
                         {x.length !==0 && <h5 className={style.l1}>Email</h5>}
                          <label className={style.l1}>{x.phone}</label>
                          </div>
                         <div className="col-2">
                         {x.length!==0 && <h5 className={style.l1}>Phone</h5>}
                          <label className={style.l2}>{x.email}</label>
                         </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h4 style={{ transform: "translate3d(40rem, 15rem, 0)" }}>
              No job added yet
            </h4>
          )}
          {customer.jobs && customer.jobs.length > 0 ? (
            <div>
              <h3 className={`${style.job}`}>Jobs</h3>

              {/* <div className="row">
                <div className="col-6">
                
                </div>
                <div className="col-2">
                 
                </div>
              <div className="col-1"></div>
               

                <div className="col-2" >
                
                </div>
                <div className="col-1"></div>
              </div> */}

              {/* <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">See All Jobs</button> */}
              {customer?.jobs?.map((job, i) => {
                return (
                  <div className={style.jumbotron}>
                    <div className="row" key={i} style={{ padding: "2rem" }}>
                      {/* <div class="collapse multi-collapse col-6" id="multiCollapseExample1"> */}

                      <div className="col-7">
                        <h5>{job.title}</h5>

                        {job.dates.map((x,i) => (
                        i=== 0 ?  <label >
                        {x}
                      </label>: <label >
                           <span style={{padding:"0.5rem"}}>|</span>{x}
                          </label>

                        ))}
                        <p>
                          {job.services.map((service) => (
                            <label
                              style={{ display: "inline", padding: "0 0.2rem" }}
                            >
                              <Chip
                              variant = "outlined"
                                size="small"
                                label={service.name}
                                clickable
                                color="primary"
                              />
                            </label>
                          ))}
                        </p>
                        {/* <label style={{ transform: "translateY(-1rem)" }}>
                          {" "}
                          {job.startTime}
                        </label> */}

                        
                      </div>
                      <div className="col-3" >
                        {job.assignee.length > 0 ? (
                          <div style={{display:"flex"}}>
                            {job.assignee.map((assignee, i) => (
                        i===0 ?   <p>{assignee.name}</p> : 
                          <p>
                            <span style = {{padding:"0.5rem"}}>|</span>
                          {assignee.name}</p>
                        ))}
                          </div>
                        ): <p>No Assignee</p> }
                      </div>
                      <div className="col-2">
                        <p>
                        <Chip
                              variant = "outlined"
                                size="small"
                                label={job.status}
                                clickable
                                color="primary"
                              />
                        </p>
                      </div>

                          <div className = "col-12">
                          <p>
                          {job.description}
                        </p>
                         </div>
                        
                        {job.locations.map((list, i) => (
                          <div className="col-12">
                          <p key={i}>
                            {" "}
                          <label>  <MyLocationOutlinedIcon color = "primary" style={{margin:"0 0.5rem"}}/> {list.from} {" "}</label>
                           <p> <b> <LocationOffIcon color = "primary" style={{margin:"0 0.5rem"}}/></b> {list.to}</p>
                           <hr/>
                          </p>
                        </div>
                        ))}
                         
                      <div>
                        {/* <p className={style.notesd} > */}
                        {job.note.length > 0 && (
                          <h4 className={style.notesh}>Notes</h4>
                        )}
                        {job.note.map((note, i) => (
                          <div key={i} className={`row`}>
                            <p style={{ transform: "translateX(1.5rem)" }}>
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
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button variant="primary" onClick={AddNote}>
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
          ) : null}
          <br />
        </div>
      )}
      {/* //  : (
      //    <Redirect to="/customer"/>
      //  )} */}
    </div>
  );
};
var mapStateToProps = (state) => ({
  customer: state.customers.data ? state.customers.data.customer : null,
});

var actions = {
  getCustomer,
};
export default connect(mapStateToProps, actions)(CustomerDetail);
