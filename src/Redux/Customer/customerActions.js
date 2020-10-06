import Axios from "axios"
import { GET_CUSTOMERS, GET_CUSTOMER } from "./customerConstants"
// import { GET_Customers } from "./userConstants"

export var getAllCustomers =  (customersObj) => {
return async (dispatch) => {
    var getCustomersList = await Axios.post("https://athens-backend.herokuapp.com/api/user/get-all-customer",customersObj)
    console.log(getCustomersList)
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
      console.log(customer)
      console.log(customerId)
        console.log("get-customer-called")
        dispatch({
            type: GET_CUSTOMER,
            payload:{
                customer: customer
            }
        })
    }
}