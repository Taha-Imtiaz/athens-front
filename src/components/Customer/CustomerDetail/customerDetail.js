import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
// import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";
import { Modal, Alert } from "react-bootstrap";
import { Button } from 'react-bootstrap';


const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [note, setNote] = useState("");

  var { customer, getCustomer } = props;
  // var formatStartDate, formatEndDate;
  if (customer ?.jobs.length !== 0) {
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
  console.log(customer?.jobs[0]?.assignee[0].jobs)
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} key={customerId} />
            </div>
            
            <div className="col-2" style = {{transform: "translateY(2rem)"}}>
              <div className={style.head}>
                <h5>{customer.firstName} {customer.lastName}</h5>
                  </div>
                  </div>
                <div className="col-2" style = {{transform: "translateY(2rem)"}}>
                
                  <b> <label className={style.l1}>Phone</label></b>
                  <label className={style.l1}>{customer.phone}</label>
                </div>
                <div className="col-3" style = {{transform: "translateY(2rem)"}}>
                  <b> <label className={style.l1}>Email</label></b>
                  <label className={style.l2}>{customer.email}</label>
                </div>
            
           
            <div className="col-3" style = {{transform: "translateY(2rem)"}}>
              {/* <div className={`row ${style.toprow}`}>
                <div className="col-2">
                  <Button icon="fa fa-edit">Edit</Button>
                </div>
                <div className="col-2">
                  <Button icon="fa fa-trash">Delete</Button>
                </div>
              </div> */}
               <div className={style.btn}>
            <Link style={{ textDecoration: "none" }} to={{

              pathname: "/job/create",
              customerId: customer.email
            }}>
              {" "}
             <button className = "btn btn-primary" style = {{background:"#00ADEE"}}>Create Job</button>

            </Link>
          </div>
            </div>
       </div>
         
          {customer.jobs.length !== 0 ?
          <div>
          <h3 className={style.sub}>Sub Contact</h3>

          <div className={style.container}>
            <div className="accordion" id="accordionExample">
              {customer.subContacts.map((x, i) => (
                <div key={i} className="card">
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
                      <label className={style.l1}>
                        {x.phone}
                      </label>
                      <label className={style.l2}>
                        {x.email}
                      </label>
                    </div>
                  </div>
                </div>
               
              ))}
            </div>
          </div>
          </div>
         : <h4 style = {{transform:"translate3d(40rem, 15rem, 0)"}}>No job added yet</h4> }
          {customer.jobs && customer.jobs.length > 0 ?
            <div className={style.jumbotron} style={{ padding: "1rem 0" }}>
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
              {/* <button class="btn btn-primary" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">See All Jobs</button> */}
              {customer?.jobs?.map((job, i) => {
                return <div className="row" key={i} style={{ margin: "2rem", border: "1px solid #a8a8a8"}} >
                      {/* <div class="collapse multi-collapse col-6" id="multiCollapseExample1"> */}

                  <div className="col-4">


                    <p>
                      {
                        job.dates.map(x => <p>{x}</p>)
                      }
                      <br></br>
                      {job.startTime} -{" "}
                      {job.endTime}
                    </p>
                    <p>{job.description}</p>
                    {job.locations.map((list, i) => <p key={i}> <b> Pickup :</b> {list.from} <br/> <b> Drop Off :</b> {list.to}</p>)}
                  </div>
                  <div className="col-4">
                    {job.assignee.map((assignee, i) => <p>{assignee.name}</p>)}

                  </div>
                  <div className="col-4">
                    <p style={{ padding: "5%" }}>{job.status}</p>
                  </div>

                  <div>
                   
                    {/* <p className={style.notesd} > */}
            {job.note.length > 0 && <h4 className={style.notesh}>Notes</h4>}    
                      {job.note.map((note, i) => <div key={i} className={`row`} >
                  
                      <p style = {{transform:"translateX(1.5rem)"}}>  {note.text}</p></div>)}
                    {/* </p> */}
                    {/* Add modal */}
                    {/* <Button onClick={handleShow} bsClass = "style-button" style= {{margin:" 2rem"}}>
             
                  Add Note
             
           
                </Button> */}

                    <Modal show={show} onHide={handleClose} animation={false} centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Note</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <textarea name="" id="" cols="65" rows="5" name="note" value={note} onChange={handleAddNote}></textarea>
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
                // </div>





              })}





            </div>
          : null}
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
