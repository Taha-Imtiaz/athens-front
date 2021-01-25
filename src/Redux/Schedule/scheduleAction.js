import { GET_ALLJOBS, GET_ALLJOBS_FIVEDAYS } from "./scheduleConstant"
import Axios from '../../utils/api'

export var getalljobs = (jobObj) => {
  return async (dispatch) => {

    try {
      var getJobs = await Axios.post("schedule/current-jobs", jobObj);
      //update app's state
      dispatch({
        type: GET_ALLJOBS,
        payload: {
          getJobs: getJobs
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export var getalljobsfiveday = (jobObj) => {
  return async (dispatch) => {

    try {
      var movers = await Axios.post("schedule/movers", jobObj);
      //update app's state
      dispatch({
        type: GET_ALLJOBS_FIVEDAYS,
        payload: {
          getJobs: movers
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export var getAllMover = async () => {

  try {
    var moverList = await Axios.get("mover");
    return moverList;
  } catch (error) {
    console.log(error);
  }

}