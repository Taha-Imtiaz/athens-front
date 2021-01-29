import { GET_MOVER, GET_MOVER_JOB_DETAIL, SEARCH_FILTER } from "./moverConstants";

let initialState = {
  job: ''
};
const moverReducer = (state = initialState, action) => {
  let { type, payload } = action;
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
