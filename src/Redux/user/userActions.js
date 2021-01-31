import { GET_USERS, LOGGEDIN_USER } from "./userConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const login = (data, callback) => {
  return async (diaspatch) => {
    try {
      const user = await Axios.post("user/login", data);
      if (user.data.status === 200) {
        localStorage.setItem("athens-token", user.data.token);
        diaspatch(showMessage(user.data.message));
        diaspatch({
          type: LOGGEDIN_USER,
          payload: {
            user: user.data.data,
          },
        });
        callback();
      } else {
        diaspatch(showMessage(user.data.message));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLoginUser = () => {
  return async (dispatch) => {
    try {
      let user = await Axios.get('/user', { config: { handlerEnabled: true } })
      dispatch({
        type: LOGGEDIN_USER,
        payload: {
          user: user.data.data,
        }
      })
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
  // return async (diaspatch) => {
  //   try {
  //     const token = localStorage.getItem("athens-token");
  //     const config = {
  //       headers: { Authorization: token },
  //     };

  //     const user = await Axios.get("user", config);

  //     if (user.data.status === 200) {
  //       diaspatch({
  //         type: LOGGEDIN_USER,
  //         payload: {
  //           user: user.data.data,
  //         },
  //       });
  //     } else {
  //       diaspatch(showMessage(user.data.message));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
};

export const resetPassword = (data, callback) => {
  return async (dispatch) => {
    try {
      let user = await Axios.put("user", data, { config: { handlerEnabled: true } });
      if (user.data.status === 200) {
        dispatch(showMessage(user.data.message));
        callback()
      }
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
}

export const getUsers = (data) => {
  return async (diaspatch) => {
    try {
      const getUsersList = await Axios.post("user/all", data);
      diaspatch({
        type: GET_USERS,
        payload: {
          getUsersList: getUsersList,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUser = (data, userId, callback) => {
  return async (dispatch) => {
    try {
      const updatedUser = await Axios.put(`user/${userId}`, data);
      if (updatedUser.data.status === 200) {
        callback()
        dispatch({
          type: LOGGEDIN_USER,
          payload: {
            user: updatedUser.data.data,
          },
        });
      }
      dispatch(showMessage(updatedUser.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const createUser = async (data) => {
  // return async (dispatch) => {
  try {
    const createdUser = await Axios.post("user", data);
    // dispatch(showMessage(createdUser.data.message))
    return createdUser;
  } catch (error) { }
  // }
};

export const sendCode = async (data, callback) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post("user/forgot-password", data);
      callback(response);
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const verifyCode = (data, callback) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: data.token },
      };

      const verifyCode = await Axios.post("user/verify", data, config);
      if (verifyCode.data.status === 200) {
        localStorage.setItem("athens-token", verifyCode.data.token);
        dispatch(showMessage(verifyCode.data.message));
        dispatch({
          type: LOGGEDIN_USER,
          payload: {
            user: verifyCode.data.data,
          },
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

