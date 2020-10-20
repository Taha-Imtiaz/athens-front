import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
// import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal } from "react-bootstrap";
import { Button } from 'react-bootstrap';


const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [note, setNote] = useState("");

  var { customer, getCustomer } = props;
  var formatStartDate, formatEndDate;
  if (customer?.jobs.length !== 0) {
    formatStartDate = new Date(customer?.jobs[0].startDate);
    console.log(formatStartDate)
    formatEndDate = new Date(customer?.jobs[0].endDate);
  }
  var {
    match: {
      params: { customerId },
    },
  } = props;

  useEffect(() => {
    getCustomer(customerId);
    console.log(customerId)
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
    console.log(value)
   
  };
  var AddNote = () => {
    var jobId = customer.job._id
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
  }

// updateJob(jobObj, jobId)
//     handleClose()
  }
  console.log(customer)
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} key = {customerId} />
            </div>
            <div className="col-6">
              <div className={style.head}>
                <h5>{customer.name}</h5>
                <div>
                 <b> <label className={style.l1}>Phone</label></b>
                <label className={style.l1}>{customer.phone}</label>
                </div>
             <div>
              <b> <label className={style.l1}>Email</label></b> 
                <label className={style.l2}>{customer.email}</label>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className={`row ${style.toprow}`}>
                <div className="col-2">
                  <Button icon="fa fa-edit">Edit</Button>
                </div>
                <div className="col-2">
                  <Button icon="fa fa-trash">Delete</Button>
                </div>
              </div>
            </div>
          </div>

          <h3 className={style.sub}>Sub Contact</h3>

          <div className={style.container}>
            <div className="accordion" id="accordionExample">
              <div className="card">
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
                      Contact #1
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
                    <label className={style.l1}>
                      {customer.subcontacts.phone}
                    </label>
                    <label className={style.l2}>
                      {customer.subcontacts.email}
                    </label>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className={style.btn}>
            <Link style={{ textDecoration: "none" }} to={{
              
              pathname:"/job/create",
              customerId: customerId
              }}>
              {" "}
              <Button variant="primary" style = {{margin: "0 15rem"}}>
                  Create Job
                </Button>

            </Link>
          </div>
        {customer.jobs && 
          <div className={style.jumbotron} style = {{padding:"1rem 0"}}>
            <div className="row">
              <div className="col-4">
                <h3 className={style.job}>Jobs:</h3>
              </div>
              <div className="col-4">
                <label className={style.assigned}>Assigned</label>
              </div>
              <div className="col-4">
                <label className={style.status}>Status</label>
              </div>
            </div>
             {customer.jobs.map((job) => {
                  return  <div className="row" key = {customerId} style = {{margin: "2rem", borderBottom: "1px solid #a8a8a8"}} >
           
                  <div className="col-4">
    
                
                    <p style = {{padding: "5%"}}>
                      {formatStartDate.toDateString()} -{" "}
                      {formatEndDate.toDateString()}| {job.startTime} -{" "}
                      {job.endTime}
                    </p>
                    <p style = {{padding: "5%"}}>{job.description}</p>
                    {job.locations.map( list =>  <p style = {{padding: "5%"}}>From : {list.from} To : {list.to}</p>)}
                  </div>
                  <div className="col-4">
                    {job.assignee.map((assignee) => <p>{assignee}</p> )}
                   
                  </div>
                  <div className="col-4">
                    <p style = {{padding: "5%"}}>{job.status}</p>
                  </div>

                  <div>
              <h4 className={style.notesh}>Notes</h4>
              <p className={style.notesd} >
              
                {job.note.map((note) =>   <div className={`row`} style = {{margin: "3%"}} >
                 
                  {note.text}</div>)}
              </p>
                  {/* Add modal */}
              <Button onClick={handleShow} bsClass = "style-button" style= {{margin:" 2rem"}}>
             
                  Add Note
             
           
                </Button>
             
                <Modal show={show} onHide={handleClose} animation={false} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <textarea name="" id="" cols="65" rows="5" name = "note" value = {note} onChange= {handleAddNote}></textarea>
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

          
              
              
         
                })}
           
           


           
          </div>
          }
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
