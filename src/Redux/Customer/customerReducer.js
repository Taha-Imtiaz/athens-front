import { GET_CUSTOMERS, GET_CUSTOMER, UPDATE_JOB } from "./customerConstants"


var initialState = {
    getCustomers: null
}
var customerReducer = (state = initialState, action) => {
    var {type, payload} = action
    switch (type) {
        case GET_CUSTOMERS:
            return {...state, getCustomers: payload.customers}
            
    case GET_CUSTOMER:
        return {...payload.customer}

        case UPDATE_JOB:
            return {...payload.updatedJob}
        default:
            return state
    }
   
        
}
export default customerReducer