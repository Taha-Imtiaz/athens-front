import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID } from "./claimsConstants"

var baseUrl = 'https://athens-backend.herokuapp.com/api/'

export var getAllClaims = (status) => {
    return async (dispatch) => {
        var claims = await Axios.get(baseUrl + "user/get-all-claims/" + status)
        //update app's state
        dispatch({
            type: GET_CLAIMS,
            payload: {
                claims
            }
        })
    }
}

export var getClaimsByID = (customerId) => {
    return async (dispatch) => {
        var claims = await Axios.get(baseUrl + `user/get-customer/${customerId}`)
        dispatch({
            type: GET_CLAIMS_BY_ID,
            payload: {
                claims
            }
        })
    }
}

export var addClaim = async (data) => {
    // return async (dispatch) => {
    try {
        var claim = await Axios.post(baseUrl + `user/add-claim`, data)
        return claim
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
}

export var getDeposits = async (data) => {
    // return async (dispatch) => {
    try {
        var deposits = await Axios.get(baseUrl + `user/get-all-blanket-deposit`)
        return deposits
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
}

export var updateClaim = async (data) => {
    try {
        var claim = await Axios.post(baseUrl + `user/update-claim/${data._id}`, data)
        return claim
    } catch (error) {
        console.log(error);
    }
}


export var addDeposit = async (data) => {
    try {
        var blanket = await Axios.post(baseUrl + `user/add-blanket-deposit`, data)
        return blanket
    } catch (error) {
        console.log(error);
    }
}