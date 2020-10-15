import React, { useEffect } from "react";
import style from "./customerList.module.css";
import SearchBar from "../../SearchBar/SearchBar";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllCustomers } from "../../../Redux/Customer/customerActions";
import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import _ from "lodash";

const CustomerList = (props) => {
  var { getAllCustomers } = props;
  var [order,setOrder ]= useState(1)
  var fetchCustomersOnPageChange = null;
  var [pageSize, setPageSize] = useState(10);
  var [currentPage, setCurrentPage] = useState(1);
  console.log('Helo')
  var { getAllCustomers } = props;

  useEffect(() => {

    var fetchCustomersObj = {
      query: "",
      sort: {
       plainname: 1,
        createdAt: null,
      },
      page: 1,
    };
    getAllCustomers(fetchCustomersObj);
  }, [getAllCustomers]);

  var handlePageChange = (page) => {

  
    var fetchCustomersOnPageChange = {
      query: "",
      sort: {
       plainname: order,
        createdAt: null,
      },
      page: page,
    };
    getAllCustomers(fetchCustomersOnPageChange)
    setCurrentPage(page);
  };

  const width = window.innerWidth;

  var { customers } = props;
  console.log(customers)

var totalCount = customers?.data.User.total
console.log(totalCount)

  if (customers) {
    var {
      data: {
        User: { docs },
      },
    } = customers;
    var customerId = docs.map((doc) => doc._id);
  }

 var handleSort = () => {
   console.log("hsc", order)
  
   if(order == 1){
     console.log('1')
    // order = -1
    setOrder(-1)
   var sortCustomersObj = {
    query: "",
    sort: {
     plainname: -1,
      createdAt: null,
    },
    page: 1,
  };
}
  else   {
    console.log('-1')

    setOrder(1)
    console.log(order)
    var sortCustomersObj = {
      query: "",
      sort: {
        name: 1,
        createdAt: null,
      },
      page: 1,
    };
  }
  console.log(sortCustomersObj)
  getAllCustomers(sortCustomersObj)
  // console.log(sortCustomersObj)
 }

  return (
    <div>
      {customers ? (
        <div>
          <div className={`row justify-content-center ${style.toprow}`}>
            <div className="col-5 col-md-3">
              <b>
                <h3 className={style.head}>Customer List</h3>
              </b>
            </div>

            <div className={`col-5 col-md-6 ${style.search}`}>
              <SearchBar />
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
                <a className="dropdown-item"  onClick= {handleSort}>
                  Name
                </a>
                <a className="dropdown-item">
                  Date
                </a>
              </div>
            </div>
          </div>

          <div className={`d-flex justify-content-end ${style.buttons}`}>
            <div className={` ${style.create}`}>
              <Link style={{ textDecoration: "none" }} to="/customer/add">
                {" "}
                <Button name="Create New" />
              </Link>
            </div>
            <Button name="Delete" />
          </div>

          <div className={style.jumbotron}>
            <div>
              <ul className="list-group">
                <div className={`${style.li}`}>
                  {docs.map((doc) => {
                    return (
                      <li className=" checkbox list-group-item" key={doc._id}>
                        <div className="row justify-content-around">
                          <div
                            className={`col-8 col-md-4 text-left ${style.flex}`}
                          >
                            <span>
                              {/* <input type="checkbox" id="defaultCheck1" value="" />
                            <label
                              className={`checkbox-inline ${style.input}`}
                              htmlFor="defaultCheck1"
                            >
                              {doc.name}
                            </label> */}
                              {doc.name}
                            </span>
                          </div>
                          <div
                            className={`col-4 col-md-4 d-flex justify-content-start ${style.flex} ${style.fr}`}
                          >
                            <p>{doc.email}</p>
                          </div>
                          <div
                            className={`col-12 col-md-4 d-flex justify-content-end ${style.fr}`}
                          >
                           
                            <div className={style.button}>
                              <Link
                                style={{ textDecoration: "none" }}
                                to={`/customer/detail/${doc._id}`}
                              >
                                <Button
                                  name={width < 576 ? "" : "Details"}
                                  icon="fa fa-info-circle"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </div>
              </ul>

            </div>
          </div>
                  
              <Pagination 
                itemCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
        </div>
      ) : null}
    </div>
  );
};

var mapStateToProps = (state) => ({
  customers: state.customers.getCustomers,
});

var actions = {
  getAllCustomers,
};

export default connect(mapStateToProps, actions)(CustomerList);
