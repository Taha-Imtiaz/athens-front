import { GET_ALLJOBS, GET_ALLJOBS_FIVEDAYS } from "./scheduleConstant"


var initialState = {
    jobList: null,
    moverList: null
}
var scheduleReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
        case GET_ALLJOBS:
            return {...state, jobList: payload.getJobs.data.jobs}
        case GET_ALLJOBS_FIVEDAYS:
            return {...state, moverList: payload.getJobs} 
  
        default:
            return state
    }
   
        
}
export default scheduleReducer