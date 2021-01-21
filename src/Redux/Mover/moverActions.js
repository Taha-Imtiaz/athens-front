// import Axios from "axios"
import { GET_MOVER, SEARCH_FILTER } from "./moverConstants";
import Axios from "../../utils/api";

// var baseUrl = 'https://athens-backend.herokuapp.com/api/'
// var baseUrl = 'http://localhost:3000/api/'

export var getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("athens-token");
      const config = {
        headers: { Authorization: token },
      };
      // var mover = await Axios.get(`user/get-all-jobs-by-mover/${moverId}`, config)
      var mover = await Axios.post(`mover/jobs`, moversObj, config);
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

export var updateJob = async (jobId, status) => {
  try {
    var updatedJob = await Axios.put(`job/status/${jobId}`, status);
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};

export var getMoverJobs = async (date) => {
  try {
    const token = localStorage.getItem("athens-token");
    const config = {
      headers: { Authorization: token },
    };
    // const date = new Date()
    let data = {
      date: date.toString(),
    };
    var jobs = await Axios.post(`mover`, data, config);

    return jobs;
  } catch (error) {
    console.log(error);
  }
};

export var holidayCalendar = async (obj) => {
  const token = localStorage.getItem("athens-token");
  const config = {
    headers: { Authorization: token },
  };
  var days = await Axios.post(`schedule`, obj, config);
  return days;
};

export var setAvailability = async (obj, _id) => {
  var days = await Axios.put(`mover/${_id}`, obj);
  return days;
};

export var payAmount = async (obj) => {
  var payment = await Axios.post(`job/payment`, obj);
  return payment;
};

export var getJob = async (jobId) => {
  try {
    var job = await Axios.get(`job/${jobId}`);
    return job;
  } catch (error) {
    console.log(error);
  }
};
export var moverSearchFilter = (searchObj) => {
  return async (dispatch) => {
    const token = localStorage.getItem("athens-token");
    const config = {
      headers: { Authorization: token },
    };
    try {
      var searchItem = await Axios.post(`mover/search`, searchObj, config);
      console.log(searchItem.data.data);
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
