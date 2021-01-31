import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import {
  EDIT_DEPOSIT,
  GET_ALL_DEPOSITS,
} from "./depositConstants";

export const getDeposits = (page) => {
  return async (dispatch) => {
    try {
      let body = {
        page
      }
      let deposits = await Axios.post(`deposit/all`, body);
      dispatch({
        type: GET_ALL_DEPOSITS,
        payload: {
          deposits
        },
      });
    }
    catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const addDeposit = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`deposit`, data);
      if (response.data.status === 200) {
        callback()
      }
      dispatch(showMessage(response.data.message))
    }
    catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const deleteBlanketDeposit = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      let deposits = await Axios.delete(`deposit`, { params: body });
      dispatch({
        type: GET_ALL_DEPOSITS,
        payload: {
          deposits
        },
      });
      dispatch(showMessage(deposits.data.message))
    }
    catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const updateDeposit = (data) => {
  return async (dispatch) => {
    try {
      let response = await Axios.put(`deposit`, data);
      console.log(response)
      dispatch(showMessage(response.data.message));
      dispatch({
        type: EDIT_DEPOSIT,
        payload: {
          response
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

// export const updateDeposit = async (data) => {
//   return async (dispatch) => {
//     try {
//       let blanket = await Axios.put(
//         `deposit`,
//         data
//       );
//       return blanket;
//     } catch (error) { 
//     }
//   }
// };
