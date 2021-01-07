// import Axios from "axios";
import { GET_JOBS, GET_JOB, FILTER_JOB, DELETE_JOB } from "./jobConstants";
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
      var getJobs = await Axios.post("job/all", jobObj);
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

export var getJob = (jobId) => {
  return async (dispatch) => {
  try {
    var getJob = await Axios.get(`job/${jobId}`);
    console.log("get job called")
    console.log(getJob.data.data)
    
       dispatch({
           type: GET_JOB,
           payload:{
             getJob: getJob
           }

       })
  } catch (error) {
    console.log(error);
  }
};
}
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
      if (newJob.data.status == 200) {
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
    var jobs = await Axios.post("job/monthly-jobs", data);
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
      // dispatch(hideLoader());
    } catch (error) {
      console.log(error);
    }
  };
};

export var confirmJob =  (obj) => {
  return async (dispatch) => {
    try {
      var getJob = await Axios.post(`job/book`, obj);
      console.log(getJob)
      if(getJob.data.status === 200) {
        dispatch(showMessage(getJob.data.message))
     
      dispatch({
        type: GET_JOB,
        payload:{
          getJob
        }
      }) 
    }
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(confirmation)
  // return confirmation;
};

// export var getServices = async () => {
//   try {
//     var services = await Axios.get("user/get-services")
//     return services
//   } catch (error) {
//     console.log(error)
//   }
// }

// export var addService = async (serviceObj) => {
//   try {
//     var serviceAdded = await Axios.post("user/add-services", serviceObj)
//     return serviceAdded
//   } catch (error) {
//     console.log(error)
//   }
// }
export var deleteJob =  (id, currentPage) => {
  return async (dispatch) => {
    var body = {
      page:currentPage
    }
    console.log(`job/${id}`, body)
    try {
  var getAllJobsExceptDeleteOne = await Axios.delete(`job/${id}`, body)
  console.log(getAllJobsExceptDeleteOne)
  if (getAllJobsExceptDeleteOne.data.status == 200) {
    dispatch(showMessage(getAllJobsExceptDeleteOne.data.message))
    dispatch({
    type: DELETE_JOB,
    payload:{
      getAllJobsExceptDeleteOne: getAllJobsExceptDeleteOne
    }
  })
  }
  
 } catch (error) {
   console.log(error)
 }
  }
 
}