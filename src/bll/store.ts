import {applyMiddleware, combineReducers, createStore} from "redux"
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {banksReducer} from "./banks-reducer";

const rootReducer = combineReducers({
   app: appReducer,
   banks: banksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppSelector: TypedUseSelectorHook<AppRootStateT> = useSelector

export type AppRootStateT = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;