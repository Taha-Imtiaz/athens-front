import React, { useState, useEffect } from "react";
import style from "./UsersList.module.css";
import Button from "../../Button/Button";
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
      type: ""
    }
  };

  useEffect(() => {
    var { users, getUsers } = props;
    getUsers(usersObj);
  }, []);

  var handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const width = window.innerWidth;
  var { users, getUsers } = props;
  var totalCount = users[0] ?.data.users.total
  var usersDocs = users[0] ?.data.users.docs 

  var handleFilter = (name) => {
    var sortUserObj = {
      query: "",
      filter: {
        type: name
      }
    };
    getUsers(sortUserObj)
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {usersDocs &&
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
              ></i>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" onClick={() => handleFilter('movers')}>
                  Movers
                </a>
                <a className="dropdown-item" onClick={() => handleFilter('managers')}>
                  Managers
                </a>
              </div>
            </div>
            <div className="col-3">
              <div className={style.btndel}>
                <Link style={{ textDecoration: "none" }} to="/user/create">
                  {" "}
                  <Button name="Create New" />{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className={style.jumbotron}>
            <ul className="list-group">
              <div className={style.li}>
                {usersDocs ?.map((usersDoc, i) => {
                  return <li key={i} className=" checkbox list-group-item">
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
                        <label>{usersDoc.attributes.map((attribute) => attribute.name)}</label>
                      </div>
                      <div className="col-2">
                        <label htmlFor="">{usersDoc.address}</label>
                      </div>

                    </div>
                  </li>
                })}

              </div>
            </ul>
          </div>

          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      }
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
