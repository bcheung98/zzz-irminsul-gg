import { configureStore } from "@reduxjs/toolkit"
import characterReducer from "reducers/character"
import { listenerMiddleware } from "./middleware"

const store = configureStore({
    reducer: {
        characters: characterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch