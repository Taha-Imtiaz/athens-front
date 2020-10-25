import { GET_USERS, LOGGEDIN_USER, GET_LOGGEDIN_USER } from "./userConstants";

var initialState = {
    user: null
}

var userReducer = (state = initialState, action) => {
    var { type, payload } = action

    switch (type) {
        case GET_USERS:
            return { ...state, users: payload.getUsersList.data.users }

        case LOGGEDIN_USER:
            return { ...state, user: payload.user }
        case GET_LOGGEDIN_USER:
            return state

        default:
            return state
    }

}
export default userReducer
