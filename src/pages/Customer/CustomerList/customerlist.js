import React, { useEffect } from "react";
import style from "./customerlist.module.css";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteCustomer,
  getAllCustomers,
} from "../../../Redux/Customer/customerActions";
import { useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import { Modal } from "react-bootstrap";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

const CustomerList = (props) => {
  //defining variables
  var { getAllCustomers } = props;
  var { customers } = props;
  if (customers) {
    var { docs } = customers;
  }
  var totalCount = customers?.total;
  //defining state variables
  var [order, setOrder] = useState(-1);
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var [recentlyUpdated, setRecentlyUpdated] = useState(false);
  var [recentlyUpdated, setRecentlyUpdated] = useState(false);
  var [recentlyAdded, setRecentlyAdded] = useState(false);
  var [sortByName, setSortByName] = useState(false);
  var [show, setShow] = useState(false);
  var [customerToDelete, setCustomerToDelete] = useState("");
  var [value, setValue] = useState("recently added");

  //fetch customerList on ComponentDidMount
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

  //fetch/get customers whwn the page is changed
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
      //sort by recently added by default
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

  var removeCustomer = () => {
    //remove customer from the list and database too
    var { deleteCustomer } = props;
    deleteCustomer(customerToDelete, currentPage);
    //close delete modal
    setShow(false);
  };
  //sort the by list by name in ascending/descending order
  var handleSortByName = () => {
    //set the field to true which is selected(set other fields to false too)
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

    getAllCustomers(sortCustomersObj);
  };

  var handleRecentlyAdded = () => {
    //set the field to true which is selected(set other fields to false or null too)
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

  var handleRecentlyUpdated = () => {
    //set the field to true which is selected(set other fields to false or null too)
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

  //show delete modal
  var handleShow = (i, jobId) => {
    // console.log(i);
    //set the customerid of the of customer you want to delete
    setCustomerToDelete(jobId);
    //show the delete modal
    setShow(true);
  };

  //close the delete modal
  var handleClose = () => {
    setShow(false);
  };
  //change Handler of radio buttons
  var handleChange = (e) => {
    setValue(e.target.value);
  };

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
            {/* Dropdown list */}
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLink"
              style={{ margin: "-0.5rem" }}
            >
              {/* Radio buttons */}
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="recently added"
                  control={<Radio />}
                  label="Recently Added"
                  onClick={handleRecentlyAdded}
                />

                <FormControlLabel
                  value="recently updated"
                  control={<Radio />}
                  label="Recently Updated"
                  onClick={handleRecentlyUpdated}
                />
                <FormControlLabel
                  value="sort by name"
                  control={<Radio />}
                  label="Sort By Name"
                  onClick={handleSortByName}
                />
              </RadioGroup>
            </div>
            {/* Create New Button */}
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
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              <div className={style.listheader}>
                <div style={{ padding: "0 0.5rem" }}>Name</div>
                <div style={{ padding: "0 0.5rem" }}>Phone</div>

                <div style={{ padding: "0 0.5rem" }}>Email</div>

                <div style={{ padding: "0 0.5rem" }}>Jobs</div>
                <div style={{ padding: "0 0.5rem" }}>Claims</div>

                {props.user?.role === "admin" && (
                  <div style={{ padding: "0 0.5rem" }}>Actions</div>
                )}
              </div>
            </div>
            <div>
              <div>
                {docs.map((doc, i) => {
                  return (
                    <div className={style.listContainer} key = {i}>
                      <div className={`${style.listContent} `}>
                        <Link
                          key={i}
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          to={`/customer/detail/${doc._id}`}
                          className={style.styleLink}
                        >
                          <div className={`${style.customerList} `}>
                            <div
                              className={`${style.name} ${style.item} ${style.flex}`}
                            >
                              {doc.firstName} {doc.lastName}
                            </div>

                            <div
                              className={`${style.phone} ${style.item} ${style.flex}`}
                            >
                              {doc.phone}
                            </div>
                            <div
                              className={`${style.email} ${style.item} ${style.flex}`}
                            >
                              {doc.email}
                            </div>
                            <div
                              className={`${style.jobs} ${style.item} ${style.flex}`}
                            >
                              <div>{doc.jobs.length}</div>
                            </div>
                            <div
                              className={`${style.activeClaims} ${style.item} ${style.flex}`}
                            >
                              {doc.claim?.length > 0 ? (
                                <div>
                                  {
                                    doc.claim?.filter(
                                      (claim) => claim.status === "open"
                                    ).length
                                  }
                                </div>
                              ) : (
                                0
                              )}
                            </div>
                          </div>
                        </Link>

                        {props.user?.role === "admin" && (
                          <div className={`${style.actions} ${style.flex}`}>
                            <Button
                              onClick={() => handleShow(i, doc._id)}
                              style={{
                                background: "#00ADEE",
                                textTransform: "none",
                                color: "#FFF",
                                fontFamily: "sans-serif",
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
      <Modal show={show} onHide={handleClose} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

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
  customers: state?.customers?.customerList,

  user: state.users.user,
});

var actions = {
  getAllCustomers,
  deleteCustomer,
};

export default connect(mapStateToProps, actions)(CustomerList);
