import React, { useState } from 'react'
import style from './SearchBar.module.css'
import { connect } from "react-redux";
import { getAllCustomers } from "../../Redux/Customer/customerActions"
import { getAllJobs } from "../../Redux/Job/jobActions"
import { getUsers } from "../../Redux/user/userActions";


const SearchBar = (props) => {
    var { getAllCustomers, getAllJobs, getUsers } = props;

    var title = props.title;
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(e) {
        console.log(e, searchValue, props.type, props.title)
        if (props.type == 'customer') {
            if (searchValue) {
                var fetchCustomersObj = {
                    query: searchValue,
                    sort: {
                        plainname: null,
                        createdAt: null,
                    },
                };
                getAllCustomers(fetchCustomersObj);
            } else {
                var fetchCustomersObj = {
                    query: "",
                    sort: {
                        plainname: null,
                        createdAt: null,
                    },
                };
                getAllCustomers(fetchCustomersObj);
            }
        }
        else if (props.type == 'user') {
            if (searchValue) {
                var usersObj = {
                    query: searchValue,
                    filter:{
                      type:""
                  }
                }
                getUsers(usersObj);
            } else {
                var usersObj = {
                    query: "",
                    filter:{
                        type:""
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
            <input type="text" className="form-control" placeholder={title} onChange={(e) => setSearchValue(e.target.value)} />
            <div className="input-group-append">
                <button onClick={handleSearch} className="btn btn-secondary" type="button">
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