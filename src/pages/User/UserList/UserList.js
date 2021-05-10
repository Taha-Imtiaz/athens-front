import React, { useState, useEffect } from "react";
import style from "./UserList.module.css";
import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUsers, deleteUser } from "../../../Redux/User/userActions";
import Pagination from "../../../components/Pagination/Pagination";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Confirmation from "../../../components/Confirmation/Confirmation";

const UserList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState("");
  const [show, setShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState("")

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
      page: 1,
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
      page: 1,
    };
    setFilterType(value);
    getUsers(sortUserObj);
    setCurrentPage(1);
  };
  //show delete modal
  const handleShow = (i, jobId) => {
    //set the customerid of the of customer you want to delete
    setUserToDelete(jobId);
    //show the delete modal
    setShow(true);
  };
  // remove user
  const removeUser = () => {
    let { deleteUser } = props;
    deleteUser(userToDelete, currentPage)
    setShow(false)
  }
  //close the delete modal
  const handleClose = () => {
    setShow(false);
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
              {/* <div className={style.jumbotron}>
                <div className={style.listheader}>
                  <div>Name</div>
                  <div>Attribute</div>
                  <div>Address</div>
                </div>
              </div> */}

              <div>
                {docs.map((usersDoc, i) => {
                  return (
                    <div className={style.listContainer} key={i}>
                      <div className={`${style.listContent} `}>
                        <Link
                          to={`/user/update/${usersDoc._id}`}
                          key={i}
                          className={style.styleLink}
                        >
                          <div className={style.userList}>

                            <div className={`${style.item} ${style.flex}`}>
                              <div className={`text-muted ${style.listTitle}`}>
                                Name:
                              </div>
                              <div className={style.listDetail}>
                                {usersDoc.name}
                              </div>
                            </div>
                            <div className={`${style.item} ${style.flex}`}>
                              <div className={`text-muted ${style.listTitle}`}>
                                Attribute:
                              </div>
                              <div className={style.listDetail}>
                                {usersDoc.attribute}
                              </div>
                            </div>
                            <div className={`${style.item} ${style.flex}`}>
                              <div className={`text-muted ${style.listTitle}`}>
                                Address:
                              </div>
                              <div className={style.listDetail}>
                                {usersDoc.address}
                              </div>
                            </div>


                          </div>
                        </Link>
                        {usersDoc.role !== "admin" && <div className={`${style.deleteBtn}`}>
                          <Button
                            className={style.deleteButton}
                            onClick={() => handleShow(i, usersDoc._id)}
                          >
                            Delete
                                </Button>
                        </div>}
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
              <Confirmation
                show={show}
                handleClose={handleClose}
                type="delete user"
                action={removeUser}
              />
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
  users: state.users.userList,
});
var actions = {
  getUsers,
  deleteUser,
};
export default connect(mapStateToProps, actions)(UserList);
