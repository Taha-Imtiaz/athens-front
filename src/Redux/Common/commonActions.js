import { START_LOADING, FINISH_LOADING, SHOW_MESSAGE, SCHEDULE_DATE } from "./commonConstants"

export const showLoader = () => (dispatch) => {
    dispatch({
        type: START_LOADING
    })
}

export const hideLoader = () => (dispatch) => {
    dispatch({
        type: FINISH_LOADING
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