// import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER, ADD_CUSTOMER } from "./customerConstants"
// import { UPDATE_JOB } from "../Job/jobConstants"
// import { GET_Customers } from "./userConstants"
import Axios from '../../utils/api'
import { showMessage } from '../../Redux/Common/commonActions'
// var baseUrl = 'https://athens-backend.herokuapp.com/api/'
// var baseUrl = 'http://localhost:3000/api/'

export var getAllCustomers = (customersObj) => {
    return async (dispatch) => {
        try {
            var getCustomersList = await Axios.post("user/get-all-customer", customersObj)
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
            var customer = await Axios.get(`user/get-customer/${customerId}`)
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
//         var updatedJob = await Axios.post(baseUrl + `user/get-customer/${jobId}`, jobObj)
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

export var addCustomer = (customerObj) => {
    return async (dispatch) => {
        try {
            var addedCustomer = await Axios.post("user/customer-Registration", customerObj)
            dispatch(showMessage(addedCustomer.data.message))
        } catch (error) {
            console.log(error)
        }

    }
}