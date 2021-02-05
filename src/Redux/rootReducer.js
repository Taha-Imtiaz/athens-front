import { combineReducers } from 'redux'
import customerReducer from './Customer/customerReducer'
import jobReducer from './Job/jobReducer'
import claimReducer from './Claim/claimReducers'
import userReducer from './User/userReducer'
import moverReducer from './Mover/moverReducer'
import commonReducer from './Common/commanReducers'
import unavailableReducer from './Unavailable/unavailableReducer';
import scheduleReducer from './Schedule/scheduleReducer';
import formsReducer from './PersistForms/formReducer';
import depositReducer from './Deposit/DepositReducer'

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
    blankets: depositReducer

})
export default rootReducer