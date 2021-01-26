import { GET_USERS, LOGGEDIN_USER } from "./userConstants";

var initialState = {
  user: null,
  userList: {}
};

var userReducer = (state = initialState, action) => {
  var { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return { ...state, userList: payload.getUsersList.data.data };

    case LOGGEDIN_USER:
      return { ...state, user: payload.user };

    default:
      return state;
  }
};
export default userReducer;
