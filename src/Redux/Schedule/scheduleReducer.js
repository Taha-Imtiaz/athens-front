import { GET_ALLJOBS, GET_ALLJOBS_FIVEDAYS } from "./scheduleConstant"


let initialState = {
    jobList: null,
    moverList: null
}
const scheduleReducer = (state = initialState, action) => {
    let {type, payload} = action
    switch (type) {
        case GET_ALLJOBS:
            return {...state, jobList: payload.getJobs.data.data}
        case GET_ALLJOBS_FIVEDAYS:
            return {...state, moverList: payload.getJobs.data.data} 
  
        default:
            return state
    }
   
        
}
export default scheduleReducer