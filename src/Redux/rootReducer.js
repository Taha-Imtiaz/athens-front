import { combineReducers } from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'
import claimReducer from './Claims/claimsReducers'
import userReducer from './user/userReducer'
import moverReducer from './Mover/moverReducer'
import commonReducer from './Common/commanReducers'



var rootReducer = combineReducers({
    customers: customerReducer,
    jobs: jobReducer,
    claims: claimReducer,
    users: userReducer,
    moverJobs: moverReducer,
    common: commonReducer
})
export default rootReducer