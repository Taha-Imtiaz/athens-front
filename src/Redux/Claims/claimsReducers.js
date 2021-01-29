import { DELETE_CLAIM, GET_CLAIM, GET_CLAIMS, GET_CLAIMS_BY_ID } from "./claimsConstants"

let initialState = {
    claim: ''
}
const claimReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case GET_CLAIMS:
            return { ...state, claimList: payload.claims }

        case GET_CLAIMS_BY_ID:
            return { ...payload.claims }

        case GET_CLAIM:
            return { ...state, claim: payload.claim.data.data }
        case DELETE_CLAIM:
            return { ...state, claimList: payload.getAllClaimsExceptDeleteOne }
        default:
            return state

    }


}
export default claimReducer