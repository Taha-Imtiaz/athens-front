import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE, SCHEDULE_DATE } from "./commonConstants"

export var showLoader = () => (dispatch) => {
    dispatch({
        type: SHOW_LOADER
    })
}

export var hideLoader = () => (dispatch) => {
    dispatch({
        type: HIDE_LOADER
    })
}

export var showMessage = (message) => async (dispatch) => {
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

export var changeDate = (date) => (dispatch) => {
    dispatch({
        type: SCHEDULE_DATE,
        payload: date
    })
}