import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER, DELETE_CUSTOMER } from "./customerConstants"


var initialState =null
var customerReducer = (state = initialState, action) => {
    var { type, payload } = action
    
    switch (type) {
       
        case GET_CUSTOMERS:
            console.log(payload.customers)
            return {...state, customerList: payload.customers.data.data }

        case GET_CUSTOMER:
            return {...state, customer: payload.customer.data.data }

            case DELETE_CUSTOMER:
            return {...state, customerList:payload.allCustomersExceptDelete.data.data }
        default:
            return state
    }


}
export default customerReducer
