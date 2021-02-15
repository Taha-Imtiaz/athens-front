import {
  GET_MOVER,
  GET_MOVER_JOB_DETAIL,
  GET_UPDATED_JOB_LIST,
  SEARCH_FILTER,
} from "./moverConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import { LOGGEDIN_USER } from "../User/userConstants";

export const getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`mover/jobs`, moversObj, {
        config: { handlerEnabled: true },
      });
      dispatch({
        type: GET_MOVER,
        payload: response.data.data.docs,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const updateJob = (jobId, status, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put(`job/status/${jobId}`, status, {
        config: { handlerEnabled: true }
      });
      console.log(response.data.data)
      if (response.data.status === 200) {
       dispatch({
         type:GET_UPDATED_JOB_LIST,
         payload: response.data.data
       })
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const holidayCalendar = (obj, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`schedule`, obj, {
        config: { handlerEnabled: true },
      });
      if (response.data.status === 200) {
        callback(response);
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const setAvailability = (obj, _id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put(`mover/${_id}`, obj, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: LOGGEDIN_USER,
        payload: response.data.data,
      });
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const payAmount = (obj, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`job/payment`, obj, {
        config: { handlerEnabled: true }
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

export const getMoverJobDetail = (jobId) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(`job/${jobId}`, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_MOVER_JOB_DETAIL,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const moverSearchFilter = (searchObj) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`mover/search`, searchObj, {
        config: { handlerEnabled: true },
      });
      console.log(response.data.data);
      dispatch({
        type: SEARCH_FILTER,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};
