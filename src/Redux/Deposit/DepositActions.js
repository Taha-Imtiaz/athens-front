import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import { GET_ALL_DEPOSITS, GET_DEPOSIT } from "./DepositConstants";

export const getDeposits = (body) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`deposit/all`, body, {
        config: { handlerEnabled: true },
      });
      dispatch({
        type: GET_ALL_DEPOSITS,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getDeposit = (id) => {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`deposit/${id}`, {
        config: { handlerEnabled: true },
      });
      dispatch({
        type: GET_DEPOSIT,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const addDeposit = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`deposit`, data, {
        config: { handlerEnabled: true },
      });
      if (response.data.status === 200) {
        callback();
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const deleteBlanketDeposit = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id,
      };
      let response = await Axios.delete(`deposit`, {
        params: body,
        config: {
          handlerEnabled: true,
        },
      });
      dispatch({
        type: GET_ALL_DEPOSITS,
        payload: response.data.data,
      });
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const updateDeposit = (data) => {
  return async (dispatch) => {
    try {
      let response = await Axios.put(`deposit`, data, {
        config: { handlerEnabled: true }
      });
      dispatch(showMessage(response.data.message));
      dispatch({
        type: GET_DEPOSIT,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

