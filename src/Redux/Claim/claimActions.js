// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID, GET_CLAIM, DELETE_CLAIM } from "./claimConstants";
import Axios from "axios";
import { showMessage } from "../Common/commonActions";

export const getAllClaims = (data) => {
  let body = {
    page: data.page,
    query: data.query
  };
  return async (dispatch) => {
    try {
      let claims = await Axios.post("claim/" + data.status,
        body
      );
      //update app's state
      dispatch({
        type: GET_CLAIMS,
        payload: {
          claims: claims.data.data
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  };
};

export const getClaimsByID = (customerId) => {
  return async (dispatch) => {
    try {
      let claims = await Axios.get(`customer/details/${customerId}`);
      dispatch({
        type: GET_CLAIMS_BY_ID,
        payload: {
          claims,
        },
      });
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const addClaim = (data, callback) => {
  return async (dispatch) => {
    try {
      let response = await Axios.post(`claim`, data);
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
      let response = await Axios.put(`claim/${data._id}`, data);
      if (response.data.status === 200) {
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
      let response = await Axios.get(`customer/jobs`);
      if (response.data.status === 200) {
        callback(response)
      }
    } catch (err) {
      dispatch(showMessage(err.message));
    }
  }
};

export const getClaim = (claimId) => {
  return async (dispatch) => {
    try {
      let claim = await Axios.get(`claim/${claimId}`)
      dispatch({
        type: GET_CLAIM,
        payload: {
          claim: claim
        }
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
      let getAllClaimsExceptDeleteOne = await Axios.delete(`claim`, { params: body })
      if (getAllClaimsExceptDeleteOne.data.status === 200) {
        dispatch(showMessage(getAllClaimsExceptDeleteOne.data.message))
        dispatch({
          type: DELETE_CLAIM,
          payload: {
            getAllClaimsExceptDeleteOne: getAllClaimsExceptDeleteOne.data.data
          }
        })
      }

    }
    catch (error) {
      console.log(error)
    }
  }

}