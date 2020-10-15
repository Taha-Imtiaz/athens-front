import Axios from "axios"
import { GET_USERS } from "./userConstants"

export var getUsers =  (UsersObj) => {
return async (diaspatch) => {
    try {
    var getUsersList =  await Axios.post("https://athens-backend.herokuapp.com/api/user/get-all-users", UsersObj)
    diaspatch({
    type: GET_USERS,
    payload: {
        getUsersList: getUsersList
    }       
    })
        
    } catch (error) {
        console.log(error)
    }
}
}
export var createUser =  async (newUserObj) => {
try {
    var getUser = await Axios.post("https://athens-backend.herokuapp.com/api/user/create-user", newUserObj)
    return getUser
} catch (error) {
    console.log(error)
}
}