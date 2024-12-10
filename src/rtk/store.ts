import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";
import weaponReducer from "reducers/weapon";
import weaponFilterReducer from "reducers/weaponFilters";
import plannerReducer from "reducers/planner";

const store = configureStore({
    reducer: {
        characters: characterReducer,
        characterFilters: characterFilterReducer,
        weapons: weaponReducer,
        weaponFilters: weaponFilterReducer,
        planner: plannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
