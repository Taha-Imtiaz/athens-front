import { GET_JOBS, GET_JOB, FILTER_JOB } from "./jobConstants"

var initialState = []


var jobReducer = (state = initialState, action) => {
var {type, payload} = action

switch (type) {
    case GET_JOBS:
        return [{...state, ...payload.getJobs}]
        
        // case GET_JOB:
        //     var currentState = {...state}
        //     currentState.job =  payload.getJob
        // return [{...currentState}]
        
case FILTER_JOB:
    return [{...payload.dateFilter}]
    default:
        return state
}

}
export default jobReducer