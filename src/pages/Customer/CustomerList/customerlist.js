import React, { useEffect } from "react";
import style from "./CustomerList.module.css";
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
import { Chip, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Confirmation from "../../../components/Confirmation/Confirmation";

const CustomerList = (props) => {
  //defining variables
  let { getAllCustomers, customers } = props;
  let totalCount = 0;
  if (customers) {
    var { docs } = customers;
    totalCount = customers.total;
  }
  //defining state variables
  const [order, setOrder] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentlyUpdated, setRecentlyUpdated] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [show, setShow] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState("");
  const [value, setValue] = useState("recently added");

  //fetch customerList on ComponentDidMount
  useEffect(() => {
    let fetchCustomersObj = {
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
  const handlePageChange = (page) => {
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

  const removeCustomer = () => {
    //remove customer from the list and database too
    let { deleteCustomer } = props;
    deleteCustomer(customerToDelete, currentPage);
    //close delete modal
    setShow(false);
  };
  //sort the by list by name in ascending/descending order
  const handleSortByName = () => {
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

  const handleRecentlyAdded = () => {
    //set the field to true which is selected(set other fields to false or null too)
    setRecentlyAdded(true);
    setRecentlyUpdated(false);
    setSortByName(null);
    let sortCustomersObj = {
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

  const handleRecentlyUpdated = () => {
    //set the field to true which is selected(set other fields to false or null too)
    setRecentlyUpdated(true);
    setRecentlyAdded(false);
    setSortByName(null);
    let sortCustomersObj = {
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
  const handleShow = (i, jobId) => {
    //set the customerid of the of customer you want to delete
    setCustomerToDelete(jobId);
    //show the delete modal
    setShow(true);
  };

  //close the delete modal
  const handleClose = () => {
    setShow(false);
  };
  //change Handler of radio buttons
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {/* <BackButton/> */}
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
            <div className={` ${style.jumbotron}`}></div>
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
                              <div
                                className={`text-muted ${style.heading}`}
                              >{`Name:`}</div>
                              <div
                                className={`text-capitalize ${style.headingSub}`}
                              >
                                {doc.firstName} {doc.lastName}
                              </div>
                            </div>

                            <div
                              className={`${style.phone} ${style.item} ${style.flex}`}
                            >
                              <div
                                className={`text-muted ${style.heading}`}
                              >{`Phone:`}</div>
                              <div className={`${style.headingSub}`}>
                                {doc.phone}
                              </div>
                            </div>
                            <div
                              className={`${style.email} ${style.item} ${style.flex}`}
                            >
                              <div
                                className={`text-muted ${style.heading}`}
                              >{`E-mail:`}</div>
                              <div className={`${style.headingSub}`}>
                                {doc.email}
                              </div>
                            </div>
                            <div
                              className={`${style.jobs} ${style.item} ${style.flex}`}
                            >
                              <div
                                className={`text-muted ${style.heading}`}
                              >{`Jobs:`}</div>
                              <div className={`${style.headingSub}`}>
                                <Chip label={doc.jobs.length} />
                              </div>
                            </div>
                            <div
                              className={`${style.activeClaims} ${style.item} ${style.flex}`}
                            >
                              <div
                                className={`text-muted ${style.heading}`}
                              >{`Claims:`}</div>
                              <div className={style.headingSub}>
                                <Chip
                                  label={
                                    doc.claim.length > 0 ? (
                                      <div>
                                        {
                                          doc.claim.filter(
                                            (claim) => claim.status === "open"
                                          ).length
                                        }
                                      </div>
                                    ) : (
                                      0
                                    )
                                  }
                                />
                              </div>
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
        ) : docs && docs.length === 0 ? (
          <div className="text-center">
            <img src="/images/no-data-found.png" alt="No data found" />
          </div>
        ) : null}
      </div>

      <Confirmation
        show={show}
        handleClose={handleClose}
        type="delete customer"
        action={removeCustomer}
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
