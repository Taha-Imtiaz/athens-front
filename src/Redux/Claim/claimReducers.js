import { DELETE_CLAIM, GET_CLAIM, GET_CLAIMS} from "./claimConstants"

let initialState = {
    claim: ''
}
const claimReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case GET_CLAIMS:
            return { ...state, claimList: payload }

       

        case GET_CLAIM:
            return { ...state, claim: payload }

        case DELETE_CLAIM:
            return { ...state, claimList: payload }

        default:
            return state
    }
}
export default claimReducer