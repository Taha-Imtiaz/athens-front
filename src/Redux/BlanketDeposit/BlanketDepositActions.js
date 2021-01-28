// import Axios from "axios";
import Axios from "../../utils/api";
import { showMessage } from "../Common/commonActions";
import {
  DELETE_BLANKET_DEPOSIT,
  EDIT_DEPOSIT,
  GET_ALL_DEPOSITS,
} from "./BlanketDepositConstants";

export var getDeposits = (page) => {
  return async (dispatch) => {
    try {
      let body = {
        page
      }
      var deposits = await Axios.post(`deposit/all`, body);
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

export var addDeposit = async (data) => {
  try {
    var blanket = await Axios.post(`deposit`, data);
    return blanket;
  } catch (error) {
    console.log(error);
  }
};
export var deleteBlanketDeposit = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      var blanketToDelete = await Axios.delete(`deposit`, { params: body });
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
export var updateDeposit = (data) => {
  return async (dispatch) => {
    try {
      var blanket = await Axios.put(`deposit`, data);
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
