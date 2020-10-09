import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER } from "./customerConstants"
import { UPDATE_JOB } from "../Job/jobConstants"
// import { GET_Customers } from "./userConstants"

export var getAllCustomers =  (customersObj) => {
return async (dispatch) => {
    var getCustomersList = await Axios.post("https://athens-backend.herokuapp.com/api/user/get-all-customer",customersObj)
    //update app's state
    dispatch({
        type: GET_CUSTOMERS, 
        payload:{
            customers: getCustomersList
        }
    })
}
}
export var getCustomer = (customerId) => {
    return async (dispatch) => {
        var customer = await Axios.get(`https://athens-backend.herokuapp.com/api/user/get-customer/${customerId}`)
        dispatch({
            type: GET_CUSTOMER,
            payload:{
                customer: customer
            }
        })
    }
}
export var updateJob = (jobObj, jobId) => {
    return async (disptch) => {
        var updatedJob = await Axios.post(`https://athens-backend.herokuapp.com/api/user/get-customer/${jobId}`, jobObj)
        disptch({
            type: UPDATE_JOB, 
            payload: {
                updatedJob: updatedJob
            }
        })
    }
    }