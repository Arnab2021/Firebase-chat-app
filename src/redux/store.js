import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthenticationReducer } from './reducers/AuthenticationReducer'
import { ChatScreenReducer } from './reducers/ChatScreenReducer'
import { SaveProfileInfoReducer } from "./reducers/SaveProfileInfoReducer";
import { DashboardReducer } from "./reducers/DashboardReducer";



const combinedReducers = combineReducers({
    AuthenticationReducer: AuthenticationReducer,
    ChatScreenReducer: ChatScreenReducer,
    SaveProfileInfoReducer: SaveProfileInfoReducer,
    DashboardReducer: DashboardReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = undefined
    }
    return combinedReducers(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunk))

export { store }