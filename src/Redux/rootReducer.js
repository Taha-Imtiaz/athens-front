import {combineReducers} from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'

var rootReducer = combineReducers({
customers: customerReducer,
job: jobReducer
})
export default rootReducer