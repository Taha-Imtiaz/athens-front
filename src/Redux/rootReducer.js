import { combineReducers } from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'
import claimReducer from './Claims/claimsReducers'


var rootReducer = combineReducers({
    customers: customerReducer,
    job: jobReducer,
    claims: claimReducer
})
export default rootReducer