import React, { useEffect } from "react";
import style from "./customerlist.module.css";
import SearchBar from "../../SearchBar/SearchBar";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCustomers } from "../../../Redux/Customer/customerActions";
import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faBook } from "@fortawesome/free-solid-svg-icons";
// import "./customerList.mod"

const CustomerList = (props) => {
  var { getAllCustomers } = props;
  var [order, setOrder] = useState(1);
  var fetchCustomersOnPageChange = null;
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var { getAllCustomers } = props;
  var [show, setShow] = useState(false)
  useEffect(() => {
    var fetchCustomersObj = {
      query: "",
      sort: {
        plainname: 1,
        createdAt: null,
      },
      page: 1,
    };
    getAllCustomers(fetchCustomersObj);
  }, [getAllCustomers]);

  var handlePageChange = (page) => {
    var fetchCustomersOnPageChange = {
      query: "",
      sort: {
        plainname: order,
        createdAt: null,
      },
      page: page,
    };
    getAllCustomers(fetchCustomersOnPageChange);
    setCurrentPage(page);
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
    var customerId = docs.map((doc) => doc._id);
  }



  var handleSort = () => {
    if (order == 1) {
      setOrder(-1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainname: -1,
          createdAt: null,
        },
        page: 1,
      };
    } else if (order == -1) {
      setOrder(1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainname: 1,
          createdAt: null,
        },
        page: 1,
      };
    } else {
      setOrder(1);
      var sortCustomersObj = {
        query: "",
        sort: {
          plainname: 1,
          createdAt: null,
        },
        page: 1,
      };
    }
    getAllCustomers(sortCustomersObj);
  };
  var handleDateFilter = () => {
    setOrder(null);
    var sortCustomersObj = {
      query: "",
      sort: {
        plainname: null,
        createdAt: -1,
      },
      page: 1,
    };
    getAllCustomers(sortCustomersObj);
  };

  var handleShow = () => {
    setShow(true)
  };

  var handleClose = () => {

    setShow(false)


  };

  return (
    <div>
      <div>
        <div className={`row justify-content-center ${style.toprow}`}>
          <div className="col-5 col-md-3">
            <b>
              <h3 className={style.head}>Customer List</h3>
            </b>
          </div>

          <div className={`col-5 col-md-6 ${style.search}`}>
            <SearchBar type="customer" title="Type name or email" />
          </div>
          <div className={`col-2 col-md-2 d-flex justify-content-between ${style.filter}`}>
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
              <a className="dropdown-item" onClick={handleSort}>
                Sort By Name
              </a>
              <a className="dropdown-item" onClick={handleDateFilter}>
                Recently Added
              </a>
            </div>
            <div style={{margin: '-0.5rem'}}>
              <Link style={{ textDecoration: "none" }} to="/customer/add">
                {" "}
                <Button name="Create New" />
              </Link>
            </div>
          </div>

        </div>

        {/* <div className={`d-flex justify-content-end ${style.buttons}`}>
        </div> */}
        {docs && docs.length > 0 ? (
          <div>
            <div className={style.jumbotron}>
              <div
                className="row"
                style={{ margin: "1rem 3rem", fontWeight: "bold" }}
              >
                <div className="col-4">Name</div>
                <div className="col-7">Email</div>
                <div className="col-1">Actions</div>
              </div>
              <div>
                <ul className="list-group">
                  <div className={`${style.li}`}>
                    {docs.map((doc) => {
                      return (
                        <li
                          className="checkbox list-group-item"
                          key={doc._id}
                          style={{
                            background: "rgba(0,0,0,.03)",
                            border: "1px solid rgba(0,0,0,0.125)",
                            // color:"#fff"
                          }}
                        >
                          <div className="row justify-content-around">
                            <div
                              className={`col-8 col-md-4 text-left ${style.flex}`}
                            >
                              <span>
                                {/* <input type="checkbox" id="defaultCheck1" value="" />
                            <label
                              className={`checkbox-inline ${style.input}`}
                              htmlFor="defaultCheck1"
                            >
                              {doc.name}
                            </label> */}
                                {doc.firstName} {doc.lastName}
                              </span>
                            </div>
                            <div
                              className={`col-4 col-md-4 d-flex justify-content-start ${style.flex} ${style.fr}`}
                            >
                              <p>{doc.email}</p>
                            </div>
                            <div
                              className={`col-12 col-md-4 d-flex justify-content-end ${style.fr}`}
                            >
                              <div>
                                <Link
                                  style={{ textDecoration: "none" }}
                                  to={`/customer/detail/${doc._id}`}
                                >
                                  {/* <Button
                                    name={width < 576 ? "" : "Details"}
                                    icon="fa fa-info-circle"
                                  /> */}
                                  <FontAwesomeIcon
                                    icon={faInfoCircle}
                                    style={{
                                      transform: "translate3d(-1rem, 0.5rem, 0)",
                                      color: "#000",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center"
                                    }}
                                  />
                                </Link>
                                {/* <FontAwesomeIcon
                                  icon={faBook}
                                  style={{ transform: "translateX(-1rem)" }}
                                  onClick = {handleShow}
                                />
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  animation={false}
                                  centered
                                  
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Add Note</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <textarea
                                      name=""
                                      id=""
                                      cols="65"
                                      rows="5"
                                      // name="Note"
                                      // value={Note}
                                      // onChange={this.handleAddNote}
                                    ></textarea>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <button className = "btn btn-primary"
                                      variant="secondary"
                                      onClick={handleClose}
                                    >
                                      Close
                                    </button>
                                    <button className = "btn btn-primary"
                                      variant="primary"
                                      // onClick={this.AddNote}
                                    >
                                      Add Note
                                    </button>
                                  </Modal.Footer>
                                </Modal> */}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </ul>
              </div>
            </div>

            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
  customers: state.customers.getCustomers,
});

var actions = {
  getAllCustomers,
};

export default connect(mapStateToProps, actions)(CustomerList);
