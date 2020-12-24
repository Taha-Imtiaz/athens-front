import React, { useEffect } from "react";
import style from "./customerlist.module.css";
import SearchBar from "../../SearchBar/SearchBar";
// import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCustomer, getAllCustomers } from "../../../Redux/Customer/customerActions";
import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faBook, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from '@material-ui/core/Button';
// import { setRef } from "@material-ui/core";


const CustomerList = (props) => {
  var { getAllCustomers } = props;
  var [order, setOrder] = useState(-1);
  var fetchCustomersOnPageChange = null;
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [recentlyUpdated, setRecentlyUpdated] = useState(false)
  var [recentlyUpdated, setRecentlyUpdated] = useState(false)
  var [recentlyAdded, setRecentlyAdded] = useState(false)
  var [sortByName, setSortByName] = useState(false)
  var { getAllCustomers } = props;
  var [show, setShow] = useState(false)
  useEffect(() => {
    var fetchCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: -1,
        updatedAt: null

      },
      page: 1,
    };
    getAllCustomers(fetchCustomersObj);
  }, []);

  var handlePageChange = (page) => {

    if (recentlyUpdated === true) {
      var fetchCustomersOnPageChange = {
        query: "",
        sort: {
          plainName: "",
          createdAt: null,
          updatedAt: -1
        },
        page: page,
      };
      setCurrentPage(page);
    }
    else if (recentlyAdded === true) {
      var fetchCustomersOnPageChange = {
        query: "",
        sort: {
          plainName: "",
          createdAt: -1,
          updatedAt: null
        },
        page: page,
      };
      setCurrentPage(page);
    }


    else if (sortByName === true) {
      if (order === 1) {
        var fetchCustomersOnPageChange = {
          query: "",
          sort: {
            plainName: 1,
            createdAt: null,
            updatedAt: null
          },
          page: page
        };
        setCurrentPage(page);
      } else if (order == -1) {
        var fetchCustomersOnPageChange = {
          query: "",
          sort: {
            plainName: -1,
            createdAt: null,
            updatedAt: null
          },
          page: page
        };
        setCurrentPage(page);
      }
    }
    else {
      var fetchCustomersOnPageChange = {
        query: "",
        sort: {
          plainName: "",
          createdAt: -1,
          updatedAt: null
        },
        page: page
      };
      setCurrentPage(page);
    }
    getAllCustomers(fetchCustomersOnPageChange);

  };

  const width = window.innerWidth;

  var { customers } = props;

  var totalCount = customers?.data.User.total;

  if (customers) {
    var {
      data: {
        User: { docs },
      },
    } = customers;
    var customerId = docs.map((doc) => doc._id);
  }
var removeCustomer = (i, id) => {
  var {deleteCustomer} = props
  deleteCustomer(id, currentPage)
}
  var handleSort = () => {
    setSortByName(true)
    setRecentlyAdded(false)
    setRecentlyUpdated(false)
    if (order == 1) {
      setOrder(-1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainName: -1,
          createdAt: null,
          updatedAt: null
        },
        page: 1
      };
      setCurrentPage(1)

    } else if (order == -1) {
      setOrder(1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainName: 1,
          createdAt: null,
          updatedAt: null
        },
        page: 1
      };
      setCurrentPage(1)
    }
    // else {
    //   setOrder(1);
    //   var sortCustomersObj = {
    //     query: "",
    //     sort: {
    //       plainName: 1,
    //       createdAt: null,
    //       updatedAt: null
    //     },
    //     page: 1,
    //   };
    // }
    getAllCustomers(sortCustomersObj);
  };

  var handleDateFilter = () => {

    setRecentlyAdded(true)
    setRecentlyUpdated(false)
    setSortByName(null)
    var sortCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: -1,
        updatedAt: null
      },
      page: 1,
    };
    setCurrentPage(1)
    getAllCustomers(sortCustomersObj);
  };

  var handleUpdtedAtFilter = () => {

    setRecentlyUpdated(true)
    setRecentlyAdded(false)
    setSortByName(null)
    var sortCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: null,
        updatedAt: -1
      },
      page: 1,
    };
    setCurrentPage(1)
    getAllCustomers(sortCustomersObj);
  };

  var handleShow = () => {
    setShow(true)
  };

  var handleClose = () => {

    setShow(false)


  };
console.log(props.customers)
  return (
    <div>
      <div>
        <div className={`row  ${style.toprow}`}>
          <div className="col-3">
            <b>
              <h3 className={style.head}>Customer List</h3>
            </b>
          </div>

          <div className={`col-6 ${style.search}`}>
            <SearchBar type="customer" title="Type first name or email" />
          </div>
          <div className={`col-2  d-flex justify-content-between ${style.filter}`}>
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
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" style={{ margin: "-0.5rem" }}>
              <a className="dropdown-item" onClick={handleUpdtedAtFilter}>
                Recently Updated
              </a>
              <a className="dropdown-item" onClick={handleDateFilter}>
                Recently Added
              </a>
              <a className="dropdown-item" onClick={handleSort}>
                Sort By Name
              </a>
            </div>
            <div style={{ margin: '-0.5rem' }}>
              <Link style={{ textDecoration: "none" }} to="/customer/add">
                {" "}
                <Button style={{ background: "#00ADEE", textTransform: "none", color: "#FFF", fontFamily: "sans-serif" }}>Create New</Button>
              </Link>
            </div>
          </div>

        </div>
        {docs && docs.length > 0 ? (
          <div>
            <div className={style.jumbotron}>
              <div
                className="row"
                style={{ margin: "1rem 3rem", fontWeight: "bold", fontFamily: "sans-serif" }}
              >
               <div className="col-11">
               <div className="row">
               <div className="col-3">Name</div>
                <div className="col-2">Phone</div>

                <div className="col-3">Email</div>
              
                <div className="col-2">Jobs</div>
                <div className="col-2">Active Claims</div>
               </div>
               </div>
               {props.user?.role === "admin" && (
                  <div className="col-1">Actions</div>
                )}
              </div>
              <div>
                <ul className="list-group">
                  <div className={`${style.li}`}>
                    {docs.map((doc, i) => {
                      return (
                        
                          <li
                            className={`checkbox list-group-item ${style.list}`}
                            key={doc._id}
                          >
                            <div className="row">
                              <div className="col-11">
                                <Link
                          key={i}
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/customer/detail/${doc._id}`}>
                                <div className="row">
                                <div className={`col-3 ${style.item}`}>
                                <span>
                                  {doc.firstName} {doc.lastName}
                                </span>
                              </div>

                              <div className={`col-2 ${style.item}`}>
                                <p>{doc.phone}</p>
                              </div>
                              <div className={`col-3 ${style.item}`}>
                                <p>{doc.email}</p>
                              </div>
                              <div className={`col-2 ${style.item}`}>
                              
                               
                                <div>
                                  {doc.jobs.length}
                                </div>
                              </div>
                              <div className={`col-2 ${style.item}`} >
                              <div>
                                  {doc.claim?.length > 0 ? <div>
                                    {doc.claim?.filter((claim) => claim.status === "open").length}
                                  </div> : 0 }
                                </div>
                                </div>
                              </div>
                             
                               </Link>
                               
                              </div>
                              {props.user?.role === "admin" && (
                                <div className="col-1">
                                  <Button
                                    onClick={() => removeCustomer(i, doc._id)}
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
                        
                      );
                    })}
                  </div>
                </ul>
              </div>

              <div className={style.jumbotron}>
                <Pagination
                  itemCount={totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}

                />
              </div>
            </div>


          </div>
        ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" />
            </div>
          )}
      </div>
    </div>
  );
};

var mapStateToProps = (state) => ({
 
  customers: state?.customers?.data,

  user: state.users.user,
});

var actions = {
  getAllCustomers,
  deleteCustomer
};

export default connect(mapStateToProps, actions)(CustomerList);
