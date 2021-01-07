import { GET_JOB, GET_MOVER, SEARCH_FILTER } from "./moverConstants"


var initialState = {
    getMover: null
}
var moverReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
    case GET_MOVER:
        return {...payload.mover}

        // case UPDATE_MOVER:
        //     return {...payload.updatedJob}

           case SEARCH_FILTER:
               return { ...payload.searchItem}
               case GET_JOB: 
               return {...state, job: payload.getJob.data.data}
        default:
            return state
    }
   
        
}
export default moverReducer