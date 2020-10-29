// import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID } from "./claimsConstants";
import Axios from "../../utils/api";

var baseUrl = "https://athens-backend.herokuapp.com/api/";

export var getAllClaims = (data) => {
  let body = {
    page: data.page,
  };
  return async (dispatch) => {
    var claims = await Axios.post(
      baseUrl + "user/get-all-claims/" + data.status,
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
      `https://athens-backend.herokuapp.com/api/user/add-blanket-deposit`,
      data
    );
    return blanket;
  } catch (error) {
    console.log(error);
  }
};

export var updateDeposit = async (data) => {
  try {
    var blanket = await Axios.post(
      `https://athens-backend.herokuapp.com/api/user/update-blanket-deposit`,
      data
    );
    console.log(data);
    return blanket;
  } catch (error) {
    console.log(error);
  }
};
