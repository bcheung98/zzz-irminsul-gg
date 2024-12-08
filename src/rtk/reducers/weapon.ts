import { createSlice } from "@reduxjs/toolkit";
import { fetchWeapons, LoadingStatus } from "helpers/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Weapon } from "types/weapon";

export interface WeaponState {
    status: LoadingStatus;
    weapons: Weapon[];
}

const storedWeapons = localStorage.getItem("weapons") || "null";

const initialState: WeaponState = {
    status: "idle",
    weapons: storedWeapons !== "null" ? JSON.parse(storedWeapons) : [],
};

export const weaponSlice = createSlice({
    name: "weapons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeapons.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchWeapons.fulfilled, (state, action) => {
            if (JSON.stringify(action.payload) !== storedWeapons) {
                state.weapons = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchWeapons.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectWeapons = (state: RootState) => state.weapons.weapons;
export default weaponSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchWeapons.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedWeapons) {
            localStorage.setItem("weapons", data);
        }
    },
});
