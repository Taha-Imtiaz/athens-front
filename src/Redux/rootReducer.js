import {combineReducers} from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'

var rootReducer = combineReducers({
customers: customerReducer,
jobs: jobReducer
})
export default rootReducer