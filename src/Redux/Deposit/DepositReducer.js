import { EDIT_DEPOSIT, GET_ALL_DEPOSITS} from "./DepositConstants"

let initialState = null

const depositReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return { ...payload }

        case EDIT_DEPOSIT:
            return { ...state, ...payload }
          


        default:
            return state
    }
}
export default depositReducer