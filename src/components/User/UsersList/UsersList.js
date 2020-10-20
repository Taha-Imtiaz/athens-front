import React, { useState, useEffect } from "react";
import style from "./UsersList.module.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
// import { Pagination } from "react-bootstrap";
import { connect } from "react-redux";
import { getUsers } from "../../../Redux/user/userActions";
import Pagination from "../../Pagination/Pagination";


// import { connect } from 'react-redux'
// import { getAllUsers } from '../../../Redux/user/userActions'

const UsersList = (props) => {
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  var usersObj = {
    name: "",
    address: "",
    attributes: {
      name: ""
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
    var totalCount = users[0]?.data.user.total
  var usersDocs = users[0]?.data.user.docs 
  console.log(usersDocs)
  return (
    <div>
        {usersDocs &&
        <div>
      <div className="row">
        <div className="col-6">
          <h3 className={style.head}>Users List</h3>
        </div>
        <div className="col-6">
          <div className={style.btndel}>
            <Link style={{ textDecoration: "none" }} to="/user/create">
              {" "}
              <Button name="Create New" />{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className={style.jumbotron}>
        <ul class="list-group">
          <div className={style.li}>
              {usersDocs?.map((usersDoc) => {
                  return  <li class=" checkbox list-group-item">
                  <div className="row justify-content-around">
                    <div className="col-3 col-md-4 text-left">
                      <b>
                        <span>
                          {/* <input type="checkbox" id="defaultCheck1" value="" /> */}
                          <label
                            className={`checkbox-inline ${style.input}`}
                            for="defaultCheck1"
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
