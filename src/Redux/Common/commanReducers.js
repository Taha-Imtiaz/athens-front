import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE,SCHEDULE_DATE } from "./commonConstants"

var initialState = {
    loading: false,
    displayMessage: '',
    scheduleDate: new Date()
}
var commonReducer = (state = initialState, action) => {
    var { type, payload } = action
    switch (type) {
        case SHOW_LOADER:
            return { ...state, loading: true }

        case HIDE_LOADER:
            return { ...state, loading: false }
        case SHOW_MESSAGE:
            return { ...state, displayMessage: payload }
        case SCHEDULE_DATE:
            console.log(payload)
            return { ...state, scheduleDate: payload }
        default:
            return state
    }
}

export default commonReducer