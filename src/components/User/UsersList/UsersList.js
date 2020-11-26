import React, { useState, useEffect } from "react";
import style from "./UsersList.module.css";
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom";
// import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { getUsers } from "../../../Redux/user/userActions";
import Pagination from "../../Pagination/Pagination";
import SearchBar from "../../SearchBar/SearchBar";

// import { connect } from 'react-redux'
// import { getAllUsers } from '../../../Redux/user/userActions'

const UsersList = (props) => {
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var usersObj = {
    query: "",
    filter: {
      type: "",
    },
    page: currentPage,
  };

  useEffect(() => {
    var { users, getUsers } = props;
    getUsers(usersObj);
  }, []);

  var handlePageChange = (page) => {
    var { users, getUsers } = props;
    var usersObj = {
      query: "",
      filter: {
        type: "",
      },
      page: page,
    };
    getUsers(usersObj);
    setCurrentPage(page);
  };
  const width = window.innerWidth;
  var { users, getUsers } = props;
  var totalCount = users?.users?.total;
  var usersDocs = users?.users?.docs;

  var handleFilter = (name) => {
    var sortUserObj = {
      query: "",
      filter: {
        type: name,
      },
    };
    getUsers(sortUserObj);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      {usersDocs && (
        <div>
          <div className="row">
            <div className="col-3 col-md-3">
              <h3 className={style.head}>Users List</h3>
            </div>
            <div className={`col-4 col-md-6 ${style.search}`}>
              <SearchBar type="user" title="Type name or email" />
            </div>

            <div className={`col-2 col-md-2 d-flex ${style.filter}`}>
              <i
                className="fa fa-filter dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ transform: "translateY(0.2rem)" }}
              ></i>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a
                  className="dropdown-item"
                  onClick={() => handleFilter("mover")}
                >
                  Movers
                </a>
                <a
                  className="dropdown-item"
                  onClick={() => handleFilter("manager")}
                >
                  Managers
                </a>
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className={style.btndel}>
                <Link style={{ textDecoration: "none" }} to="/user/create">
                  {" "}
                  <Button name="Create New" />{" "}
                </Link>
              </div>
            </div> */}
          </div>
          <div className={`d-flex justify-content-end ${style.buttons}`}>
            <div className={` ${style.create}`}>
              <Link style={{ textDecoration: "none" }} to="/user/create">
                {" "}
                {/* <Button name="Create New" />{" "} */}
                <Button style={{ background:"#00ADEE", textTransform:"none", color:"#FFF", fontFamily:"sans-serif"}}>Cteate New</Button>
              </Link>
            </div>
            {/* <Button name="Delete" /> */}
          </div>
          <div className={style.jumbotron}>
            <div className="row" style={{ margin: "0.75rem 0", fontFamily:"sans-serif" }}>
              <div
                className="col-4"
                style={{ transform: "translateX(3rem)", fontWeight: "bold" }}
              >
                Name
              </div>
              <div
                className="col-5"
                style={{ transform: "translateX(5rem)", fontWeight: "bold" }}
              >
                Attribute
              </div>
              <div
                className="col-3"
                style={{ transform: "translateX(4rem)", fontWeight: "bold" }}
              >
                Address
              </div>
            </div>
            <ul className="list-group">
              <div className={style.li}>
                {usersDocs && usersDocs.length > 0 ? (
                  usersDocs.map((usersDoc, i) => {
                    return (
                      <li 
                        key={i}
                        className={`checkbox list-group-item ${style.list}`}
                        style={{
                         
                         
                          // color: "#fff",
                        }}
                      >
                        <div className="row justify-content-around">
                          <div className="col-3 col-md-4 text-left">
                            <b>
                              <span>
                                {/* <input type="checkbox" id="defaultCheck1" value="" /> */}
                                <label
                                  className={`checkbox-inline ${style.input}`}
                                  htmlFor="defaultCheck1"
                                >
                                  {usersDoc.name}
                                </label>
                              </span>
                            </b>
                          </div>
                          <div className="col-5 col-md-4">
                            <label>
                              {usersDoc.attributes.map(
                                (attribute) => attribute.name
                              )}
                            </label>
                          </div>
                          <div className="col-2">
                            <label htmlFor="">{usersDoc.address}</label>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className="text-center">
                    <img src="/images/no-data-found.png" />
                  </div>
                )}
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
      )}
    </div>
  );
};
var mapStateToProps = (state) => ({
  users: state.users,
});
var actions = {
  getUsers,
};
export default connect(mapStateToProps, actions)(UsersList);
