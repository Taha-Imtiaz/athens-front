import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, DELETE_CLAIM } from "./customerConstants"


var initialState = {
    customers: null
}
var customerReducer = (state = initialState, action) => {
    var { type, payload } = action
    switch (type) {
        case GET_CUSTOMERS:
            return { ...state, customers: payload.customers }

        case GET_CUSTOMER:
            return { ...payload.customer }

            case DELETE_CLAIM:
            return {  ...state, customers: payload.allCustomersExceptDelete }
        default:
            return state
    }


}
export default customerReducer