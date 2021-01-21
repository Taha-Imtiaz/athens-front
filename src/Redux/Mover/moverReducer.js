import { GET_MOVER_JOB, GET_MOVER, SEARCH_FILTER } from "./moverConstants";

var initialState = null;
var moverReducer = (state = initialState, action) => {
  var { type, payload } = action;
  switch (type) {
    case GET_MOVER:
      return { job: payload.mover };

    case SEARCH_FILTER:
      return { ...payload.searchItem };

    default:
      return state;
  }
};
export default moverReducer;
