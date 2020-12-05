import { GET_MOVER, SEARCH_FILTER, UPDATE_MOVER } from "./moverConstants"


var initialState = {
    getMover: null
}
var moverReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
    case GET_MOVER:
        return {...payload.mover}

        case UPDATE_MOVER:
            return {...payload.updatedJob}

           case SEARCH_FILTER:
               return { ...payload.searchItem}
        default:
            return state
    }
   
        
}
export default moverReducer