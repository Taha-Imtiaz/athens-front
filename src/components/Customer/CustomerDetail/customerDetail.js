import React, { useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import style from "./customerdetail.module.css";
import Button from "../../Button/Button";
import SideBar from "../../Sidebar/SideBar";
import { Link,  Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCustomer } from "../../../Redux/Customer/customerActions";

const CustomerDetail = (props) => {
  var { customer, getCustomer } = props;
  if(customer) {
  console.log(customer[0])
  }
  var {match:{params:{customerId}}} = props
  
  
  useEffect(() => {
  
    getCustomer(customerId)
   }, [])
  ;

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
 
  return (
  <div>
      {customer  ? (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} />
            </div>
            <div className="col-6">
              <div className={style.head}>
                <h5>{customer[0].name}</h5>
                <label className={style.l1}>{customer[0].phone}</label>
                <label className={style.l2}>{customer[0].email}</label>
              </div>
            </div>
            <div className="col-4">
              <div className={`row ${style.toprow}`}>
                <div className="col-2">
                  <Button icon="fa fa-edit" />
                </div>
                <div className="col-2">
                  <Button icon="fa fa-trash" />
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
                    <label className={style.l1}>{customer[0].subcontacts.phone}</label>
                    <label className={style.l2}>{customer[0].subcontacts.email}</label>
                  </div>
                </div>
              </div>

              {/* <div class="card">
                <div class="card-header" id="headingTwo">
                  <h5 class="mb-0">
                    <button
                      class="btn btn-link collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Contact #2
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <label className={style.l1}>03312858185</label>
                    <label className={style.l2}>shaheerabbas20@gmail.com</label>
                  </div>
                </div>
              </div> */}
             </div>
           </div>

           <div className={style.btn}>
             <Link style={{ textDecoration: "none" }} to="/job/create">
               {" "}
               <Button name="Create Job" />{" "}
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
                 <p className={style.p}>7-July 10 | {customer[0].job.startTime} - {customer[0].job.endTime}</p>
                 <p className={style.p}>{customer[0].job.description}</p>
               </div>
               <div className="col-4">
               <p className ={ style.p}>{customer[0].job.assignee}</p>
               </div>
               <div className="col-4">
            <p className ={ style.p}>{customer[0].job.status}</p>
               </div>
             </div>
             <div>
               <h4 className={style.notesh}>Notes</h4>
               <p className={style.notesd}>
                {customer[0].job.note.map((note) => note.text)}
               </p>
             </div>
            
             <Button name="Add Note" />
           </div>
           <br />
         </div>
       ) : (
         <Redirect to="/customer"/>
       )}
     </div>
  );
 };
var mapStateToProps = (state) => ({
  customer: state.customers.data? state.customers.data.customer:null
});

var actions = {
  getCustomer,
};
export default connect(mapStateToProps, actions)(CustomerDetail);
