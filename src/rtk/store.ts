import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";

const store = configureStore({
    reducer: {
        characters: characterReducer,
        characterFilters: characterFilterReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
