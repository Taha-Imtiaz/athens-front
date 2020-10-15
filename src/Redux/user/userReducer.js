import { GET_USERS } from "./userConstants";

var initialState = [];

var userReducer = (state = initialState, action) => {
    var {type, payload} = action

switch (type) {
    case GET_USERS:
        return [{...payload.getUsersList}]
    
    default:
        return state
}

}
export default userReducer
