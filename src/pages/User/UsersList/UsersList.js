import React, { useState, useEffect } from "react";
import style from "./UsersList.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUsers } from "../../../Redux/User/userActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";

const UsersList = (props) => {
  var [currentPage, setCurrentPage] = useState(1);
  var usersObj = {
    query: "",
    filter: {
      type: "",
    },
    page: currentPage,
  };

  useEffect(() => {
    var {  getUsers } = props;
    getUsers(usersObj);
  }, []);

  var handlePageChange = (page) => {
    var {  getUsers } = props;
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
 
  var { users, getUsers } = props;
  var totalCount = users?.total;
  var usersDocs = users?.docs;

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
    <div>
      {usersDocs && (
        <div>
          <div className={`${style.toprow}`}>
            <div className={style.rowContent}>
              <div>
                <h3>Users List</h3>
              </div>

              <div>
                <SearchBar type="user" title="Type name or email" />
              </div>

              <div className={`${style.filter}`}>
                <i
                  className="fa fa-filter dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></i>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <a href="/#"
                    className="dropdown-item"
                    onClick={() => handleFilter("mover")}
                  >
                    Movers
                  </a>
                  <a href="/#"
                    className="dropdown-item"
                    onClick={() => handleFilter("manager")}
                  >
                    Managers
                  </a>
                </div>
              </div>

              <div className={style.btnStyle}>
                <Link className={style.link} to="/user/add">
                  {" "}
                  {/* <Button name="Create New" />{" "} */}
                  <Button className={style.btn}>Create New</Button>
                </Link>
              </div>
            </div>
          </div>
          {usersDocs.length > 0 ? (
            <div>
              <div className={style.jumbotron}>
                <div className={style.listheader}>
                  <div>Name</div>
                  <div>Attribute</div>
                  <div>Address</div>
                </div>
              </div>

              <div>
                {usersDocs && usersDocs.length > 0
                  ? usersDocs.map((usersDoc, i) => {
                      return (
                        <div className={style.listContainer} key={i}>
                          <div className={`${style.listContent} `}>
                            <div className={style.userList}>
                              <div className={`${style.item} ${style.flex}`}>
                                {usersDoc.name}
                              </div>
                              <div className={`${style.item} ${style.flex}`}>
                                {usersDoc.attributes.map(
                                  (attribute) => attribute.name
                                )}
                              </div>
                              <div className={`${style.item} ${style.flex}`}>
                                {usersDoc.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>

              <div className={style.stylePagination}>
               <div className = {style.pagination} >
                <Pagination
                itemCount={totalCount}
                pageSize={10}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
              </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <img src="/images/no-data-found.png" alt = "" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
var mapStateToProps = (state) => ({
  users: state.users?.userList,
});
var actions = {
  getUsers,
};
export default connect(mapStateToProps, actions)(UsersList);
