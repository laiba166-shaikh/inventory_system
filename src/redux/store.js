import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { persistStore } from 'redux-persist';
import pReducer from "./rootReducer";

const middlewares=[]

export const store=createStore(
    pReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(store);