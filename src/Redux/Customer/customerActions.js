import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER } from "./customerConstants"
// import { UPDATE_JOB } from "../Job/jobConstants"
// import { GET_Customers } from "./userConstants"

// var baseUrl = 'https://athens-backend.herokuapp.com/api/'
var baseUrl = 'http://localhost:3000/api/'

export var getAllCustomers = (customersObj) => {
    return async (dispatch) => {
        try {
            var getCustomersList = await Axios.post(baseUrl + "user/get-all-customer", customersObj)
            //update app's state
            dispatch({
                type: GET_CUSTOMERS,
                payload: {
                    customers: getCustomersList
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export var getCustomer = (customerId) => {
    return async (dispatch) => {
        try {
            var customer = await Axios.get(`https://athens-backend.herokuapp.com/api/user/get-customer/${customerId}`)
            dispatch({
                type: GET_CUSTOMER,
                payload: {
                    customer: customer
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// export var updateJob = (jobObj, jobId) => {
//     return async (disptch) => {
//        try {
//         var updatedJob = await Axios.post(`https://athens-backend.herokuapp.com/api/user/get-customer/${jobId}`, jobObj)
//         disptch({
//             type: UPDATE_JOB, 
//             payload: {
//                 updatedJob: updatedJob
//             }
//         })
//        } catch (error) {
//            console.log(error)
//        }
//     }
//     }

export var addCustomer = (customerObj, goBack) => {
    return async (dispatch) => {
        try {
            var addedCustomer = await Axios.post("https://athens-backend.herokuapp.com/api/user/customer-Registration", customerObj)
            console.log(addedCustomer)

            goBack()
        } catch (error) {
            console.log(error)
        }

    }
}