import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import SideBar from "../../Sidebar/SideBar";
import Button from "../../Button/Button";
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

const CustomerClaims = (props) => {
  var { claims } = props;
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateIndex, setUpdateIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(null);
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var totalCount = claims.claims?.data?.claims?.total;

  useEffect(() => {
    var { getAllClaims } = props;
    var claimsObj = {
      status: "all",
      page: currentPage,
    };
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
    };
    getAllClaims(claimsObj);
    setCurrentPage(page);
  };

  const handleShow = (i) => {
    setShow(true);
    setUpdateIndex(i);
  };

  const handleClose = (notes) => {
    // var { note } = this.state;
    setShow(false);
    // this.setState({
    //     show: false,
    //     note: notes,
    // });
  };
  const updateClaimData = () => {
    if (update.length > 0) {
      let ob = {
        timestamp: new Date(),
        value: update,
      };
      let newData = cloneDeep(data.docs);
      console.log(newData, updateIndex);
      newData[updateIndex].updates.push(ob);
      var { showMessage, history } = props;
      updateClaim(newData[updateIndex])
        .then((res) => {
          if (res.data.status == 200) {
            data.docs[updateIndex].updates = res.data.claim.updates;
            setShow(false);
            setUpdate("");
            showMessage(res.data.message);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const handleAddUpdate = (e) => {
    setUpdate(e.target.value);
  };

  const handleCloseJob = (i) => {
    var { showMessage } = props;

    data.docs[i].status = "closed";
    updateClaim(data.docs[i])
      .then((res) => {
        if (res.data.status == 200) {
          showMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const getClaimsByStatus = (e) => {
    console.log(e.target.value);
    var { getAllClaims } = props;
    var claimsObj = {
      status: e.target.value,
      page: currentPage,
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
  return (
    <div style={{ overflowX: "hidden" }}>
      {data.docs && (
        <div>
          <div className="row">
            <div className="col-2">
              <SideBar routes={routes} />
            </div>
            <div className="col-5" style={{margin:" 1rem"}}>
              <h3 className={style.head}>Claims</h3>
            </div>
            <div
              className={`col-2 ${style.btn}`}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
               margin:" 1rem"
                // margin:"0 1rem"
                // background:"red"
              }}
            >
              {/* <div className={style.btn}> */}
              <Link style={{ textDecoration: "none" }} to="/claim/newclaim">
                <button
                  style={{
                    // transform: "translateX(3.5rem)
                    background: "#00ADEE",
                    marginTop: "3%",

                  }}
                  className={`btn btn-primary `}
                >
                  New Claim
                </button>{" "}
              </Link>
            </div>
            <div className="col-2" >
              
                <div className="form-group"style={{marginTop:"2%", margin:" 1rem"}}>
                  <select className="form-control" onChange={getClaimsByStatus}>
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              
            </div>
          </div>
          {data.docs && data.docs.length > 0 ? (
            <div>
              <div
                className={`row ${style.jumbotron}`}
                style={{
                  display: "flex",
                  marginTop: "1rem",
                  marginBottom: "-1.5rem",
                  fontWeight: "bold",
                }}
              >
                <div className="col-3"> Job Id</div>
                <div className="col-3">Name</div>
                <div className="col-3">Status</div>
                <div className="col-3">Last Update</div>
              </div>
              <div id="accordion" className={style.jumbotron}>
                {data.docs &&
                  data.docs.map((x, i) => {
                    return (
                      <div className="card">
                        <div
                          style={{
                            height: "4rem",
                            overflow: "hidden",
                            width: "100%",
                            cursor: "pointer",
                          }}
                          className="card-header"
                          id="headingOne"
                          onClick={() => toggleCollapse(i)}
                        >
                          <div className="col-3">
                            <h6 className={`${style.jobId}`}>
                              {x?.job?.jobId}
                            </h6>
                          </div>

                          <div className="col-3">
                            <h6
                              style={{
                                transform: "translate3d(13rem, -1.8rem, 0)",
                              }}
                            >
                              {x.customer.firstName} {x.customer.lastName}
                            </h6>
                          </div>
                          <div
                            className="col-4"
                            style={{
                              transform: "translate3d(30rem, -3.5rem, 0)",
                            }}
                          >
                            {x.status.toLocaleUpperCase()}
                          </div>
                          <div
                            className="col-"
                            style={{
                              transform: "translate3d(45rem, -5rem, 0)",
                            }}
                          >
                            {x.updates.length > 0 ? (
                              <div>
                                {
                                  x.updates[
                                    x.updates.length - 1
                                  ].timestamp.split("T")[0]
                                }
                                <span> | </span>{" "}
                                {
                                  x.updates[x.updates.length - 1].timestamp
                                    .split("T")[1]
                                    .split(".")[0]
                                }
                              </div>
                            ) : (
                              <div>
                                {x.createdAt.split("T")[0]} <span> | </span>{" "}
                                {x.createdAt.split("T")[1].split(".")[0]}
                              </div>
                            )}
                          </div>
                        </div>

                        <div
                          id="#collapse"
                          className={showIndex == i ? "show" : "collapse"}
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <div key={x._id}>
                              <div className="row justify-content-between"></div>

                              {x.claims.map((y, j) => {
                                return (
                                  <div key={j}>
                                    <h6 className={style.sub}>
                                      Claim Type : {y.claimType}
                                    </h6>
                                    <div className="row">
                                      <div className="col-10">
                                        <p className={style.para}>
                                          Description : {y.description}
                                        </p>
                                      </div>

                                      <div className="col-2">
                                        <p className={style.p2}>${y.price}</p>
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                );
                              })}

                              {x.claims.length > 0 ? (
                                <div className="row">
                                  <div className="col-10">
                                    {/* <Button name="Add Update" onClick={() => handleShow(i)}></Button> */}
                                  </div>
                                  <div className="col-2">
                                    <p>
                                      {" "}
                                      Total: $
                                      {x.claims.reduce(function (a, b) {
                                        return a + b["price"];
                                      }, 0)}
                                    </p>
                                  </div>
                                </div>
                              ) : null}
                              <hr />
                              <div className="row">
                                <div className="col-12">
                                  {x.updates.length > 0 ? (
                                    <div>
                                      <h3>Updates</h3>
                                      {x.updates.map((x, i) => (
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
                              </div>
                              <div className="row" style={{ margin: "1rem 0" }}>
                                <div className="col-8"></div>
                                <div
                                  className="col-2"
                                  style={{ transform: "translateX(2.5rem)" }}
                                >
                                  {x.status == "open" ? (
                                    <Button
                                      name="Add Update"
                                      onClick={() => handleShow(i)}
                                    ></Button>
                                  ) : null}
                                </div>

                                <div className="col-2">
                                  {x.status == "open" ? (
                                    <Button
                                      name="Close Claim"
                                      onClick={() => handleCloseJob(i)}
                                    ></Button>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" />
            </div>
          )}
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
              <Button onClick={handleClose} name="Close"></Button>
              <Button onClick={updateClaimData} name="Add"></Button>
            </Modal.Footer>
          </Modal>
          <div style={{ transform: "translateX(15rem)" }}>
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
