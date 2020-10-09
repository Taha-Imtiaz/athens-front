import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
// import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer, updateJob } from "../../../Redux/Customer/customerActions";
import { Modal } from "react-bootstrap";
import { Button } from 'react-bootstrap';


const CustomerDetail = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [note, setNote] = useState("");

  var { customer, getCustomer } = props;
  var formatStartDate, formatEndDate;
  if (customer) {
    console.log(customer);
    formatStartDate = new Date(customer.job.startDate);
    console.log(formatStartDate);
    formatEndDate = new Date(customer.job.endDate);
    console.log(formatEndDate);
    console.log(formatStartDate.toDateString());
    console.log(formatEndDate.toDateString());
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
    // console.log("han");
    console.log(value);
    setNote(value);
   
  };
  var AddNote = () => {
    console.log(note)
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

updateJob(jobObj, jobId)
  // customer.job.note.push({text:note})

    

    console.log(customer.job.note)
    handleClose()
  }
  return (
    <div>
      {customer && (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} />
            </div>
            <div className="col-6">
              <div className={style.head}>
                <h5>{customer.name}</h5>
                <label className={style.l1}>{customer.phone}</label>
                <label className={style.l2}>{customer.email}</label>
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
            <div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link"
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
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
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
            <Link style={{ textDecoration: "none" }} to="/job/create">
              {" "}
              <Button variant="primary" style = {{margin: "0 15rem"}}>
                  Create Job
                </Button>

            </Link>
          </div>

          <div class={style.jumbotron}>
            <div class="row">
              <div class="col-4">
                <h3 className={style.job}>Jobs:</h3>
              </div>
              <div class="col-4">
                <label className={style.assigned}>Assigned</label>
              </div>
              <div class="col-4">
                <label className={style.status}>Status</label>
              </div>
            </div>
            <div className="row">
              <div class="col-4">
                <p className={style.p}>
                  {formatStartDate.toDateString()} -{" "}
                  {formatEndDate.toDateString()}| {customer.job.startTime} -{" "}
                  {customer.job.endTime}
                </p>
                <p className={style.p}>{customer.job.description}</p>
              </div>
              <div className="col-4">
                <p className={style.p}>{customer.job.assignee}</p>
              </div>
              <div className="col-4">
                <p className={style.p}>{customer.job.status}</p>
              </div>
            </div>
            <div>
              <h4 className={style.notesh}>Notes</h4>
              <p className={style.notesd}>
                {customer.job.note.map((note) => note.text)}
              </p>
            </div>


              <Button variant="primary" onClick={handleShow}>
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
