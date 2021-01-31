import {
  GET_MOVER,
  GET_MOVER_JOB_DETAIL,
  SEARCH_FILTER,
} from "./moverConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";
import { LOGGEDIN_USER } from "../User/userConstants";

export const getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const mover = await Axios.post(`mover/jobs`, moversObj, { config: { handlerEnabled: true } });
      console.log(mover);
      dispatch({
        type: GET_MOVER,
        payload: {
          mover: mover.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateJob = async (jobId, status) => {
  try {
    const updatedJob = await Axios.put(`job/status/${jobId}`, status);
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};

export const getMoverJobs = async (date) => {
  try {
    let data = {
      date: date.toString(),
    };
    const jobs = await Axios.post(`mover`, data, { config: { handlerEnabled: true } });

    return jobs;
  } catch (error) {
    console.log(error);
  }
};

export const holidayCalendar = async (obj) => {
  const days = await Axios.post(`schedule`, obj, { config: { handlerEnabled: true } });
  return days;
};

export const setAvailability = (obj, _id) => {
  return async (dispatch) => {
    try {
      const user = await Axios.put(`mover/${_id}`, obj);
      dispatch(showMessage(user.data.message));
      dispatch({
        type: LOGGEDIN_USER,
        payload: {
          user: user.data.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const payAmount = async (obj) => {
  const payment = await Axios.post(`job/payment`, obj);
  return payment;
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };
};
