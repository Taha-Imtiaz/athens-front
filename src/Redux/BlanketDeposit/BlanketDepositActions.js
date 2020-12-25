import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import {
  DELETE_BLANKET_DEPOSIT,
  EDIT_DEPOSIT,
  GET_ALL_DEPOSITS,
} from "./BlanketDepositConstants";

export var getDeposits = (page) => {
  return async (dispatch) => {
    try {
      var deposits = await Axios.post(
        `https://athens-backend.herokuapp.com/api/deposit/all`,
        page
      );
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
    var blanket = await Axios.post(
      `https://athens-backend.herokuapp.com/api/deposit`,
      data
    );
    return blanket;
  } catch (error) {
    console.log(error);
  }
};
export var deleteBlanketDeposit = (id) => {
  return async (dispatch) => {
    try {
      var blanketToDelete = await Axios.delete(
        `https://athens-backend.herokuapp.com/api/deposit/${id}`
      );
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
      console.log(data);
      var blanket = await Axios.put(`https://athens-backend.herokuapp.com/api/deposit`, data);
      dispatch(showMessage(blanket.data.message))
      dispatch({
        type: EDIT_DEPOSIT,
        payload: {
          blanket: blanket,
        },
      });
    } catch (error) {
      console.log(error)
    }
  };
};
