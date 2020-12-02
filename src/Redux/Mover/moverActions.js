// import Axios from "axios"
import { GET_MOVER } from "./moverConstants"
import Axios from '../../utils/api'

// var baseUrl = 'https://athens-backend.herokuapp.com/api/'
// var baseUrl = 'http://localhost:3000/api/'

export var getMover = (moversObj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('athens-token')
      const config = {
        headers: { Authorization: token }
      };
      // var mover = await Axios.get(`user/get-all-jobs-by-mover/${moverId}`, config)
    var mover = await Axios.post(`user/get-all-jobs-by-mover`, moversObj,  config)
      dispatch({
        type: GET_MOVER,
        payload: {
          mover:mover.data.jobs
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export var updateJob = async (jobId, status) => {
  try {
    var updatedJob = await Axios.post(
      `user/update-job-status/${jobId}`,
      status
    );
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};


export var getMoverJobs = async (date) => {
  try {
    const token = localStorage.getItem('athens-token')
    const config = {
      headers: { Authorization: token }
    };
    // const date = new Date()
    let data = {
      date: date.toString()
    }
    var jobs = await Axios.post(`user/get-all-jobs-by-mover-on-date`,
      data, config
    );
    return jobs;
  } catch (error) {
    console.log(error);
  }
}

export var holidayCalender = async (obj) => {
  const token = localStorage.getItem('athens-token')
  const config = {
    headers: { Authorization: token }
  };
  var days = await Axios.post(`user/request-holidays`,
    obj, config
  );
  return days;

}

export var setAvailability = async (obj, _id) => {

  var days = await Axios.post(`user/set-availability/${_id}`,
    obj
  );
  return days;

}
// export var updateJob = (jobObj, jobId) => {
//     return async (disptch) => {
//        try {
//         var updatedJob = await Axios.post(`user/get-customer/${jobId}`, jobObj)
//         disptch({
//             type: UPDATE_JOB, 
//             payload: {
//                 updatedJob: updatedJob
//             }
//         })
//        } catch (error) {
//            console.log(error)
//        }
//     }
//     }

export var payAmount = async (obj) => {

  var payment = await Axios.post(`user/payment`,
    obj
  );
  return payment;

}

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