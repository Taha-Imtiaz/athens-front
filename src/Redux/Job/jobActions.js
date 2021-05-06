import { GET_JOBS, GET_JOB, DELETE_JOB } from "./jobConstants";
import Axios from "axios";
import { showMessage } from "../../Redux/Common/commonActions";

export const getAllJobs = (jobObj) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post("job/all", jobObj, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_JOBS,
        payload: response.data.data,
      });
    } catch (error) {

    }
  };
};

export const getJob = (jobId) => {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`job/${jobId}`, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_JOB,
        payload: response.data.data,
      });
    } catch (error) {

    }
  };
};

export const createJob = (newJobObj, callback) => {
  return async (dispatch) => {
    try {
      let newJob = await Axios.post("job", newJobObj, {
        config: { handlerEnabled: true }
      });
      if (newJob.data.status === 200) {
        callback(newJob);
        dispatch(showMessage(newJob.data.message));
      } else {
        dispatch(showMessage(newJob.data.message));
      }
    } catch (error) {

    }
  };
};

export const updateJob = (jobId, jobObj, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.put(`job/${jobId}`, jobObj, {
        config: { handlerEnabled: true }
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

export const getAllJobsOnDate = async (date) => {
  try {
    let data = {
      date: date.toString(),
    };
    let currentDayJobs = await Axios.post("schedule/current-jobs", data, {
      config: { handlerEnabled: true }
    });

    return currentDayJobs;
  } catch (error) {

  }
};

export const getJobsByDate = (body, callback) => {
  return async (dispatch) => {
    try {
      let jobs = await Axios.post("job/monthly-jobs", body, {
        config: { handlerEnabled: true }
      });
      callback(jobs);
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const filterJobsByDate = (date) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post("job/filter", date, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_JOBS,
        payload: response.data.data,
      });
    } catch (error) {

    }
  };
};

export const confirmJob = (obj) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`job/book`, obj, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        dispatch(showMessage(response.data.message));

        dispatch({
          type: GET_JOB,
          payload: response.data.data,
        });
      }
    } catch (error) {

    }
  };
};

export const deleteJob = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id,
      };
      let response = await Axios.delete(`job`, {
        params: body,
        config: {
          handlerEnabled: true
        }
      });
      if (response.data.status === 200) {
        dispatch(showMessage(response.data.message));
        dispatch({
          type: DELETE_JOB,
          payload: response.data.data,
        });
      }
    } catch (error) {

    }
  };
};

//fetch calendar currentDay Jobs
export const getCurrentDayJob = async (jobId) => {
  try {
    let getJob = await Axios.get(`job/${jobId}`, {
      config: { handlerEnabled: true }
    });
    return getJob;
  } catch (error) {

  }
};


export const printJob = async (jobIds) => {
  const promiseArray = jobIds.map(id => Axios.get(`job/print/${id}`, {
    config: { handlerEnabled: true },
    responseType: 'blob'
  }));

  try {
    // let response = await Axios.get(`job/print/${jobId}`, {
    //   config: { handlerEnabled: true },
    //   responseType: 'blob'
    // });
    // console.log(response.data)
    let responses = await Axios.all(promiseArray)
    responses.map(response => {
      
      console.log(response.data, 'hello')
      const file = new Blob([response.data], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    });
  } catch (error) {

  }
};
