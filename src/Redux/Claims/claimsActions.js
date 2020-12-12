// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID, GET_CLAIM } from "./claimsConstants";
import Axios from "../../utils/api";

// var baseUrl = "";

export var getAllClaims = (data) => {
  console.log(data)
  let body = {
    page: data.page,
    query:data.query
  };
  console.log(body)
  return async (dispatch) => {
    var claims = await Axios.post("user/get-all-claims/" + data.status,
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
    var claims = await Axios.get(`user/get-customer/${customerId}`);
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
    var claim = await Axios.post(`user/add-claim`, data);
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
    var deposits = await Axios.get(`user/get-all-blanket-deposit`);
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
    var claim = await Axios.post(`user/update-claim/${data._id}`, data);
    return claim;
  } catch (error) {
    console.log(error);
  }
};

export var addDeposit = async (data) => {
  try {
    var blanket = await Axios.post(
      `user/add-blanket-deposit`,
      data
    );
    return blanket;
  } catch (error) {
    console.log(error);
  }
};

export var updateDeposit = async (data) => {
  console.log(data)
  try {
    var blanket = await Axios.post(
      `user/update-blanket-deposit`,
      data
    );
    return blanket;
  } catch (error) {
  }
};

export var getCustomersAndJobs = async () => {
  try {
    var customers = await Axios.get(`user/get-all-customers-jobs`);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

export var getClaim = (claimId) => {
  
  return async (dispatch) => {
   try {
    

    console.log(claimId)
    var claim = await Axios.get(`user/get-claim/${claimId}`)
    console.log(claim)
    dispatch({
      type:GET_CLAIM,
      payload:{
        claim:claim
      }
    })
   } catch (error) {
     console.log(error)
   }
  }
}