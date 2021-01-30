import { combineReducers } from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'
import claimReducer from './Claims/claimsReducers'
import userReducer from './User/userReducer'
import moverReducer from './Mover/moverReducer'
import commonReducer from './Common/commanReducers'
import unavailableReducer from './Unavailable/unavailableReducer';
import scheduleReducer from './Schedule/scheduleReducer';
import formsReducer from './PersistForms/formReducer';
import blanketReducer from './BlanketDeposit/BlanketDepositReducer'

const rootReducer = combineReducers({
    customers: customerReducer,
    jobs: jobReducer,
    claims: claimReducer,
    users: userReducer,
    moverJobs: moverReducer,
    common: commonReducer,
    unavailable: unavailableReducer,
    schedule: scheduleReducer,
    forms: formsReducer,
    blankets:blanketReducer

})
export default rootReducer