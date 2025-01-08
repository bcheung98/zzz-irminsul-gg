import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { fetchWeapons, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Weapon } from "types/weapon";

export interface WeaponState {
    status: LoadingStatus;
    weapons: Weapon[];
}

const storedWeapons = localStorage.getItem("data/weapons") || "null";
localStorage.removeItem("weapons");

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

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
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedWeapons) {
                state.weapons = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchWeapons.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectWeapons = (state: RootState): Weapon[] =>
    state.weapons.weapons;

export default weaponSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchWeapons.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedWeapons) {
            localStorage.setItem("data/weapons", data);
        }
    },
});
