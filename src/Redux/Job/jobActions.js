import Axios from "axios";
import { GET_JOBS, GET_JOB } from "./jobConstants";

// var baseUrl = 'http://10.0.4.213:3000/'
var baseUrl = "https://athens-backend.herokuapp.com/";
export var getAllJobs = (jobObj) => {
  return async (dispatch) => {
    try {
      var getJobs = await Axios.post(baseUrl + "api/user/get-all-jobs", jobObj);

      //update app's state
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

export var getJob = async (jobId) => {
  // return async (dispatch) => {
  try {
    var getJob = await Axios.get(baseUrl + `api/user/get-job/${jobId}`);
    console.log(getJob);
    return getJob;
    //    dispatch({
    //        type: GET_JOB,

    //    })
  } catch (error) {
    console.log(error);
  }
};
export var getAllMovers = async () => {
  try {
    var getMovers = await Axios.get(baseUrl + "api/user/get-all-movers");
    return getMovers;
  } catch (error) {
    console.log(error);
  }
};
export var createJob = async (newJobObj) => {
  try {
    var newJob = await Axios.post(baseUrl + "api/user/create-job",
      newJobObj
    );
    return newJob;
  } catch (error) {
    console.log(error);
  }
};
export var updateJob = async (jobId, jobObj) => {
  try {
    var updatedJob = await Axios.post(
      `${baseUrl}api/user/update-job/${jobId}`,
      jobObj
    );
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};


export var searchJobs = async (query) => {
  try {
    var jobs = await Axios.get(baseUrl + "api/user/jobs/" + query);
    return jobs;
  } catch (error) {
    console.log(error);
  }
};