import { GET_MOVER } from "./moverConstants"


var initialState = {
    getMover: null
}
var moverReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
    case GET_MOVER:
        return {...payload.mover}

        // case UPDATE_JOB:
        //     return {...payload.updatedJob}

           
        default:
            return state
    }
   
        
}
export default moverReducer