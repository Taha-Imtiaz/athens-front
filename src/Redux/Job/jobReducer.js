import { CREATE_JOB } from "./jobConstants"
var initialState = []


var jobReducer = (state = initialState, action) => {
var {type, payload} = action

switch (type) {
    case CREATE_JOB:
        
        

    default:
        return state
}

}
export default jobReducer