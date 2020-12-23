// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID, GET_CLAIM, DELETE_BLANKET_DEPOSIT } from "./claimsConstants";
import Axios from "../../utils/api";

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
        claims,
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
  // return async (dispatch) => {
  try {
    var claim = await Axios.post(`claim`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }

  // dispatch({
  //     type: GET_CLAIMS_BY_ID,
  //     payload: {
  //         claim
  //     }
  // })
  // }
};

export var getDeposits = async (data) => {
  // return async (dispatch) => {
  try {
    var deposits = await Axios.get(`deposit`);
    return deposits;
  } catch (error) {
    console.log(error);
  }

  // dispatch({
  //     type: GET_CLAIMS_BY_ID,
  //     payload: {
  //         claim
  //     }
  // })
  // }
};

export var updateClaim = async (data) => {
  try {
    var claim = await Axios.put(`claim/${data._id}`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};

export var addDeposit = async (data) => {
  try {
    var blanket = await Axios.post(
      `deposit`,
      data
    );
    return blanket;
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
export var deleteBlanketDeposit = async (id) => {
  
    try {
      var blanketToDelete = await Axios.delete(`deposit/${id}`)
      return blanketToDelete
    } catch (error) {
      console.log(error)
    }
  }

  export var deleteClaim = async (id) => {
  
    try {
      var claimToDelete = await Axios.delete(`claim/${id}`)
      return claimToDelete
    } catch (error) {
      console.log(error)
    }
  }


// "/claim/id"(delete)