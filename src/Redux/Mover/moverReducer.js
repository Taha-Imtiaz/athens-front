import {
  GET_MOVER,
  GET_MOVER_JOB_DETAIL,
  SEARCH_FILTER,
} from "./moverConstants";

let initialState = {
  job: "",
};
const moverReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case GET_MOVER:
      return { jobList: payload };

    case GET_MOVER_JOB_DETAIL:
      return { job: payload };
    case SEARCH_FILTER:
      return { jobList: payload };

    default:
      return state;
  }
};
export default moverReducer;
