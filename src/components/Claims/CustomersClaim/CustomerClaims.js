import React, { useEffect, useState } from "react";
import style from "./CustomerClaims.module.css";
import SideBar from "../../Sidebar/SideBar";
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
  var [claimData, setClaimData] = useState("");
  // const [showClaimsDetail, setShowClaimsDetail] = useState(false)

  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var totalCount = claims.claims?.data?.claims?.total;

  useEffect(() => {
    var { getAllClaims, claims } = props;
    var claimsObj = {
      status: status,
      page: currentPage,
      query: "",
    };
    getAllClaims(claimsObj);
    
  
  }, []);
  useEffect(() => {
    var { claims } = props;
    if (claims.claims) {
      console.log(claims.claims)
      data = claims.claims.data.claims;
      console.log(data)
      setClaimData(data.docs)
    }
  },[claims])
  var { claims } = props;
  var data = [];
  
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

  var removeClaim = (i, id) => {
    var { showMessage } = props;
    console.log(claimData);
    deleteClaim(id)
      .then((res) => {
        let newData = cloneDeep(claimData);
        console.log(claimData);
        newData.splice(i, 1);
        setClaimData(newData);
        showMessage(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  var { users } = props;
  
  return (
    <div style={{ overflowX: "hidden" }}>
      {claimData && (
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
          {claimData && claimData.length > 0 ? (
            <div className={style.jumbotron}>
              <div
                className={`row`}
                style={{
                  margin: "1rem 3rem",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
                <div className="col-3">Name</div>
                <div className="col-2">Status</div>
                <div className="col-4"> Waiting To</div>
                <div className="col-2">Last Update</div>
                {users?.role === "admin" && (
                  <div className="col-1">Actions</div>
                )}
              </div>
              <ul className="list-group">
                <div className={`${style.li} `}>
                  {claimData &&
                    claimData.map((x, i) => {
                      return (
                       
                          
                            <div  >
                               <li 
                            className={`checkbox list-group-item ${style.list} `}
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
                                > <div className="row">
                                  <div className={`col-3`}>
                                    <h6>
                                      {x.customer.firstName}{" "}
                                      {x.customer.lastName}
                                    </h6>
                                  </div>
                                  <div
                                    className={`col-2 `}
                                    // style={{
                                    //   transform: "translate3d(30rem, -3.5rem, 0)",
                                    // }}
                                  >
                                    {x.status.toLocaleUpperCase()}
                                  </div>
                                  <div className={`col-4 `}>
                                    <h6>{x.waitTo}</h6>
                                  </div>

                                  <div
                                    className={`col-2 `}
                                    // style={{
                                    //   transform: "translate3d(45rem, -5rem, 0)",
                                    // }}
                                  >
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
                              {users?.role === "admin" && (
                                <div className="col-1">
                                  <Button
                                    onClick={() => removeClaim(i, x._id)}
                                    style={{
                                      background: "#00ADEE",
                                      textTransform: "none",
                                      color: "#FFF",
                                      fontFamily: "sans-serif",
                                      width: "100%",
                                    }}
                                  >
                                    <div>
                                      <FontAwesomeIcon icon={faTrash} />
                                    </div>
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
};

export default connect(mapStateToProps, actions)(CustomerClaims);
