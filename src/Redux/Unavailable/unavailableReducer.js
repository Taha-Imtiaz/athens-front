import { GET_UNAVAILABLE_LIST } from "./unavailableConstant";

let initialState = null;

const unavailableReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_UNAVAILABLE_LIST:
      return payload;

    default:
      return state;
  }
};
export default unavailableReducer;
