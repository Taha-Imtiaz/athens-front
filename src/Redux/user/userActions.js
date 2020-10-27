// import Axios from "axios"
import { GET_USERS, LOGGEDIN_USER, GET_LOGGEDIN_USER } from "./userConstants"
import Axios from '../../utils/api'
import { showMessage } from '../../Redux/Common/commonActions'

var baseUrl = "https://athens-backend.herokuapp.com/api/";

export var login = (credentials) => {
    return async (diaspatch) => {
        try {
            var user = await Axios.post("user/login", credentials)
            console.log(user)
            if (user.data.status == 200) {
                localStorage.setItem('athens-token', user.data.token)
                // callback()
                diaspatch(showMessage(user.data.message))
                diaspatch({
                    type: LOGGEDIN_USER,
                    payload: {
                        user: user.data.data
                    }
                })
                return user;
            } else {
                diaspatch(showMessage(user.data.message))
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export var getLoginUser = (credentials) => {
    return async (diaspatch) => {
        try {
            const token = localStorage.getItem('athens-token')
            const config = {
                headers: { Authorization: token }
            };

            var user = await Axios.get("user/get-user-by-token", config)
            // diaspatch(showMessage(user.data.message))
            console.log(user)
            if (user.data.status == 200) {
                // diaspatch({
                //     type: GET_LOGGEDIN_USER,
                //     payload: {
                //         user: user.data.user
                //     }
                // })
                diaspatch({
                    type: LOGGEDIN_USER,
                    payload: {
                        user: user.data.user
                    }
                })
            } else {
                diaspatch(showMessage(user.data.message))
            }

        } catch (error) {
            console.log(error)
        }
    }
}


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
export var updateUser = (data, userId) => {
    return async (dispatch) => {
        try {
            var updatedUser = await Axios.post(`user/update-user/${userId}`, data)

            if (updatedUser.data.status == 200) {
                // diaspatch({
                //     type: GET_LOGGEDIN_USER,
                //     payload: {
                //         user: user.data.user
                //     }
                // })
                dispatch({
                    type: LOGGEDIN_USER,
                    payload: {
                        user: updatedUser.data.user
                    }
                })
            }
            dispatch(showMessage(updatedUser.data.message))
        } catch (error) {
            console.log(error)
        }
    }
}