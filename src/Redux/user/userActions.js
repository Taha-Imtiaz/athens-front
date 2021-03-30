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
// get all users
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
      
    }
  };
};
//get single user
export const getUser = async (userId, callback) => {

  try {
    let response = await Axios.get(`user/${userId}`, {
      config: { handlerEnabled: true }
    })
    if (response.data.status === 200) {
      callback(response)
    }

  } catch (error) {
  }
}


export const updateUser = (data, userId, type, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.put(`user/${userId}`, data, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        callback();
        //for accounts page
        if (type === 'user') {
          dispatch({
            type: LOGGEDIN_USER,
            payload: response.data.data,
          });
          dispatch(showMessage(response.data.message));

        } 
        //(type === admin for other pages)
        else {
          dispatch(showMessage('User updated successfully'));
        }
      }
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
