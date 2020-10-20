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
    var createdUser = await Axios.post("https://athens-backend.herokuapp.com/api/user/create-user", newUserObj)
    return createdUser
} catch (error) {
    console.log(error)
}
}
export var getUserData = async (userId) => {
    try {
        var getUser = await Axios.get(`https://athens-backend.herokuapp.com/api/user/get-user/${userId}`)
        return getUser
    } catch (error) {
        console.log(error)
    }
} 
export var updateUser = async (userId) => {
    try {
        var updatedUser = await Axios.post(`https://athens-backend.herokuapp.com/api/user/update-user/${userId}`)
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}