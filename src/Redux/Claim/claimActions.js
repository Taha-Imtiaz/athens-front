// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID, GET_CLAIM, DELETE_CLAIM } from "./claimConstants";
import Axios from "../../utils/api";
import { showMessage } from "../Common/commonActions";

export const getAllClaims = (data) => {
  let body = {
    page: data.page,
    query: data.query
  };
  return async (dispatch) => {
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
  };
};

export const getClaimsByID = (customerId) => {
  return async (dispatch) => {
    let claims = await Axios.get(`customer/details/${customerId}`);
    dispatch({
      type: GET_CLAIMS_BY_ID,
      payload: {
        claims,
      },
    });
  };
};

export const addClaim = async (data) => {
  try {
    let claim = await Axios.post(`claim`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};

export const updateClaim = async (data) => {
  try {
    let claim = await Axios.put(`claim/${data._id}`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};


export const updateDeposit = async (data) => {
  try {
    let blanket = await Axios.put(
      `deposit`,
      data
    );
    return blanket;
  } catch (error) {
  }
};

export const getCustomersAndJobs = async () => {
  try {
    let customers = await Axios.get(`customer/jobs`);
    return customers;
  } catch (error) {
    console.log(error);
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
    } catch (error) {
      console.log(error)
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
      console.log(body)
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