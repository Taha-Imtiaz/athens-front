import { GET_MOVER, GET_MOVER_JOB_DETAIL, SEARCH_FILTER } from "./moverConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import { LOGGEDIN_USER } from "../User/userConstants";

export const getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const mover = await Axios.post(`mover/jobs`, moversObj, { config: { handlerEnabled: true } });
      dispatch({
        type: GET_MOVER,
        payload: {
          mover: mover.data.data,
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const updateJob = (jobId, status, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put(`job/status/${jobId}`, status);
      if (response.data.status === 200) {
        callback();
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const holidayCalendar = (obj, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`schedule`, obj, { config: { handlerEnabled: true } });
      if (response.data.status === 200) {
        callback(response);
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
}

export const setAvailability = (obj, _id) => {
  return async (dispatch) => {
    try {
      const user = await Axios.put(`mover/${_id}`, obj);
      dispatch({
        type: LOGGEDIN_USER,
        payload: {
          user: user.data.data,
        },
      });
      dispatch(showMessage(user.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const payAmount = (obj, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(`job/payment`, obj);
      if (response.data.status === 200) {
        callback()
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const getMoverJobDetail = (jobId) => {
  return async (dispatch) => {
    try {
      const getJob = await Axios.get(`job/${jobId}`);
      dispatch({
        type: GET_MOVER_JOB_DETAIL,
        payload: {
          getJob: getJob,
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const moverSearchFilter = (searchObj) => {
  return async (dispatch) => {
    try {
      const searchItem = await Axios.post(`mover/search`, searchObj, { config: { handlerEnabled: true } });
      dispatch({
        type: SEARCH_FILTER,
        payload: {
          searchItem: searchItem.data.data,
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};
