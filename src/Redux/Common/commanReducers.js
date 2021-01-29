import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE,SCHEDULE_DATE } from "./commonConstants"

let initialState = {
    loading: false,
    displayMessage: '',
    scheduleDate: new Date()
}
const commonReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case SHOW_LOADER:
            return { ...state, loading: true }
        case HIDE_LOADER:
            return { ...state, loading: false }
        case SHOW_MESSAGE:
            return { ...state, displayMessage: payload }
        case SCHEDULE_DATE:
            return { ...state, scheduleDate: payload }
        default:
            return state
    }
}

export default commonReducer