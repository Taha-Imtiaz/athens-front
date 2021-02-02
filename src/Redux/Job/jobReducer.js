import { GET_JOBS, GET_JOB, FILTER_JOB, DELETE_JOB } from "./jobConstants"

let initialState = {
    job: ''
}


const jobReducer = (state = initialState, action) => {
let {type, payload} = action

switch (type) {
    case GET_JOBS:
        return {...state, jobList:payload}
        
        case GET_JOB:
        return {...state,job: payload}
        
case FILTER_JOB:
    return {...payload.dateFilter}
    case DELETE_JOB:
        return {jobList:payload}
    default:
        return state
}

}
export default jobReducer