import React, { useState, useEffect } from "react";
import style from "./UserList.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUsers } from "../../../Redux/User/userActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";

const UserList = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState('');

  const { users, getUsers } = props;
  let totalCount = 0;
  if (users) {
    var { docs } = users;
    totalCount = users.total;
  }

  useEffect(() => {
    let usersObj = {
      query: "",
      filter: {
        type: "",
      },
      page: 1
    };
    getUsers(usersObj);
  }, [getUsers]);

  const handlePageChange = (page) => {
    let usersObj = {
      query: "",
      filter: {
        type: "",
      },
      page: page,
    };
    getUsers(usersObj);
    setCurrentPage(page);
  };

  const handleFilter = (e) => {
    let value = e.target.value;
    let sortUserObj = {
      query: "",
      filter: {
        type: value,
      },
      page: 1
    };
    setFilterType(value)
    getUsers(sortUserObj);
    setCurrentPage(1);
  };

  return (
    <div>
      {users && docs && (
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
                  {/* <p
                    className="dropdown-item"
                    onClick={() => handleFilter("mover")}
                  >
                    Movers
                  </p>
                  <p
                    className="dropdown-item"
                    onClick={() => handleFilter("manager")}
                  >
                    Managers
                  </p> */}
                  <RadioGroup
                    aria-label="Filter"
                    name="Filter"
                    value={filterType}
                    onChange={(e) => handleFilter(e)}
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                      className="dropdown-item"
                    />
                    <FormControlLabel
                      value="mover"
                      control={<Radio />}
                      label="Movers"
                      className="dropdown-item"
                    />
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label="Manager"
                      className="dropdown-item"
                    />
                  </RadioGroup>

                </div>
              </div>

              <div className={style.btnStyle}>
                <Link className={style.link} to="/user/add">
                  <Button className={style.btn}>Create New</Button>
                </Link>
              </div>
            </div>
          </div>
          {docs && docs.length > 0 ? (
            <div>
              <div className={style.jumbotron}>
                <div className={style.listheader}>
                  <div>Name</div>
                  <div>Attribute</div>
                  <div>Address</div>
                </div>
              </div>

              <div>
                {docs.map((usersDoc, i) => {
                  return (
                    <div className={style.listContainer} key={i}>
                      <div className={`${style.listContent} `}>
                        <div className={style.userList}>
                          <div className={`${style.item} ${style.flex}`}>
                            {usersDoc.name}
                          </div>
                          <div className={`${style.item} ${style.flex}`}>
                            {usersDoc.attribute}
                          </div>
                          <div className={`${style.item} ${style.flex}`}>
                            {usersDoc.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={style.stylePagination}>
                <div className={style.pagination} >
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
                <img src="/images/no-data-found.png" alt="" />
              </div>
            )}
        </div>
      )}
    </div>
  );
};
var mapStateToProps = (state) => ({
  users: state.users.userList
});
var actions = {
  getUsers
};
export default connect(mapStateToProps, actions)(UserList);
