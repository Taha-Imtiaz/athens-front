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

import Button from "@material-ui/core/Button";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";

const CustomerList = (props) => {
  //defining variables
  var { getAllCustomers, customers } = props;
  var totalCount = 0;
  if (customers) {
    var { docs } = customers;
    totalCount = customers.total;
  }
  //defining state variables
  var [order, setOrder] = useState(-1);
  var [currentPage, setCurrentPage] = useState(1);
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
  }, [getAllCustomers]);

  //fetch/get customers when the page is changed
  var handlePageChange = (page) => {
    let fetchCustomersOnPageChange;
    if (recentlyUpdated === true) {
      fetchCustomersOnPageChange = {
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
      fetchCustomersOnPageChange = {
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
        fetchCustomersOnPageChange = {
          query: "",
          sort: {
            plainName: 1,
            createdAt: null,
            updatedAt: null,
          },
          page: page,
        };
        setCurrentPage(page);
      } else if (order === -1) {
        fetchCustomersOnPageChange = {
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
      fetchCustomersOnPageChange = {
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
    let sortCustomersObj;
    if (order === 1) {
      setOrder(-1);
      sortCustomersObj = {
        query: "",
        sort: {
          plainName: -1,
          createdAt: null,
          updatedAt: null,
        },
        page: 1,
      };
      setCurrentPage(1);
    } else if (order === -1) {
      setOrder(1);
      sortCustomersObj = {
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
        <div className={`${style.toprow}`}>
          <div className={style.rowContent}>
            <div>
              <h3>Customer List</h3>
            </div>

            <div>
              <SearchBar type="customer" title="Type first name or email" />
            </div>
            <div className={style.filter}>
              <i
                className="fa fa-filter dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></i>
              {/* Dropdown list */}
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
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
                    className="dropdown-item"
                    label="Recently Added"
                    onClick={handleRecentlyAdded}
                  />

                  <FormControlLabel
                    value="recently updated"
                    control={<Radio />}
                    className="dropdown-item"
                    label="Recently Updated"
                    onClick={handleRecentlyUpdated}
                  />
                  <FormControlLabel
                    value="sort by name"
                    control={<Radio />}
                    label="Sort By Name"
                    className="dropdown-item"
                    onClick={handleSortByName}
                  />
                </RadioGroup>
              </div>
            </div>
            {/* Create New Button */}
            <div className={style.btnStyle}>
              <Link to="/customer/add" className={style.link}>
                {" "}
                <Button className={style.btn}>Create New</Button>
              </Link>
            </div>
          </div>
        </div>
        {docs && docs.length > 0 ? (
          <div>
            <div className={` ${style.jumbotron}`}>
              <div className={style.listheader}>
                <div>Name</div>
                <div>Phone</div>

                <div>Email</div>

                <div>Jobs</div>
                <div>Claims</div>

                {props.user && props.user.role === "admin" && (
                  <div>Actions</div>
                )}
              </div>
            </div>
            <div>
              <div>
                {docs.map((doc, i) => {
                  return (
                    <div className={style.listContainer} key={i}>
                      <div className={`${style.listContent} `}>
                        <Link
                          key={i}
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
                              {doc.claim.length > 0 ? (
                                <div>
                                  {
                                    doc.claim.filter(
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

                        {props.user && props.user.role === "admin" && (
                          <div className={`${style.actions} ${style.flex}`}>
                            <Button
                              className={style.deleteButton}
                              onClick={() => handleShow(i, doc._id)}
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
              <div className={style.stylePagination}>
                <div className={style.pagination}>
                  <Pagination
                    itemCount={totalCount}
                    pageSize={10}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" alt="No data found" />
            </div>
          )}
      </div>

      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        type="Customer"
        deleteItem={removeCustomer}
      />
    </div>
  );
};

var mapStateToProps = (state) => ({
  customers: state.customers.customerList,
  user: state.users.user,
});

var actions = {
  getAllCustomers,
  deleteCustomer,
};

export default connect(mapStateToProps, actions)(CustomerList);
