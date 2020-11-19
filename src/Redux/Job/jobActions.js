// import Axios from "axios";
import { GET_JOBS, GET_JOB, FILTER_JOB } from "./jobConstants";
import Axios from "../../utils/api";
import {
  showLoader,
  hideLoader,
  showMessage,
} from "../../Redux/Common/commonActions";
// var baseUrl = 'http://10.0.4.213:3000/'
var baseUrl = "https://athens-backend.herokuapp.com/api/";
export var getAllJobs = (jobObj) => {
  return async (dispatch) => {
    try {
      var getJobs = await Axios.post("user/get-all-jobs", jobObj);
      //update app's state
      // dispatch(showLoader());
      dispatch({
        type: GET_JOBS,
        payload: {
          getJobs: getJobs,
        },
      });
      // dispatch(hideLoader());
    } catch (error) {
      console.log(error);
    }
  };
};

export var getJob = async (jobId) => {
  // return async (dispatch) => {
  try {
    var getJob = await Axios.get(`user/get-job/${jobId}`);
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
    var getMovers = await Axios.get("user/get-all-movers");
    return getMovers;
  } catch (error) {
    console.log(error);
  }
};
export var createJob = (newJobObj) => {
  return async (dispatch) => {
    try {
      var newJob = await Axios.post("user/create-job", newJobObj);
      dispatch(showMessage(newJob.data.message));
    } catch (error) {
      console.log(error);
    }
  };
};
export var updateJob = async (jobId, jobObj) => {
  try {
    var updatedJob = await Axios.post(`user/update-job/${jobId}`, jobObj);
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
    var currentDayJobs = await Axios.post("user/get-all-jobs-on-date", data);
    console.log(date);
    return currentDayJobs;
  } catch (error) {
    console.log(error);
  }
};
export var getJobsByDate = async (date) => {
  try {
    let data = {
      date: date.toString(),
    };
    var jobs = await Axios.post("user/get-job-date", data);
    return jobs;
  } catch (error) {
    console.log(error);
  }
};
export var searchJobs = async (query) => {
  try {
    var jobs = await Axios.get("user/jobs/" + query);
    return jobs;
  } catch (error) {
    console.log(error);
  }
};
export var filterJobsByDate = (date) => {
  return async (dispatch) => {
    try {
      var dateFilter = await Axios.post("user/get-all-jobs-by-filter", date);
      dispatch({
        type: GET_JOBS,
        payload: {
          getJobs: dateFilter,
        },
      });
      // dispatch(hideLoader());
    } catch (error) {
      console.log(error);
    }
  };
};

export var confirmJob = async (obj) => {
  var confirmation = await Axios.post(`user/confirm-booking`, obj);
  return confirmation;
};
export var getServices = async () => {
  try {
    var services  = await Axios.get("user/get-services")
    return services
  } catch (error) {
    console.log(error)
  }
}

export var addService = async (serviceObj) => {
  try {
    var serviceAdded = await Axios.post("user/add-services", serviceObj)
    return serviceAdded
  } catch (error) {
    console.log(error)
  }
}