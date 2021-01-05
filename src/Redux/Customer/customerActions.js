// import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, DELETE_CLAIM } from "./customerConstants";
// import { UPDATE_JOB } from "../Job/jobConstants"
// import { GET_Customers } from "./userConstants"
import Axios from "../../utils/api";
import { showMessage } from "../../Redux/Common/commonActions";
// var baseUrl = ''
// var baseUrl = 'http://localhost:3000/api/'

export var getAllCustomers = (customersObj) => {
  return async (dispatch) => {
    try {
      console.log("get customers called")
      var getCustomersList = await Axios.post(
        "customer/all",
        customersObj
      );
      
      //update app's state
      dispatch({
        type: GET_CUSTOMERS,
        payload: {
          customers: getCustomersList,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export var getCustomer = (customerId) => {
  return async (dispatch) => {
    try {
      var customer = await Axios.get(`customer/details/${customerId}`);
      dispatch({
        type: GET_CUSTOMER,
        payload: {
          customer: customer,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//this function is same as getCustomer

export var fetchCustomerById = async (customerId) => {
  try {
    var customer = await Axios.get(`customer/details/${customerId}`);
    return customer;
  } catch (error) {
    console.log(error);
  }
};

export var addCustomer = (customerObj, callback) => {
  return async (dispatch) => {
    try {
      var addedCustomer = await Axios.post(
        "customer",
        customerObj
      );
      if (addedCustomer.data.status == 200) {
        callback(addedCustomer);
        dispatch(showMessage(addedCustomer.data.message));
      } else {
        dispatch(showMessage(addedCustomer.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export var updateCustomer = (updateCustomerObj, id, callback) => {
  var body = {
    firstName: updateCustomerObj.firstName,
    lastName: updateCustomerObj.lastName,
    email: updateCustomerObj.email,
    phone: updateCustomerObj.phone,
    subContacts: updateCustomerObj.subContacts,
  };
  console.log(body);
  return async (dispatch) => {
    try {
      var customerUpdated = await Axios.put(
        "customer/" + id,
        body
      );
      console.log(customerUpdated);
      if (customerUpdated.data.status == 200) {
        callback();
        dispatch(showMessage(customerUpdated.data.message));
      } else {
        dispatch(showMessage(customerUpdated.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export var getCustomerList = async () => {
  try {
    var customerList = await Axios.get("customer");
    return customerList;
  } catch (error) {
    console.log(error);
  }
};
export var deleteCustomer = (id, currentPage) => {
  var body = {
    page:currentPage
  }
  return async (dispatch) => {
   try {
    var allCustomersExceptDelete = await Axios.delete(`customer/${id}`, body)
    if (allCustomersExceptDelete.data.status == 200) {
      dispatch(showMessage(allCustomersExceptDelete.data.message))
    dispatch({
      type: DELETE_CLAIM,
      payload:{
        allCustomersExceptDelete: allCustomersExceptDelete
      }
    })
   } 
  }
   catch (error) {
     console.log(error)
   }
  }
}