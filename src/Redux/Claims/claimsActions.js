// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID, GET_CLAIM, DELETE_CLAIM } from "./claimsConstants";
import Axios from "../../utils/api";
import { showMessage } from "../Common/commonActions";

// var baseUrl = "";

export var getAllClaims = (data) => {
  let body = {
    page: data.page,
    query: data.query
  };
  return async (dispatch) => {
    var claims = await Axios.post("claim/" + data.status,
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

export var getClaimsByID = (customerId) => {
  return async (dispatch) => {
    var claims = await Axios.get(`customer/details/${customerId}`);
    dispatch({
      type: GET_CLAIMS_BY_ID,
      payload: {
        claims,
      },
    });
  };
};

export var addClaim = async (data) => {
  try {
    var claim = await Axios.post(`claim`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};

export var updateClaim = async (data) => {
  try {
    var claim = await Axios.put(`claim/${data._id}`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};


export var updateDeposit = async (data) => {
  try {
    var blanket = await Axios.put(
      `deposit`,
      data
    );
    return blanket;
  } catch (error) {
  }
};

export var getCustomersAndJobs = async () => {
  try {
    var customers = await Axios.get(`customer/jobs`);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

export var getClaim = (claimId) => {
  return async (dispatch) => {
    try {
      var claim = await Axios.get(`claim/${claimId}`)
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

export var deleteClaim = (id, currentPage) => {

  return async (dispatch) => {
    try {
      let body = {
        page: currentPage,
        id
      }
      console.log(body)
      var getAllClaimsExceptDeleteOne = await Axios.delete(`claim`, { params: body })
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


// "/claim/id"(delete)