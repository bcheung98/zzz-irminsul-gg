import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    
})

const store = configureStore({
    reducer: rootReducer
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch