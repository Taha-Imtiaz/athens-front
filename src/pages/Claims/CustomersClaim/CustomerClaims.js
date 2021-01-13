import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import SideBar from "../../../components/Sidebar/SideBar";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
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
  var [value, setValue] = useState("all");

  var totalCount = claims?.total;

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
    if (claims) {
      data = claims;
    }
  }, [claims]);
  var { claims } = props;

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

  const getClaimsByStatus = (e) => {
    let value = e.target.value;
    var { getAllClaims } = props;
    setStatus(value);
    setValue(value);

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
    setShow(false);
  };
  var { users, claims } = props;

  var handleShow = (i, jobId) => {
    setModalIndex(i);
    setClaimToDelete(jobId);
    setShow(true);

    // if (modalIndex === i)
    //   setShow(true)
    // else
    //   setShow(false)
  };

  var handleClose = () => {
    setShow(false);
  };

  var handleChange = (e) => {
    console.log(e.target.value)
    setValue(e.target.value);
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
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={(e) => getClaimsByStatus(e)}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="open"
                    control={<Radio />}
                    label="Open"
                  />
                  <FormControlLabel
                    value="closed"
                    control={<Radio />}
                    label="Closed"
                  />
                  {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                </RadioGroup>
                {/* <a
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
                </a> */}
              </div>
              <div style={{ margin: "-0.5rem" }}>
                <Link style={{ textDecoration: "none" }} to="/claim/add">
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
          {claims?.docs.length > 0 ? (
            <div>
              <div className={style.claimListHeaderContainer}>
                <div
                  className={style.claimListHeader}
                  style={{ fontWeight: "bold" }}
                >
                  <div style={{padding:" 0 0.5rem"}}>Name</div>
                  <div style={{padding:" 0 0.5rem"}}>Status</div>
                  <div style={{padding:" 0 0.5rem"}}> Waiting To</div>
                  <div style={{padding:" 0 0.5rem"}}>Last Update</div>
                  {users ?.role === "admin" && <div>Actions</div>}
                </div>
              </div>
              {/* <ul className="list-group"> */}
              <div>
                {claims?.docs &&
                  claims?.docs.map((x, i) => {
                    return (
                      <div className={style.listContainer}>
                        <div className={`${style.listContent}`}>
                          <Link
                            className={style.styleLink}
                            to={{
                              pathname: `/claim/detail/${x._id}`,
                              claimsId: x._id,
                            }}
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                          >
                            {" "}
                            {/* <li
                            className={`checkbox list-group-item ${style.list}`}
                            key={x._id}
                          > */}
                            <div className={style.claimList}>
                              <div className={`${style.item} ${style.flex}`}>
                                {x.customer.firstName} {x.customer.lastName}
                              </div>
                              <div className={`${style.item} ${style.flex}`}>
                                {x.status.toLocaleUpperCase()}
                              </div>
                              <div className={`${style.item} ${style.flex}`}>{x.waitTo}</div>

                              <div className={`${style.item} ${style.flex}`}>
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
                            </div>
                            {/* </li> */}
                          </Link>

                          {users ?.role === "admin" && (
                            <div className={`${style.flex} ${style.actions}`}>
                              <Button
                                // onClick={() => removeClaim(i, x._id)}
                                onClick={() => handleShow(i, x._id)}
                                style={{
                                  background: "#00ADEE",
                                  textTransform: "none",
                                  color: "#FFF",
                                  fontFamily: "sans-serif",
                                  // width: "100%",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* </ul> */}
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
        // dialogClassName={`${style.modal}`}
        centered
        scrollable
      // backdrop = {false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
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
              onClick={() => removeClaim()}
            >
              Confirm
            </Button>
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
                margin: "0",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
var mapStateToProps = (state) => ({
  claims: state.claims?.claimList,
  users: state.users.user,
});

var actions = {
  getAllClaims,
  showMessage,
  deleteClaim,
};

export default connect(mapStateToProps, actions)(CustomerClaims);
