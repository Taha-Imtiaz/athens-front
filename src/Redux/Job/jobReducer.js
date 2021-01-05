import { GET_JOBS, GET_JOB, FILTER_JOB, DELETE_JOB } from "./jobConstants"

var initialState = null


var jobReducer = (state = initialState, action) => {
var {type, payload} = action

switch (type) {
    case GET_JOBS:
        return {...state, jobList:payload.getJobs.data.jobs}
        
        case GET_JOB:
            console.log(payload.getJob.data.job)
        return {...state,job: payload.getJob.data.job}
        
case FILTER_JOB:
    return {...payload.dateFilter}
    case DELETE_JOB:
        return {...payload.getAllJobsExceptDeleteOne}
    default:
        return state
}

}
export default jobReducer