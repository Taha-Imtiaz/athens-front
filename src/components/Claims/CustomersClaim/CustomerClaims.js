import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import SideBar from "../../Sidebar/SideBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllClaims,
  updateClaim,
  getClaimsByID,
} from "../../../Redux/Claims/claimsActions";

import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import _, { transform } from "lodash";
import { clone, cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import Pagination from "../../Pagination/Pagination";
import moment from "moment";
import SearchBar from "../../SearchBar/SearchBar";
import TimeAgo from "react-timeago";

const CustomerClaims = (props) => {
  var { claims } = props;
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateIndex, setUpdateIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(null);
  const [status, setStatus] = useState("all");
  // const [showClaimsDetail, setShowClaimsDetail] = useState(false)

  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var totalCount = claims.claims?.data?.claims?.total;

  useEffect(() => {
    var { getAllClaims } = props;
    var claimsObj = {
      status: status,
      page: currentPage,
      query: "",
    };
    console.log(claimsObj);
    getAllClaims(claimsObj);
  }, []);
  var { claims } = props;
  var data = [];
  if (claims.claims) {
    data = claims.claims.data.claims;
    console.log(data.docs);
  }

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

  var handlePageChange = (page) => {
    var { getAllClaims } = props;
    var claimsObj = {
      status: "all",
      page: page,
      query: "",
    };
    getAllClaims(claimsObj);
    setCurrentPage(page);
  };

  // const handleShow = (i) => {
  //   setShow(true);
  //   setUpdateIndex(i);
  // };

  // const handleClose = (notes) => {
  //   // var { note } = this.state;
  //   setShow(false);
  //   // this.setState({
  //   //     show: false,
  //   //     note: notes,
  //   // });
  // };
  // const updateClaimData = () => {
  //   if (update.length > 0) {
  //     let ob = {
  //       timestamp: new Date(),
  //       value: update,
  //     };
  //     let newData = cloneDeep(data.docs);
  //     console.log(newData, updateIndex);
  //     newData[updateIndex].updates.push(ob);
  //     var { showMessage, history } = props;
  //     updateClaim(newData[updateIndex])
  //       .then((res) => {
  //         if (res.data.status == 200) {
  //           data.docs[updateIndex].updates = res.data.claim.updates;
  //           setShow(false);
  //           setUpdate("");
  //           showMessage(res.data.message);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
  // const handleAddUpdate = (e) => {
  //   setUpdate(e.target.value);
  // };

  // const handleCloseJob = (i) => {
  //   var { showMessage } = props;

  //   data.docs[i].status = "closed";
  //   updateClaim(data.docs[i])
  //     .then((res) => {
  //       if (res.data.status == 200) {
  //         showMessage(res.data.message);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getClaimsByStatus = (e,value) => {
    console.log(value);
    var { getAllClaims } = props;
    setStatus(value);

    var claimsObj = {
      status: value,
      page: currentPage,
      query: "",
    };
    getAllClaims(claimsObj);
  };

  const toggleCollapse = (i) => {
    if (i == showIndex) {
      setShowIndex(null);
    } else {
      setShowIndex(i);
    }
  };
  console.log(status);
  return (
    <div style={{ overflowX: "hidden" }}>
      {data.docs && (
        <div>
          <div className={`row ${style.toprow}`}>
            {/* <div className="col-2">
              <SideBar routes={routes} />
            </div> */}

            <div className="col-3">
              <h3 className={style.head}>Claims</h3>
            </div>
            <div className="col-6">
              <SearchBar
                type="claims"
                title="Type first name or email"
                claimStatus={status}
              />
            </div>

            <div
              className={`col-2  d-flex justify-content-between ${style.filter}`}
            >
              <i
                className="fa fa-filter dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ transform: "translateY(-.3rem)" }}
              
              ></i>

              <div   
                className="dropdown-menu"
                aria-labelledby="dropdownMenuLink"
                style={{ margin: "-0.5rem" }}
              >
                <a className="dropdown-item" onClick={(e) =>getClaimsByStatus(e,"all")}>All</a>
                <a className="dropdown-item" onClick={(e) =>getClaimsByStatus(e,"open")}>Open</a>
                <a className="dropdown-item" onClick={(e) =>getClaimsByStatus(e, "closed")}>Closed</a>
              </div>
              {/* <div className="form-group" style={{ marginRight: "1.3rem" }}>
                <select className="form-control" onChange={getClaimsByStatus}>
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div> */}

              <div
               
               style={{ margin: '-0.5rem' }}
               >
                <Link style={{ textDecoration: "none" }} to="/claim/newclaim">
                <Button
                  style={{ background: "#00ADEE", textTransform: "none", color: "#FFF", fontFamily: "sans-serif" }}
                >
                  New Claim
                </Button>{" "}
              </Link> 
              
               
              </div>
            </div>
          </div>
          {data.docs && data.docs.length > 0 ? (
            <div className={style.jumbotron}>
              <div
                className={`row`}
                style={{ margin: "1rem 3rem", fontWeight: "bold", fontFamily: "sans-serif" }}
              >
                <div className="col-3">Name</div>
                <div className="col-2">Status</div>
                <div className="col-4"> Waiting To</div>
                <div className="col-2">Last Update</div>
              </div>
              <ul  className="list-group">
              <div className={`${style.li}`}>
                {data.docs &&
                  data.docs.map((x, i) => {
                    return (
                      
                        <Link
                          to={{
                            pathname: `/claimsDetail/${x._id}`,
                            claimsId: x._id,
                          }}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                           <div>
                           <li
                            className={`checkbox list-group-item ${style.list} ${style.flex}`}
                            key={x._id}
                          >
                        
                            <div className={`col-3 d-flex  text-left ${style.flex}` }>
                              <h6
                              // style={{
                              //   transform: "translate3d(13rem, -1.8rem, 0)",
                              // }}
                              >
                                {x.customer.firstName} {x.customer.lastName}
                              </h6>
                            </div>
                            <div
                              className={`col-2 d-flex text-left ${style.flex}`}
                              // style={{
                              //   transform: "translate3d(30rem, -3.5rem, 0)",
                              // }}
                            >
                              {x.status.toLocaleUpperCase()}
                            </div>
                            <div className={`col-4 d-flex text-left ${style.flex}`}>
                              <h6>{x.waitTo}</h6>
                            </div>

                            <div
                              className={`col-2 d-flex text-left ${style.flex}`}
                              // style={{
                              //   transform: "translate3d(45rem, -5rem, 0)",
                              // }}
                            >
                              {x.updates.length > 0 ? (
                                <div>
                                  {<TimeAgo date={x.updates[0].timestamp} />}
                                </div>
                              ) : (
                                <div>
                                  <TimeAgo date={x.createdAt} />
                                </div>
                              )}
                            </div>
                          
                          </li>
                          </div>
                        </Link>
                        // <div
                        //     id={`collapse${i}`}
                           
                        //     class="collapse"
                        //     aria-labelledby="headingOne"
                        //     data-parent="#accordion"
                        // >
                        //   <div className="card-body">
                        //     <div key={x._id}>
                        //       <div className="row justify-content-between"></div>

                        //        {x.claims.map((y, j) => {
                        //         return ( 
                        //           <div key={i}>
                        //             <h6>
                        //               Protection Type : {x.claimType}
                        //             </h6>
                        //             <div className="row">
                        //               <div className="col-12">
                            
                        //                 <p  style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                        //                   Description : {x.description}
                        //                 </p>
                        //               </div>

                                      
                        //             </div>
                                  
                        //           </div>
                        //           <hr/>
                        //           <div className="row">
                        //             <div className="col-10"></div>
                        //             <div className="col-2" style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                        //                 <p className={style.p2}>{`Total: $${x.price}`}</p>
                        //               </div>
                        //           </div>

                        //          );
                        //       })} 

                        //        {x.length > 0 ? (
                        //         <div className="row">
                        //           <div className="col-10">
                                  
                        //           </div>
                        //           <div className="col-2">
                        //             <p>
                        //               {" "}
                        //               Total: $
                        //               {x.reduce(function (a, b) {
                        //                 return a + b["price"];
                        //               }, 0)}
                        //             </p>
                        //           </div>
                        //         </div>
                        //       ) : null} 
                        //       <hr />
                        //       <div className="row">
                        //         <div className="col-12">
                        //           {x.updates.length > 0 ? (
                        //             <div>
                        //               <h3>Updates</h3>
                        //               {x.updates.map((x, i) => (
                        //                 <div key={i} className="row" style={{fontFamily:"Segoe UI, Tahoma, Geneva, Verdana, sans-serif"}}>
                        //                   <div className="col-9">
                        //                     <li> {x.value}</li>
                        //                   </div>
                        //                   <div className="col-3">
                        //                     <li>
                        //                       {" "}
                        //                       {x.timestamp.split("T")[0]}
                        //                     </li>
                        //                   </div>
                        //                 </div>
                        //               ))}
                        //             </div>
                        //           ) : null}
                        //         </div>
                        //       </div>
                        //       <div className="row" style={{ margin: "1rem 0" }}>
                        //         <div className="col-8"></div>
                        //         <div
                        //           className="col-2"
                        //           style={{ transform: "translateX(10rem)" }}
                        //         >
                        //           {x.status == "open" ? (
                        //             <Button
                        //               // name="Add Update"
                        //               style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}
                        //               onClick={() => handleShow(i)}
                        //             >Add Update</Button>
                        //           ) : null}
                        //         </div>

                        //         <div className="col-2"  >
                        //           {x.status == "open" ? (
                        //             <Button
                        //               // name="Close Claim"
                        //               style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif", transform: "translateX(4rem)" }}
                        //               onClick={() => handleCloseJob(i)}
                        //             >Close Claim</Button>
                        //           ) : null}
                        //         </div>
                        //       </div>
                        //     </div>
                        //   </div>
                        // </div>
                      
                    );
                  })}
              </div>
           </ul>
            </div>
          ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" />
            </div>
          )}
          {/* <Modal show={show} onHide={handleClose} dialogClassName = {style.modal} scrollable centered>
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
              <Button onClick={handleClose} style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif",margin:"0 0.4rem"}} >Close</Button>
              <Button onClick={updateClaimData} style={{background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}>Add</Button>
            </Modal.Footer>
          </Modal> */}
          <div className={style.jumbotron}>
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims,
});

var actions = {
  getAllClaims,
  showMessage,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
