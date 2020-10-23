import { GET_ALLDATA } from "./unavailableConstant"


var initialState = {
    getUnavailbleList: null
}
var unavailableReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
        case GET_ALLDATA:
            return {...state, getUnavailbleList: payload}
            
  
        default:
            return state
    }
   
        
}
export default unavailableReducer