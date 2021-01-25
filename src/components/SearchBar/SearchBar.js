import React, { useState } from "react";
import style from "./SearchBar.module.css";
import { connect } from "react-redux";
import { getAllCustomers } from "../../Redux/Customer/customerActions";
import { getAllJobs } from "../../Redux/Job/jobActions";
import { getUsers } from "../../Redux/User/userActions";
import { getMover, moverSearchFilter } from "../../Redux/Mover/moverActions";
import { getAllClaims } from "../../Redux/Claims/claimsActions";

const SearchBar = (props) => {
  var {
    getAllCustomers,
    getAllJobs,
    getUsers,
    moverSearchFilter,
    getAllClaims,
  } = props;

  var title = props.title;
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    if (props.type === "customer") {
      if (searchValue === "" || searchValue) {
        var fetchCustomersObj = {
          query: e.target.value,
          sort: {
            plainname: null,
            createdAt: null,
            updatedAt: null,
          },
        };
        getAllCustomers(fetchCustomersObj);
      } else {
        var fetchCustomersObj = {
          query: "",
          sort: {
            plainname: null,
            createdAt: -1,
            updatedAt: null,
          },
        };
        getAllCustomers(fetchCustomersObj);
      }
    } else if (props.type === "user") {
      if (searchValue === "" || searchValue) {
        var usersObj = {
          query: e.target.value,
          filter: {
            type: "",
          },
        };
        getUsers(usersObj);
      } else {
        var usersObj = {
          query: "",
          filter: {
            type: "",
          },
        };
        getUsers(usersObj);
      }
    } else if (props.type === "claims") {
      if (searchValue === "" || searchValue) {
        var usersObj = {
          query: e.target.value,
          status: props.claimStatus,
          page: 1,
        };
        getAllClaims(usersObj);
      } else {
        var usersObj = {
          query: "",
          status: props.claimStatus,
          page: 1,
        };
        getAllClaims(usersObj);
      }
    } else if (props.type === "mover") {
      if (searchValue === "" || searchValue) {
        var fetchJobsOnPageChange = {
          query: e.target.value,

          page: 1,
        };
      } else {
        var fetchJobsOnPageChange = {
          query: "",
          page: 1,
        };
      }
      moverSearchFilter(fetchJobsOnPageChange);
    } else {
      if (searchValue === "" || searchValue) {
        var fetchJobsOnPageChange = {
          query: e.target.value,
          filters: {
            startDate: "",
            endDate: "",
            movedDate: "",
            tag: "",
            startYearMonth: "",
          },
          sort: {
            createdAt: -1,
          },
          page: 1,
        };
      } else {
        var fetchJobsOnPageChange = {
          query: "",
          filters: {
            startDate: "",
            endDate: "",
            movedDate: "",
            tag: "",
            startYearMonth: "",
          },
          sort: {
            createdAt: -1,
          },
          page: 1,
        };
      }
      getAllJobs(fetchJobsOnPageChange);
    }
  }

  var handleKeyPress = (e) => {
    e.preventDefault();
    if (e.which === 13) {
      handleSearch(e);
    }
  };

  return (
    <div >
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearch(e);
          }}
          onKeyUp={(e) => handleKeyPress(e)}
        />
        <div className="input-group-append">
          <button
            // onClick={handleSearch}
            className="btn btn-secondary"
            type="button"
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

var mapStateToProps = (state) => ({
  customers: state.customers,
  jobs: state.jobs,
  users: state.users,
});

var actions = {
  getAllCustomers,
  getAllJobs,
  getUsers,
  moverSearchFilter,
  getAllClaims,
};
export default connect(mapStateToProps, actions)(SearchBar);
