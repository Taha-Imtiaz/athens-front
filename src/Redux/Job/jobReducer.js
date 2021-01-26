import { GET_JOBS, GET_JOB, FILTER_JOB, DELETE_JOB } from "./jobConstants"

var initialState = {
    job: ''
}


var jobReducer = (state = initialState, action) => {
var {type, payload} = action

switch (type) {
    case GET_JOBS:
        return {...state, jobList:payload.getJobs.data.data}
        
        case GET_JOB:
        return {...state,job: payload.getJob.data.data}
        
case FILTER_JOB:
    return {...payload.dateFilter}
    case DELETE_JOB:
        return {jobList:payload.getAllJobsExceptDeleteOne.data.data}
    default:
        return state
}

}
export default jobReducer