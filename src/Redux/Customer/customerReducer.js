import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, DELETE_CLAIM } from "./customerConstants"


var initialState =null
var customerReducer = (state = initialState, action) => {
    var { type, payload } = action
    
    switch (type) {
       
        case GET_CUSTOMERS:
            console.log(payload.customers)
            return {...state, customerList: payload.customers.data.User }

        case GET_CUSTOMER:
            return {...state, customer: payload.customer.data.customer }

            case DELETE_CLAIM:
            return {...state, ...payload.allCustomersExceptDelete }
        default:
            return state
    }


}
export default customerReducer
