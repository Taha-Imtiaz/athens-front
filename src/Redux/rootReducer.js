import {combineReducers} from 'redux'
import customerReducer from './Customer/customerReducer'

var rootReducer = combineReducers({
customers: customerReducer
})
export default rootReducer