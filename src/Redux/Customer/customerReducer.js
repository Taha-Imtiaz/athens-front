import { GET_CUSTOMERS, GET_CUSTOMER, DELETE_CUSTOMER } from "./customerConstants"


let initialState = {
    customerList: []
}
const customerReducer = (state = initialState, action) => {
    let { type, payload } = action

    switch (type) {

        case GET_CUSTOMERS:

            return { ...state, customerList: payload.customers.data.data }

        case GET_CUSTOMER:
            return { ...state, customer: payload.customer.data.data }

        case DELETE_CUSTOMER:
            return { ...state, customerList: payload.allCustomersExceptDelete.data.data }
        default:
            return state
    }


}
export default customerReducer
