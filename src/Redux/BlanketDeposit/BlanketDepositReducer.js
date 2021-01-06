import { DELETE_BLANKET_DEPOSIT, EDIT_DEPOSIT, GET_ALL_DEPOSITS } from "./BlanketDepositConstants"

var initialState =null

var blanketReducer = (state = initialState ,action) => {
    var {type, payload} = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return {...state,...payload.deposits.data.data}
            
         case DELETE_BLANKET_DEPOSIT:
            return {...payload.blanketToDelete.data.data}

            case EDIT_DEPOSIT: 
            return {...payload.blanket.data.data.blanketDeposit}
    
        default:
           return state
    }
}
export default blanketReducer