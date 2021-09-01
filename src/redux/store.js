import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import noteReducer from "./reducers/noteReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    userState: userReducer,
    noteState: noteReducer
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store