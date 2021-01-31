import { EDIT_DEPOSIT, GET_ALL_DEPOSITS } from "./depositConstants"

let initialState = null

const depositReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return { ...state, ...payload.deposits.data.data }

        case EDIT_DEPOSIT:
            return { ...state, ...payload.response.data.data.blanketDeposit }

        default:
            return state
    }
}
export default depositReducer