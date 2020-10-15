import Axios from "axios"
import { GET_CLAIMS, GET_CLAIMS_BY_ID } from "./claimsConstants"

export var getAllClaims = () => {
    return async (dispatch) => {
        var claims = await Axios.get("https://athens-backend.herokuapp.com/api/user/get-all-claims")
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
        var claims = await Axios.get(`https://athens-backend.herokuapp.com/api/user/get-customer/${customerId}`)
        dispatch({
            type: GET_CLAIMS_BY_ID,
            payload: {
                claims
            }
        })
    }
}
export var addClaim = (data) => {
    return async (dispatch) => {
        var claim = await Axios.post(`https://athens-backend.herokuapp.com/api/user/add-claim`, data)
        // dispatch({
        //     type: GET_CLAIMS_BY_ID,
        //     payload: {
        //         claim
        //     }
        // })
    }
}
