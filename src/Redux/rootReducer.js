import { combineReducers } from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'
import claimReducer from './Claims/claimsReducers'
import userReducer from './User/userReducer'


var rootReducer = combineReducers({
customers: customerReducer,
jobs: jobReducer,
claims: claimReducer,
users: userReducer
})
export default rootReducer