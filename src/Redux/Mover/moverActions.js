// import Axios from "axios"
import { GET_MOVER } from "./moverConstants"
import Axios from '../../utils/api'

var baseUrl = 'https://athens-backend.herokuapp.com/api/'
// var baseUrl = 'http://localhost:3000/api/'

export var getMover = (moverId) => {
    return async (dispatch) => {
        try {
            var mover = await Axios.get(`user/get-all-jobs-by-mover/${moverId}`)
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

