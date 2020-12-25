import { DELETE_BLANKET_DEPOSIT, EDIT_DEPOSIT, GET_ALL_DEPOSITS } from "./BlanketDepositConstants"

var initialState =[]

var blanketReducer = (state = initialState ,action) => {
    var {type, payload} = action
    switch (type) {
        case GET_ALL_DEPOSITS:
            return {...state,...payload.deposits}
            
         case DELETE_BLANKET_DEPOSIT:
            return {...payload.blanketToDelete}

            case EDIT_DEPOSIT: 
            return {...payload.blanket}
    
        default:
           return state
    }
}
export default blanketReducer