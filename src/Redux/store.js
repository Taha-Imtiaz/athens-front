
import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "./rootReducer"
import thunk from 'redux-thunk'

let middlewares = [thunk]

let store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middlewares)))
export default store