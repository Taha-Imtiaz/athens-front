// import Axios from "axios"
import { GET_JOB, GET_MOVER, SEARCH_FILTER } from "./moverConstants";
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
      var mover = await Axios.post(
        `mover/jobs`,
        moversObj,
        config
      );
      console.log(mover)
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
    var updatedJob = await Axios.put(
      `job/status/${jobId}`,
      status
    );
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
    var jobs = await Axios.post(
      `mover`,
      data,
      config
    );
    
    return jobs;
  } catch (error) {
    console.log(error);
  }
};

export var holidayCalender = async (obj) => {
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

export var getJob =  (jobId) => {
  return async (dispatch) => {
  try {
    var getJob = await Axios.get(`job/${jobId}`);
    
       dispatch({
           type: GET_JOB,
           payload:{
            getJob
           }

       })
  } catch (error) {
    console.log(error);
  }
};

return getJob
}
export var moverSearchFilter = (searchObj) => {
  return async (dispatch) => {
    const token = localStorage.getItem("athens-token");
    const config = {
      headers: { Authorization: token },
    };
    try {
      var searchItem = await Axios.post(`mover/search`, searchObj, config);
      console.log(searchItem.data.data)
      dispatch({
        type: SEARCH_FILTER,
        payload: {
          searchItem: searchItem.data.data
        }
      })

    } catch (error) {
      console.log(error);
    }
  }

};
