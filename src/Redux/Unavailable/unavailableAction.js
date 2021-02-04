import { GET_UNAVAILABLE_LIST } from "./unavailableConstant";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const getAllData = () => {
  return async (dispatch) => {
    try {
      const response = await Axios.get("schedule", {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_UNAVAILABLE_LIST,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const approveRequest = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put("schedule", data, {
        config: { handlerEnabled: true }
      });
      console.log(response)
      if (response.data.status === 200) {

        dispatch({
          type: GET_UNAVAILABLE_LIST,
          payload: response.data.data,
        });
      }
      dispatch(showMessage(response.data.message));
    } catch (error) {
      console.log(error);
    }
  };
};
