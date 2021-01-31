import { GET_ALLJOBS, GET_ALLJOBS_FIVEDAYS } from "./scheduleConstant"
import Axios from "axios";

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllMover = async () => {

  try {
    const moverList = await Axios.get("mover");
    return moverList;
  } catch (error) {
    console.log(error);
  }

}