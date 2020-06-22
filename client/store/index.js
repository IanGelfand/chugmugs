import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import oneMugReducer from './oneMug'
import allMugsReducer from './allMugs'
import cartReducer from './userCart'

const reducer = combineReducers({
  user: userReducer,
  oneMug: oneMugReducer,
  allMugs: allMugsReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
