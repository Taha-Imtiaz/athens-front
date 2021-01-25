import { GET_MOVER, GET_MOVER_JOB_DETAIL, SEARCH_FILTER } from "./moverConstants";

var initialState = null;
var moverReducer = (state = initialState, action) => {
  var { type, payload } = action;
  switch (type) {
    case GET_MOVER:
      return { jobList: payload.mover };

    case GET_MOVER_JOB_DETAIL:
      return { job: payload.getJob.data.data };
    case SEARCH_FILTER:
      return { ...payload.searchItem };

    default:
      return state;
  }
};
export default moverReducer;
