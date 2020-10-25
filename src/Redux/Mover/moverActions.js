// import Axios from "axios"
import { GET_MOVER } from "./moverConstants"
import Axios from '../../utils/api'

var baseUrl = 'https://athens-backend.herokuapp.com/api/'
// var baseUrl = 'http://localhost:3000/api/'

export var getMover = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('athens-token')
      const config = {
        headers: { Authorization: token }
      };
      // var mover = await Axios.get(`user/get-all-jobs-by-mover/${moverId}`, config)
      var mover = await Axios.get(`user/get-all-jobs-by-mover`, config)
      dispatch({
        type: GET_MOVER,
        payload: {
          mover
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
      `${baseUrl}user/update-job-status/${jobId}`,
      status
    );
    return updatedJob;
  } catch (error) {
    console.log(error);
  }
};


export var getJob = async (jobId) => {
  try {
    const date = new Date()
    let data = {
      date: date.toString()
    }
    var jobs = await Axios.post(`${baseUrl}user/get-all-jobs-by-mover-on-date/${jobId}`,
      data
    );
    return jobs;
  } catch (error) {
    console.log(error);
  }
}

export var holidayCalender = async (obj) => {

  var days = await Axios.post(`${baseUrl}user/request-holidays/${obj._id}`,
    obj
  );
  return days;

}

export var setAvailability = async (obj, _id) => {

  var days = await Axios.post(`${baseUrl}user/set-availability/${_id}`,
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
