import { DELETE_BLANKET_DEPOSIT, EDIT_DEPOSIT, GET_ALL_DEPOSITS } from "./BlanketDepositConstants"

let initialState =null

const blanketReducer = (state = initialState ,action) => {
    let {type, payload} = action
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