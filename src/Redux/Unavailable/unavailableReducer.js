import { GET_UNAVAILABLE_LIST } from "./unavailableConstant";

var initialState = null;

var unavailableReducer = (state = initialState, action) => {
  var { type, payload } = action;
  switch (type) {
    case GET_UNAVAILABLE_LIST:
      return [{...state, ...payload.unavailableList.data.applicants }];

    default:
      return state;
  }
};
export default unavailableReducer;
