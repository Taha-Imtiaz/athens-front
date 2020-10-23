// import Axios from "axios"
import { GET_USERS } from "./userConstants"
import Axios from '../../utils/api'
import { showMessage } from '../../Redux/Common/commonActions'

var baseUrl = "https://athens-backend.herokuapp.com/api/";

export var getUsers = (UsersObj) => {
    return async (diaspatch) => {
        try {
            var getUsersList = await Axios.post("user/get-all-users", UsersObj)
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

export var createUser = async (newUserObj) => {
    // return async (dispatch) => {
        try {
            var createdUser = await Axios.post("user/create-user", newUserObj)
            console.log(createdUser.data.message)
            // dispatch(showMessage(createdUser.data.message))
            return createdUser
        } catch (error) {
            console.log(error)
        }
    // }
}

export var getUserData = async (userId) => {
    try {
        var getUser = await Axios.get(`user/get-user/${userId}`)
        return getUser
    } catch (error) {
        console.log(error)
    }
}
export var updateUser = async (userId) => {
    try {
        var updatedUser = await Axios.post(`user/update-user/${userId}`)
        // dispatch(showMessage(updatedUser.data.message))
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}