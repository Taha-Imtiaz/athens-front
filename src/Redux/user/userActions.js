import { GET_USERS, LOGGEDIN_USER } from "./userConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const login = (credentials, callback) => {
  return async (diaspatch) => {
    try {
      const user = await Axios.post("user/login", credentials);
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
  return (dispatch) => {
    Axios.get('/user', { config: { handlerEnabled: true } })
      .then(res => {
        dispatch({
          type: LOGGEDIN_USER,
          payload: {
            user: res.data.data,
          }
        })
      })
      .catch(err => {
        dispatch(showMessage(err.message))
      })
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

export const getUsers = (UsersObj) => {
  return async (diaspatch) => {
    try {
      const getUsersList = await Axios.post("user/all", UsersObj);
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

export const createUser = async (newUserObj) => {
  // return async (dispatch) => {
  try {
    const createdUser = await Axios.post("user", newUserObj);
    // dispatch(showMessage(createdUser.data.message))
    return createdUser;
  } catch (error) { }
  // }
};

export const updateUser = (data, userId) => {
  return async (dispatch) => {
    try {
      const updatedUser = await Axios.put(`user/${userId}`, data);

      if (updatedUser.data.status === 200) {
        // diaspatch({
        //     type: GET_LOGGEDIN_USER,
        //     payload: {
        //         user: user.data.user
        //     }
        // })
        dispatch({
          type: LOGGEDIN_USER,
          payload: {
            user: updatedUser.data.data,
          },
        });
      }
      dispatch(showMessage(updatedUser.data.message));
    } catch (error) {
      console.log(error);
    }
  };
};
export const sendCode = async (email) => {
  try {
    const verifyEmail = await Axios.post("user/forgot-password", email);
    return verifyEmail;
  } catch (error) {
    console.log(error);
  }
};

export const verifyCode = (verifyCodeObj, callback) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: verifyCodeObj.token },
      };

      const verifyCode = await Axios.post("user/verify", verifyCodeObj, config);
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
        // return verifyCode;
      } else {
        dispatch(showMessage(verifyCode.data.message));
        // return verifyCode;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetPassword = async (passwordObj) => {

  try {
    const config = {
      headers: { Authorization: passwordObj.token },
    };
    const newPassword = await Axios.put("user", passwordObj, config);
    return newPassword;
  } catch (error) {
    console.log(error);
  }
  // return (dispatch) => {
  //   Axios.get('/user', { config: { handlerEnabled: true } })
  //     .then(res => {
  //       dispatch({
  //         type: LOGGEDIN_USER,
  //         payload: {
  //           user: res.data.data,
  //         }
  //       })
  //     })
  //     .catch(err => {
  //       dispatch({
  //         type: 'ERR_FETCHING_USER',
  //         err
  //       })
  //     })
  // }
};
