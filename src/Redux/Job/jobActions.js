import Axios from "axios"
import { GET_JOBS, GET_JOB } from "./jobConstants"

export var getAllJobs = (jobObj) => {
return async (dispatch) => {
    try {
       var getJobs = await Axios.post("https://athens-backend.herokuapp.com/api/user/get-all-jobs", jobObj)

       //update app's state
       dispatch({
        type: GET_JOBS,
        payload: {
            getJobs:getJobs
        }
       }) 
    } catch (error) {
        console.log(error)
    }
}
}

export var getJob = async (jobId) => {
    // return async (dispatch) => {
        try {
          var getJob = await Axios.get(`https://athens-backend.herokuapp.com/api/user/get-job/${jobId}`)
          console.log(getJob)
          return getJob
        //    dispatch({
        //        type: GET_JOB,
              
        //    })
        } catch (error) {
            console.log(error)
        }
    
}