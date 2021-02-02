import { GET_CUSTOMERS, GET_CUSTOMER, DELETE_CUSTOMER } from "./customerConstants"


let initialState = {
    customerList: []
}
const customerReducer = (state = initialState, action) => {
    let { type, payload } = action

    switch (type) {

        case GET_CUSTOMERS:

            return { ...state, customerList: payload }

        case GET_CUSTOMER:
            return { ...state, customer: payload }

        case DELETE_CUSTOMER:
            return { ...state, customerList: payload }
        default:
            return state
    }


}
export default customerReducer
