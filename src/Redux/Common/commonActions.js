import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE, SCHEDULE_DATE } from "./commonConstants"

export const showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER
    })
}

export const hideLoader = () => (dispatch) => {
    dispatch({
        type: HIDE_LOADER
    })
}

export const showMessage = (message) => async (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: SHOW_MESSAGE,
            payload: {
                message: ''
            }
        })
    })
    dispatch({
        type: SHOW_MESSAGE,
        payload: {
            message
        }
    })
}

export const changeDate = (date) => (dispatch) => {
    dispatch({
        type: SCHEDULE_DATE,
        payload: date
    })
}