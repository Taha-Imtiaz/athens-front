// import Axios from "axios";
import Axios from "../../utils/api";
import { showMessage } from "../Common/commonActions";
import {
  DELETE_BLANKET_DEPOSIT,
  EDIT_DEPOSIT,
  GET_ALL_DEPOSITS,
} from "./BlanketDepositConstants";

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
          deposits: deposits,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addDeposit = async (data) => {
  try {
    let blanket = await Axios.post(`deposit`, data);
    return blanket;
  } catch (error) {
    console.log(error);
  }
};
export const deleteBlanketDeposit = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      let blanketToDelete = await Axios.delete(`deposit`, { params: body });
      dispatch(showMessage(blanketToDelete.data.message));
      dispatch({
        type: DELETE_BLANKET_DEPOSIT,
        payload: {
          blanketToDelete: blanketToDelete,
        },
      });
      // return blanketToDelete
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateDeposit = (data) => {
  return async (dispatch) => {
    try {
      let blanket = await Axios.put(`deposit`, data);
      dispatch(showMessage(blanket.data.message));
      dispatch({
        type: EDIT_DEPOSIT,
        payload: {
          blanket: blanket,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
