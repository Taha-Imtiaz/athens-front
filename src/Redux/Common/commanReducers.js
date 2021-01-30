import { START_LOADING, FINISH_LOADING, SHOW_MESSAGE, SCHEDULE_DATE } from "./commonConstants"

let initialState = {
    loading: false,
    displayMessage: '',
    totalRequest: 0,
    scheduleDate: new Date()
}
const commonReducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case START_LOADING:
            let currentState = { ...state };
            return {
                ...state,
                totalRequest: ++currentState.totalRequest
            }
        case FINISH_LOADING:
            let currentStates = { ...state };
            return {
                ...state,
                totalRequest: --currentStates.totalRequest
            }
        case SHOW_MESSAGE:
            return { ...state, displayMessage: payload }
        case SCHEDULE_DATE:
            return { ...state, scheduleDate: payload }
        default:
            return state
    }
}

export default commonReducer