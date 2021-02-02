import { GET_CUSTOMERS, GET_CUSTOMER, DELETE_CUSTOMER } from "./customerConstants";
import Axios from "axios";
import { showMessage } from "../../Redux/Common/commonActions";

export const getAllCustomers = (customersObj) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "customer/all",
        customersObj
      );

      //update app's state
      dispatch({
        type: GET_CUSTOMERS,
        payload:  response.data.data,
        
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getCustomer = (customerId) => {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`customer/details/${customerId}`);
      dispatch({
        type: GET_CUSTOMER,
        payload:  response.data.data,
        
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const addCustomer = (customerObj, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(
        "customer",
        customerObj
      );
      if (response.data.status === 200) {
        callback(response);
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const updateCustomer = (updateCustomerObj, id, callback) => {
  let body = {
    firstName: updateCustomerObj.firstName,
    lastName: updateCustomerObj.lastName,
    email: updateCustomerObj.email,
    phone: updateCustomerObj.phone,
    subContacts: updateCustomerObj.subContacts,
  };
  return async (dispatch) => {
    try {
      let response = await Axios.put(
        "customer/" + id,
        body
      );
      if (response.data.status === 200) {
        callback();
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const deleteCustomer = (id, currentPage) => {

  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      let response = await Axios.delete(`customer`, { params: body })
      if (response.data.status === 200) {
        dispatch({
          type: DELETE_CUSTOMER,
          payload: response.data.data
          
        })
      }
      dispatch(showMessage(response.data.message))
    }
    catch (err) {
      dispatch(showMessage(err.message));
    }
  }
}