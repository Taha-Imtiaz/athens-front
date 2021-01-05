import { DELETE_BLANKET_DEPOSIT, EDIT_DEPOSIT, GET_ALL_DEPOSITS } from "./BlanketDepositConstants"

var initialState =null

var blanketReducer = (state = initialState ,action) => {
    var {type, payload} = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return {...state,...payload.deposits.data.blanketDeposit}
            
         case DELETE_BLANKET_DEPOSIT:
            return {...payload.blanketToDelete.data.blanketDeposit}

            case EDIT_DEPOSIT: 
            return {...payload.blanket.data.blanketDeposit}
    
        default:
           return state
    }
}
export default blanketReducer