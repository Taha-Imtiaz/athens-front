import React, { useEffect } from "react";
import style from "./customerlist.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
// import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../../Redux/Customer/customerActions";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faBook,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
// import DeleteConfirmation from "../../DeleteConfirmation/DeleteConfirmation";
// import { setRef } from "@material-ui/core";

const CustomerList = (props) => {
  var { getAllCustomers } = props;
  var [order, setOrder] = useState(-1);
  var fetchCustomersOnPageChange = null;
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [recentlyUpdated, setRecentlyUpdated] = useState(false);
  var [recentlyUpdated, setRecentlyUpdated] = useState(false);
  var [recentlyAdded, setRecentlyAdded] = useState(false);
  var [sortByName, setSortByName] = useState(false);
  var { getAllCustomers } = props;
  var [show, setShow] = useState(false);
  var [modalIndex, setModalIndex] = useState("")
  var [jobToDelete, setJobToDelete] = useState("")
  var [value, setValue] = useState('recently added')

  useEffect(() => {
    var fetchCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: -1,
        updatedAt: null,
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
          updatedAt: -1,
        },
        page: page,
      };
      setCurrentPage(page);
    } else if (recentlyAdded === true) {
      var fetchCustomersOnPageChange = {
        query: "",
        sort: {
          plainName: "",
          createdAt: -1,
          updatedAt: null,
        },
        page: page,
      };
      setCurrentPage(page);
    } else if (sortByName === true) {
      if (order === 1) {
        var fetchCustomersOnPageChange = {
          query: "",
          sort: {
            plainName: 1,
            createdAt: null,
            updatedAt: null,
          },
          page: page,
        };
        setCurrentPage(page);
      } else if (order == -1) {
        var fetchCustomersOnPageChange = {
          query: "",
          sort: {
            plainName: -1,
            createdAt: null,
            updatedAt: null,
          },
          page: page,
        };
        setCurrentPage(page);
      }
    } else {
      var fetchCustomersOnPageChange = {
        query: "",
        sort: {
          plainName: "",
          createdAt: -1,
          updatedAt: null,
        },
        page: page,
      };
      setCurrentPage(page);
    }
    getAllCustomers(fetchCustomersOnPageChange);
  };

  const width = window.innerWidth;

  var { customers } = props;

  var totalCount = customers ?.data.User.total;

  if (customers) {
    var {
      data: {
        User: { docs },
      },
    } = customers;
    // var customerId = docs.map((docs) => docs._id);
  }
  var removeCustomer = () => {
    var { deleteCustomer } = props;
    deleteCustomer(jobToDelete, currentPage);
    setShow(false)
  };
  var handleSort = () => {
    setSortByName(true);
    setRecentlyAdded(false);
    setRecentlyUpdated(false);
    if (order == 1) {
      setOrder(-1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainName: -1,
          createdAt: null,
          updatedAt: null,
        },
        page: 1,
      };
      setCurrentPage(1);
    } else if (order == -1) {
      setOrder(1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainName: 1,
          createdAt: null,
          updatedAt: null,
        },
        page: 1,
      };
      setCurrentPage(1);
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
    setRecentlyAdded(true);
    setRecentlyUpdated(false);
    setSortByName(null);
    var sortCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: -1,
        updatedAt: null,
      },
      page: 1,
    };
    setCurrentPage(1);
    getAllCustomers(sortCustomersObj);
  };

  var handleUpdtedAtFilter = () => {
    setRecentlyUpdated(true);
    setRecentlyAdded(false);
    setSortByName(null);
    var sortCustomersObj = {
      query: "",
      sort: {
        plainName: "",
        createdAt: null,
        updatedAt: -1,
      },
      page: 1,
    };
    setCurrentPage(1);
    getAllCustomers(sortCustomersObj);
  };

  var handleShow = (i, jobId) => {
    console.log(i)
    // setModalIndex(i)
    // if (modalIndex === i)
    //   setShow(true)
    // else
    //   setShow(false)
    setJobToDelete(jobId)
    setShow(true)
  };

  var handleClose = () => {
    setShow(false);
  };
  var handleChange = (e) => {
    setValue(e.target.value)
  }
  var { customers } = props;
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
              {/* <a className="dropdown-item" onClick={handleUpdtedAtFilter}>
                Recently Updated
              </a>
              <a className="dropdown-item" onClick={handleDateFilter}>
                Recently Added
              </a>
              <a className="dropdown-item" onClick={handleSort}>
                Sort By Name
              </a> */}
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="recently added" control={<Radio />} label="Recently Added" onClick={handleDateFilter}/>
      
        <FormControlLabel value="recently updated" control={<Radio />} label="Recently Updated" onClick={handleUpdtedAtFilter}/>
        <FormControlLabel value="sort by name" control={<Radio />} label="Sort By Name" onClick={handleSort}/>
       
      </RadioGroup>
            </div>
            <div style={{ margin: "-0.5rem" }}>
              <Link style={{ textDecoration: "none" }} to="/customer/add">
                {" "}
                <Button
                  style={{
                    background: "#00ADEE",
                    textTransform: "none",
                    color: "#FFF",
                    fontFamily: "sans-serif",
                  }}
                >
                  Create New
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {docs && docs.length > 0 ? (
          <div>
           
              <div
                className={` ${style.jumbotron}`}
                style={{
                  // margin: "1rem 1rem",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                }}
              >
               <div className = {style.listheader}>
                    <div >Name</div>
                    <div >Phone</div>

                    <div >Email</div>

                    <div >Jobs</div>
                    <div >Claims</div>
                 
                {props.user ?.role === "admin" && (
                  <div >Actions</div>
                )}
              </div>
              </div>
              <div>
                {/* <ul> */}
                  <div  >
                    {docs.map((doc, i) => {
                      return (
                       <div className = {style.listContainer}>
                          <div className ={`${style.listContent} `}>
                            
                            
                              <Link
                                key={i}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                                to={`/customer/detail/${doc._id}`}
                                className = {style.styleLink}
                              >
                                <div className ={`${style.customerList} `}>
                                 {/* <li 
                          className={`checkbox list-group-item `}
                          key={doc._id}
                        > */}
                               
                                  <div className={`${style.name} ${style.item} ${style.flex}`}>
                                   
                                      {doc.firstName} {doc.lastName}
                                    
                                  </div>

                                  <div className={`${style.phone} ${style.item} ${style.flex}`}>
                                    {doc.phone}
                                  </div>
                                  <div className={`${style.email} ${style.item} ${style.flex}`}>
                                    {doc.email}
                                  </div>
                                  <div className={`${style.jobs} ${style.item} ${style.flex}`}>
                                    <div>{doc.jobs.length}</div>
                                  </div>
                                  <div className={`${style.activeClaims} ${style.item} ${style.flex}`}>
                                   
                                      {doc.claim ?.length > 0 ? (
                                        <div>
                                          {
                                            doc.claim ?.filter(
                                              (claim) => claim.status === "open"
                                            ).length
                                          }
                                        </div>
                                      ) : (
                                          0
                                        )}
                                   
                                 
                                </div>
                                 {/* </li> */} 
                                 </div>
                              </Link>
                         
                            {props.user ?.role === "admin" && (
                             
                                <div className ={`${style.actions} ${style.flex}`}>
                                  <Button
                                    onClick={() => handleShow(i, doc._id)}
                                    /*onClick={() => removeCustomer(i, doc._id)}*/
                                    style={{
                                      background: "#00ADEE",
                                      textTransform: "none",
                                      color: "#FFF",
                                      fontFamily: "sans-serif",
                                      // width: "100%",
                                      // padding:"0.66rem 0rem",
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
        {/* <Modal.Body>Are You sure you want to delete Customer with id {doc._id}</Modal.Body> */}
        <Modal.Body>Are you sure you want to delete Customer?</Modal.Body>
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
              onClick={() => removeCustomer()}
            >Confirm</Button>
            <Button
              style={{
                background: "#00ADEE",
                textTransform: "none",
                color: "#FFF",
                fontFamily: "sans-serif",
                width: "100%",
              }}
              onClick={handleClose}>Cancel</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

var mapStateToProps = (state) => ({
  customers: state ?.customers.customers,

  user: state.users.user,
});

var actions = {
  getAllCustomers,
  deleteCustomer,
};

export default connect(mapStateToProps, actions)(CustomerList);
