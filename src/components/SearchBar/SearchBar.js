import React, { useState } from 'react'
import style from './SearchBar.module.css'
import { connect } from "react-redux";
import { getAllCustomers } from "../../Redux/Customer/customerActions"

const SearchBar = (props) => {
    var { getAllCustomers } = props;
    const [searchValue, setSearchValue] = useState('');

    function handleSearch(e) {
        if (searchValue) {
            var fetchCustomersObj = {
                query: searchValue,
                sort: {
                    name: null,
                    createdAt: null,
                },
            };
            getAllCustomers(fetchCustomersObj);
        } else {
            var fetchCustomersObj = {
                query: "",
                sort: {
                    name: null,
                    createdAt: null,
                },
            };
            getAllCustomers(fetchCustomersObj);
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
            <input type="text" className="form-control" placeholder="Type name or email" onChange={(e) => setSearchValue(e.target.value)} />
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
});

var actions = {
    getAllCustomers,
};
export default connect(mapStateToProps, actions)(SearchBar);