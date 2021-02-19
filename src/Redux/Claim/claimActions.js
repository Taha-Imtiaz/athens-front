// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIM, DELETE_CLAIM } from "./claimConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const getAllClaims = (data) => {
  let body = {
    page: data.page,
    query: data.query
  };
  return async (dispatch) => {
    try {
      let response = await Axios.post("claim/" + data.status,
        body, {
        config: { handlerEnabled: true }
      });
      //update app's state
      dispatch({
        type: GET_CLAIMS,
        payload: response.data.data

      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};


export const addClaim = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`claim`, data, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        callback(response)
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const updateClaim = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.put(`claim/${data._id}`, data, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        dispatch({
          type: GET_CLAIM,
          payload: response.data.data

        })
        callback(response)
      }
      dispatch(showMessage(response.data.message));
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const getCustomersAndJobs = (callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`customer/jobs`, {
        config: { handlerEnabled: true }
      });
      if (response.data.status === 200) {
        callback(response)
      }
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const getClaim = (id) => {
  return async (dispatch) => {
    try {
      let response = await Axios.get(`claim`, {
        config: { handlerEnabled: true },
        params: {
          id
        }
      })
      dispatch({
        type: GET_CLAIM,
        payload: response.data.data

      })
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
}

export const deleteClaim = (id, currentPage) => {

  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      let response = await Axios.delete(`claim`, {
        params: body,
        config: {
          handlerEnabled: true
        }
      })
      if (response.data.status === 200) {
        dispatch(showMessage(response.data.message))
        dispatch({
          type: DELETE_CLAIM,
          payload: response.data.data

        })
      }

    }
    catch (error) {
      console.log(error)
    }
  }

}