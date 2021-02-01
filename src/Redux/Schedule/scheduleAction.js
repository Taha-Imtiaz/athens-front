import { GET_ALLJOBS, GET_ALLJOBS_FIVEDAYS } from "./scheduleConstant"
import Axios from "axios";
import { showMessage } from "../../Redux/Common/commonActions";

export const getalljobs = (jobObj) => {
  return async (dispatch) => {
    try {
      const getJobs = await Axios.post("schedule/current-jobs", jobObj);
      //update app's state
      dispatch({
        type: GET_ALLJOBS,
        payload: {
          getJobs: getJobs
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getalljobsfiveday = (jobObj) => {
  return async (dispatch) => {
    try {
      const movers = await Axios.post("schedule/movers", jobObj);
      //update app's state
      dispatch({
        type: GET_ALLJOBS_FIVEDAYS,
        payload: {
          getJobs: movers
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getAllMover = (callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get("mover");
      callback(response);
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
}