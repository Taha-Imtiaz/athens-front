// import Axios from "axios";
import { GET_JOBS, GET_JOB, DELETE_JOB } from "./jobConstants";
import Axios from "../../utils/api";
import { showMessage } from "../../Redux/Common/commonActions";

export var getAllJobs = (jobObj) => {
  return async (dispatch) => {
    try {
      var getJobs = await Axios.post("job/all", jobObj);
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

export var getJob = (jobId) => {
  return async (dispatch) => {
    try {
      var getJob = await Axios.get(`job/${jobId}`);
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

export var getAllMovers = async () => {
  try {
    var getMovers = await Axios.get("mover");
    return getMovers;
  } catch (error) {
    console.log(error);
  }
};

export var createJob = (newJobObj, callback) => {
  return async (dispatch) => {
    try {
      var newJob = await Axios.post("job", newJobObj);
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

export var updateJob = async (jobId, jobObj) => {
  try {
    var updatedJob = await Axios.put(`job/${jobId}`, jobObj);
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};

export var getAllJobsOnDate = async (date) => {
  try {
    let data = {
      date: date.toString(),
    };
    var currentDayJobs = await Axios.post("schedule/current-jobs", data);

    return currentDayJobs;
  } catch (error) {
    console.log(error);
  }
};

export var getJobsByDate = async (body) => {
  try {
    var jobs = await Axios.post("job/monthly-jobs", body);

    return jobs;
  } catch (error) {
    console.log(error);
  }
};

export var filterJobsByDate = (date) => {
  return async (dispatch) => {
    try {
      var dateFilter = await Axios.post("job/filter", date);
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

export var confirmJob = (obj) => {
  return async (dispatch) => {
    try {
      var getJob = await Axios.post(`job/book`, obj);
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

export var deleteJob = (id, currentPage) => {
  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id,
      };
      var getAllJobsExceptDeleteOne = await Axios.delete(`job`, {
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
export var getCurrentDayJob = async (jobId) => {
  try {
    var getJob = await Axios.get(`job/${jobId}`);
    return getJob;
  } catch (error) {
    console.log(error);
  }
};
