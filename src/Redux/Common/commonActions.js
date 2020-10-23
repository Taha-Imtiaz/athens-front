import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE } from "./commonConstants"

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

export var showMessage = (message) => (dispatch) => {
    console.log(message)
    dispatch({
        type: SHOW_MESSAGE,
        payload: {
            message
        }
    })
}