// import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER, DELETE_CUSTOMER } from "./customerConstants";
import Axios from "../../utils/api";
import { showMessage } from "../../Redux/Common/commonActions";

export const getAllCustomers = (customersObj) => {
  return async (dispatch) => {
    try {

      let getCustomersList = await Axios.post(
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
export const getCustomer = (customerId) => {
  return async (dispatch) => {
    try {
      let customer = await Axios.get(`customer/details/${customerId}`);
      dispatch({
        type: GET_CUSTOMER,
        payload: {
          customer: customer
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const addCustomer = (customerObj, callback) => {
  return async (dispatch) => {
    try {
      let addedCustomer = await Axios.post(
        "customer",
        customerObj
      );
      if (addedCustomer.data.status === 200) {
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
      let customerUpdated = await Axios.put(
        "customer/" + id,
        body
      );
      if (customerUpdated.data.status === 200) {
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

export const getCustomerList = async () => {
  try {
    let customerList = await Axios.get("customer");
    return customerList;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCustomer = (id, currentPage) => {

  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      let allCustomersExceptDelete = await Axios.delete(`customer`, { params: body })
      if (allCustomersExceptDelete.data.status === 200) {
        dispatch(showMessage(allCustomersExceptDelete.data.message))
        dispatch({
          type: DELETE_CUSTOMER,
          payload: {
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