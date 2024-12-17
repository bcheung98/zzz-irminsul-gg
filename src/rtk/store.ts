import { configureStore } from "@reduxjs/toolkit";
import { listenerMiddleware } from "./middleware";

import characterReducer from "reducers/character";
import characterFilterReducer from "reducers/characterFilters";
import weaponReducer from "reducers/weapon";
import weaponFilterReducer from "reducers/weaponFilters";
import driveDiscReducer from "reducers/driveDiscs";
import plannerReducer from "reducers/planner";
import bannerReducer from "reducers/banner";

const store = configureStore({
    reducer: {
        characters: characterReducer,
        characterFilters: characterFilterReducer,
        weapons: weaponReducer,
        weaponFilters: weaponFilterReducer,
        driveDiscs: driveDiscReducer,
        planner: plannerReducer,
        banners: bannerReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
