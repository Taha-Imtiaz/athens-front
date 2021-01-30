import {
  GET_MOVER,
  GET_MOVER_JOB_DETAIL,
  SEARCH_FILTER,
} from "./moverConstants";
import Axios from "../../utils/api";
import { showMessage } from "../Common/commonActions";
import { LOGGEDIN_USER } from "../User/userConstants";

export const getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("athens-token");
      const config = {
        headers: { Authorization: token },
      };
      // const mover = await Axios.get(`user/get-all-jobs-by-mover/${moverId}`, config)
      const mover = await Axios.post(`mover/jobs`, moversObj, config);
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
    const token = localStorage.getItem("athens-token");
    const config = {
      headers: { Authorization: token },
    };
    // const date = new Date()
    let data = {
      date: date.toString(),
    };
    const jobs = await Axios.post(`mover`, data, config);

    return jobs;
  } catch (error) {
    console.log(error);
  }
};

export const holidayCalendar = async (obj) => {
  const token = localStorage.getItem("athens-token");
  const config = {
    headers: { Authorization: token },
  };
  const days = await Axios.post(`schedule`, obj, config);
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
    const token = localStorage.getItem("athens-token");
    const config = {
      headers: { Authorization: token },
    };
    try {
      const searchItem = await Axios.post(`mover/search`, searchObj, config);
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
