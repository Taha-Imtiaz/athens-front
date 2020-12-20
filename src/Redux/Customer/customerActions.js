// import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER } from "./customerConstants";
// import { UPDATE_JOB } from "../Job/jobConstants"
// import { GET_Customers } from "./userConstants"
import Axios from "../../utils/api";
import { showMessage } from "../../Redux/Common/commonActions";
// var baseUrl = ''
// var baseUrl = 'http://localhost:3000/api/'

export var getAllCustomers = (customersObj) => {
  return async (dispatch) => {
    try {
      var getCustomersList = await Axios.post(
        "user/get-all-customer",
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
      var customer = await Axios.get(`user/get-customer/${customerId}`);
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
    var customer = await Axios.get(`user/get-customer/${customerId}`);
    return customer;
  } catch (error) {
    console.log(error);
  }
};

export var addCustomer = (customerObj, callback) => {
  return async (dispatch) => {
    try {
      var addedCustomer = await Axios.post(
        "user/customer-Registration",
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
      var customerUpdated = await Axios.post(
        "user/update-customer/" + id,
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
    var customerList = await Axios.get("user/get-customer-list");
    return customerList;
  } catch (error) {
    console.log(error);
  }
};
// export var searchCustomer = async (search) => {
//     try {
//         var searedCustomer = await Axios.post("user/get-all-customer")
//         return searedCustomer
//     } catch (error) {
//         console.log(error)
//     }
// }