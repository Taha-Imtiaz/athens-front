import { GET_JOBS, GET_JOB } from "./jobConstants"

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
        

    default:
        return state
}

}
export default jobReducer