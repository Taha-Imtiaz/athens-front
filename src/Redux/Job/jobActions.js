import { GET_JOBS, GET_JOB, DELETE_JOB } from "./jobConstants";
import Axios from "axios";
import { showMessage } from "../../Redux/Common/commonActions";

export const getAllJobs = (jobObj) => {
  return async (dispatch) => {
    try {
      let getJobs = await Axios.post("job/all", jobObj);
      dispatch({
        type: GET_JOBS,
        payload: {
          getJobs: getJobs,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getJob = (jobId) => {
  return async (dispatch) => {
    try {
      let getJob = await Axios.get(`job/${jobId}`);
      dispatch({
        type: GET_JOB,
        payload: {
          getJob: getJob,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllMovers = async () => {
  try {
    let getMovers = await Axios.get("mover");
    return getMovers;
  } catch (error) {
    console.log(error);
  }
};

export const createJob = (newJobObj, callback) => {
  return async (dispatch) => {
    try {
      let newJob = await Axios.post("job", newJobObj);
      if (newJob.data.status === 200) {
        callback(newJob);
        dispatch(showMessage(newJob.data.message));
      } else {
        dispatch(showMessage(newJob.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateJob = async (jobId, jobObj) => {
  try {
    let updatedJob = await Axios.put(`job/${jobId}`, jobObj);
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobsOnDate = async (date) => {
  try {
    let data = {
      date: date.toString(),
    };
    let currentDayJobs = await Axios.post("schedule/current-jobs", data);

    return currentDayJobs;
  } catch (error) {
    console.log(error);
  }
};

export const getJobsByDate = (body, callback) => {
  return async (dispatch) => {
    try {
      let jobs = await Axios.post("job/monthly-jobs", body);
      callback(jobs);
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const filterJobsByDate = (date) => {
  return async (dispatch) => {
    try {
      let dateFilter = await Axios.post("job/filter", date);
      dispatch({
        type: GET_JOBS,
        payload: {
          getJobs: dateFilter,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const confirmJob = (obj) => {
  return async (dispatch) => {
    try {
      let getJob = await Axios.post(`job/book`, obj);
      if (getJob.data.status === 200) {
        dispatch(showMessage(getJob.data.message));

        dispatch({
          type: GET_JOB,
          payload: {
            getJob,
          },
        });
      }
    } catch (error) {
      console.log(error);
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
      let getAllJobsExceptDeleteOne = await Axios.delete(`job`, {
        params: body,
      });
      if (getAllJobsExceptDeleteOne.data.status === 200) {
        dispatch(showMessage(getAllJobsExceptDeleteOne.data.message));
        dispatch({
          type: DELETE_JOB,
          payload: {
            getAllJobsExceptDeleteOne: getAllJobsExceptDeleteOne,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

//fetch calendar currentDay Jobs
export const getCurrentDayJob = async (jobId) => {
  try {
    let getJob = await Axios.get(`job/${jobId}`);
    return getJob;
  } catch (error) {
    console.log(error);
  }
};
