// import Axios from "axios"
import { GET_USERS, LOGGEDIN_USER, GET_LOGGEDIN_USER } from "./userConstants"
import Axios from '../../utils/api'
import { showMessage } from '../Common/commonActions'

var baseUrl = "https://athens-backend.herokuapp.com/api/";

export var login = (credentials) => {
    return async (diaspatch) => {
        try {
            var user = await Axios.post("user/login", credentials)
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
                return user;
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

            var user = await Axios.get("user", config)
            console.log(user)
            if (user.data.status == 200) {
                diaspatch({
                    type: LOGGEDIN_USER,
                    payload: {
                        user: user.data.data
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
            var getUsersList = await Axios.post("user/all", UsersObj)
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
        var createdUser = await Axios.post("user", newUserObj)
        // dispatch(showMessage(createdUser.data.message))
        return createdUser
    } catch (error) {
    }
    // }
}

export var getUserData = async (userId) => {
    try {
        var getUser = await Axios.get(`user/${userId}`)
        return getUser
    } catch (error) {
        console.log(error)
    }
}
export var updateUser = (data, userId) => {
    return async (dispatch) => {
        try {
            var updatedUser = await Axios.put(`user/${userId}`, data)

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
                        user: updatedUser.data.data
                    }
                })
            }
            dispatch(showMessage(updatedUser.data.message))
        } catch (error) {
            console.log(error)
        }
    }
}
export var sendCode = async (email) => {
    try {
        var verifyEmail = await Axios.post("user/forgot-password", email)
        return verifyEmail
    } catch (error) {
        console.log(error)
    }
}
export var verifyCode =  (verifyCodeObj, callback) => {
    return async (dispatch) =>{
        try {
            const config = {
                headers: { Authorization: verifyCodeObj.token },
            };
    
            var verifyCode = await Axios.post("user/verify", verifyCodeObj, config)
            console.log(verifyCode)
            if (verifyCode.data.status == 200) {
                localStorage.setItem('athens-token', verifyCode.data.token)
                // callback()
                dispatch(showMessage(verifyCode.data.message))
                dispatch({
                    type: LOGGEDIN_USER,
                    payload: {
                        user: verifyCode.data.data
                    }
                })
                callback()
                // return verifyCode;
            } else {
                dispatch(showMessage(verifyCode.data.message))
                // return verifyCode;
            }
        } catch (error) {
            console.log(error)
        }
    }
   
}
export var resetPassword = async (passwordObj) => {
    try {
        const config = {
            headers: { Authorization: passwordObj.token },
        };
        var newPassword = await Axios.put("user", passwordObj, config)
        return newPassword
    } catch (error) {
        console.log(error)
    }
}