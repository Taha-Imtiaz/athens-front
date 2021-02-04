import { GET_USERS, LOGGEDIN_USER } from "./userConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const login = (data, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post("user/login", data);
      if (response.data.status === 200) {
        localStorage.setItem("athens-token", response.data.token);
        dispatch(showMessage(response.data.message));
        dispatch({
          type: LOGGEDIN_USER,
          payload: response.data.data,
        });
        callback();
      } else {
        dispatch(showMessage(response.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCode = (data, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post("user/forgot-password", data);
      if (response.data.status === 200) {
        callback(response);
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const verifyCode = (data, callback) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: data.token },
      };

      const response = await Axios.post("user/verify", data, config);
      if (response.data.status === 200) {
        localStorage.setItem("athens-token", response.data.token);
        dispatch(showMessage(response.data.message));
        dispatch({
          type: LOGGEDIN_USER,
          payload: response.data.data,
        });
        callback();
      } else {
        dispatch(showMessage(verifyCode.data.message));
      }
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getLoginUser = () => {
  return async (dispatch) => {
    try {
      let response = await Axios.get("/user", {
        config: { handlerEnabled: true },
      });
      dispatch({
        type: LOGGEDIN_USER,
        payload: response.data.data,
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const resetPassword = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.put("user", data, {
        config: { handlerEnabled: true },
      });
      if (response.data.status === 200) {
        dispatch(showMessage(response.data.message));
        callback();
      }
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getUsers = (data) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post("user/all", data, {
        config: { handlerEnabled: true }
      });
      dispatch({
        type: GET_USERS,
        payload: response.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (data, userId, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put(`user/${userId}`, data, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        callback();
        dispatch({
          type: LOGGEDIN_USER,
          payload: response.data.data,
        });
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const createUser = (data, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post("user", data, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        callback(response);
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};
