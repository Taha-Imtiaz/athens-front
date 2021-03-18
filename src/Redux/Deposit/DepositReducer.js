import { EDIT_DEPOSIT, GET_ALL_DEPOSITS, GET_DEPOSIT } from "./DepositConstants"

let initialState = {
    depositList: [],
    deposit: null
}

const depositReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return { ...state, depositList: payload }

        case GET_DEPOSIT:
            return { ...state, deposit: payload }

        case EDIT_DEPOSIT:
            return { ...state, depositList: payload }



        default:
            return state
    }
}
export default depositReducer