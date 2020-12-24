import { DELETE_CLAIM, GET_CLAIM, GET_CLAIMS, GET_CLAIMS_BY_ID } from "./claimsConstants"

var initialState = {
    claims: null
}
var claimReducer = (state = initialState, action) => {
    var { type, payload } = action
    switch (type) {
        case GET_CLAIMS:
            return { ...state, claims: payload.claims }

        case GET_CLAIMS_BY_ID:
            return { ...payload.claims }

            case GET_CLAIM:
            return { ...payload.claim }
            case DELETE_CLAIM:
            return {...state, claims: payload.getAllClaimsExceptDeleteOne}
        default:
            return state

    }


}
export default claimReducer