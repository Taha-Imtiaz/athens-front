import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllClaims,
  updateClaim,
  deleteClaim,
  getClaimsByID,
} from "../../../Redux/Claims/claimsActions";

import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import _, { transform } from "lodash";
import { clone, cloneDeep } from "lodash";
import { showMessage } from "../../../Redux/Common/commonActions";
import Pagination from "../../../components/Pagination/Pagination";
import moment from "moment";
import SearchBar from "../../../components/SearchBar/SearchBar";
import TimeAgo from "react-timeago";

const CustomerClaims = (props) => {
  var { claims } = props;
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const [updateIndex, setUpdateIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(null);
  const [status, setStatus] = useState("all");
  var [claimData, setClaimData] = useState("");
  // const [showClaimsDetail, setShowClaimsDetail] = useState(false)
  var [modalIndex, setModalIndex] = useState("");

  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [claimToDelete, setClaimToDelete] = useState("");

  var totalCount = claims.claims ?.total;

  useEffect(() => {
    var { getAllClaims, claims } = props;
    var claimsObj = {
      status: status,
      page: currentPage,
      query: "",
    };
    getAllClaims(claimsObj);
  }, []);
  var data = [];
  useEffect(() => {
    var { claims } = props;
    if (claims.claims) {
      data = claims.claims;
    }
  }, [claims]);
  var { claims } = props;

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

  const getClaimsByStatus = (e, value) => {
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

  var removeClaim = () => {
    var { deleteClaim } = props;
    deleteClaim(claimToDelete, currentPage);
    setShow(false)
  };
  var { users, claims } = props;

  var handleShow = (i, jobId) => {
    setModalIndex(i)
    setClaimToDelete(jobId)
    setShow(true)

    // if (modalIndex === i)
    //   setShow(true)
    // else
    //   setShow(false)
  };

  var handleClose = () => {
    setShow(false);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {claims && (
        <div>
          <div className={`row ${style.toprow}`}>
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
                <a
                  className="dropdown-item"
                  onClick={(e) => getClaimsByStatus(e, "all")}
                >
                  All
                </a>
                <a
                  className="dropdown-item"
                  onClick={(e) => getClaimsByStatus(e, "open")}
                >
                  Open
                </a>
                <a
                  className="dropdown-item"
                  onClick={(e) => getClaimsByStatus(e, "closed")}
                >
                  Closed
                </a>
              </div>
              <div style={{ margin: "-0.5rem" }}>
                <Link style={{ textDecoration: "none" }} to="/claim/newclaim">
                  <Button
                    style={{
                      background: "#00ADEE",
                      textTransform: "none",
                      color: "#FFF",
                      fontFamily: "sans-serif",
                    }}
                  >
                    New Claim
                  </Button>{" "}
                </Link>
              </div>
            </div>
          </div>
          {claims ?.claims ?.docs.length > 0 ? (
            <div className={style.jumbotron}>
              <div
                className={`row`}
                style={{
                  margin: "1rem 3rem",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                <div className="col-11">
                  <div className="row">
                    <div className="col-3">Name</div>
                    <div className="col-3">Status</div>
                    <div className="col-4"> Waiting To</div>
                    <div className="col-2">Last Update</div>
                  </div>
                </div>
                {users ?.role === "admin" && (
                  <div className="col-1">Actions</div>
                )}
              </div>
              <ul className="list-group">
                <div className={`${style.li} `}>
                  {claims ?.claims ?.docs &&
                    claims ?.claims ?.docs.map((x, i) => {
                      return (
                        <div>
                          <li
                            className={`checkbox list-group-item ${style.list}  `}
                            key={x._id}
                          >
                            <div className="row">
                              <div className="col-11">
                                <Link
                                  to={{
                                    pathname: `/claimsDetail/${x._id}`,
                                    claimsId: x._id,
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                  }}
                                >
                                  {" "}
                                  <div className="row">
                                    <div className={`col-3 ${style.item}`}>
                                      <h6>
                                        {x.customer.firstName}{" "}
                                        {x.customer.lastName}
                                      </h6>
                                    </div>
                                    <div className={`col-3  ${style.item}`}>
                                      {x.status.toLocaleUpperCase()}
                                    </div>
                                    <div className={`col-4  ${style.item}`}>
                                      <h6>{x.waitTo}</h6>
                                    </div>

                                    <div className={`col-2  ${style.item}`}>
                                      {x.updates.length > 0 ? (
                                        <div>
                                          {
                                            <TimeAgo
                                              date={x.updates[0].timestamp}
                                            />
                                          }
                                        </div>
                                      ) : (
                                          <div>
                                            <TimeAgo date={x.createdAt} />
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </Link>
                              </div>
                              {users ?.role === "admin" && (
                                <div className="col-1">
                                  <Button
                                    // onClick={() => removeClaim(i, x._id)}
                                    onClick={() => handleShow(i, x._id)}
                                    style={{
                                      background: "#00ADEE",
                                      textTransform: "none",
                                      color: "#FFF",
                                      fontFamily: "sans-serif",
                                      width: "100%",
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          </li>
                        </div>
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
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={`${style.modal}`}
        centered
        scrollable
      // backdrop = {false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Delete Confirmation
                                        </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body>Are You sure you want to delete this Claim with id {x._id}</Modal.Body> */}
        <Modal.Body>Are you sure you want to delete this Claim?</Modal.Body>
        <Modal.Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",

            }}
          >
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
                margin: "0 0.6rem",
              }}
              onClick={() => removeClaim()}>Confirm</Button>
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
              }} onClick={handleClose}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims,
  users: state.users.user,
});

var actions = {
  getAllClaims,
  showMessage,
  deleteClaim,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
