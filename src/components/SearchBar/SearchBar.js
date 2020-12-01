import React, { useState } from 'react'
import style from './SearchBar.module.css'
import { connect } from "react-redux";
import { getAllCustomers } from "../../Redux/Customer/customerActions"
import { getAllJobs } from "../../Redux/Job/jobActions"
import { getUsers } from "../../Redux/User/userActions";


const SearchBar = (props) => {
    var { getAllCustomers, getAllJobs, getUsers } = props;

    var title = props.title;
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(e) {
        if (props.type == 'customer') {
            if (searchValue) {
                var fetchCustomersObj = {
                    query: searchValue,
                    sort: {
                        plainname: null,
                        createdAt: null,
                        updatedAt: null

                    },
                };
                getAllCustomers(fetchCustomersObj);
            } else {
                var fetchCustomersObj = {
                    query: "",
                    sort: {
                        plainname: null,
                        createdAt: -1,
                        updatedAt: null
                    },
                };
                getAllCustomers(fetchCustomersObj);
            }
        }
        else if (props.type == 'user') {
            if (searchValue) {
                var usersObj = {
                    query: searchValue,
                    filter: {
                        type: ""
                    }
                }
                getUsers(usersObj);
            } else {
                var usersObj = {
                    query: "",
                    filter: {
                        type: ""
                    }
                };
                getUsers(usersObj);
            }
        }
        else {
            if (searchValue) {
                var fetchJobsOnPageChange = {
                    query: searchValue,
                    filters: {
                        startDate: "",
                        endDate: "",
                        movedDate: "",
                        tag: "",
                        startYearMonth: ""
                    },
                    sort: {
                        createdAt: -1
                    },
                    page: 1
                }
            } else {
                var fetchJobsOnPageChange = {
                    query: '',
                    filters: {
                        startDate: "",
                        endDate: "",
                        movedDate: "",
                        tag: "",
                        startYearMonth: ""
                    },
                    sort: {
                        createdAt: -1
                    },
                    page: 1
                }
            }
            getAllJobs(fetchJobsOnPageChange)
        }

    }

  var handleKeyPress = (e) => {
        console.log(e.key)
        console.log("Enter")
        e.preventDefault()
        if(e.which === 13) {
            handleSearch()
        }

    }

    return <div className={style.width}>
        {/* <div className="input-group">
            <input className="form-control py-2 rounded-pill mr-1 pr-5" type="search" placeholder="Type name or email" onChange={(e) => setSearchValue(e.target.value)} />
            <span className="input-group-append">
                <button onClick={handleSearch} className="btn rounded-pill border-0 ml-n5" type="button">
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div> */}
        <div className="input-group">
            <input type="text" className="form-control" placeholder={title} style={{ outline: "transparent" }} onChange={(e) => setSearchValue(e.target.value)} onKeyUp = {(e) => handleKeyPress(e)} />
            <div className="input-group-append">
                <button onClick={handleSearch}  className="btn btn-secondary" style={{ width: "3rem" }} type="button">
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    </div>
}

var mapStateToProps = (state) => ({
    customers: state.customers.getCustomers,
    jobs: state.jobs.getJobs,
    users: state.users.getUsers

});

var actions = {
    getAllCustomers,
    getAllJobs,
    getUsers
};
export default connect(mapStateToProps, actions)(SearchBar);