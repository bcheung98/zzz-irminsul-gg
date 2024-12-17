import { createSlice } from "@reduxjs/toolkit";
import {
    fetchCharacterBanners,
    fetchWeaponBanners,
    LoadingStatus,
} from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Banner } from "types/banner";

export interface BannerState {
    status: LoadingStatus;
    characterBanners: Banner[];
    weaponBanners: Banner[];
}

const storedCharacterBanners =
    localStorage.getItem("characterBanners") || "null";
const storedWeaponBanners = localStorage.getItem("weaponBanners") || "null";

const initialState: BannerState = {
    status: "idle",
    characterBanners:
        storedCharacterBanners !== "null"
            ? JSON.parse(storedCharacterBanners)
            : [],
    weaponBanners:
        storedWeaponBanners !== "null" ? JSON.parse(storedWeaponBanners) : [],
};

export const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacterBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacterBanners.fulfilled, (state, action) => {
            if (JSON.stringify(action.payload) !== storedCharacterBanners) {
                state.characterBanners = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharacterBanners.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchWeaponBanners.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchWeaponBanners.fulfilled, (state, action) => {
            if (JSON.stringify(action.payload) !== storedWeaponBanners) {
                state.weaponBanners = action.payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchWeaponBanners.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectCharacterBanners = (state: RootState): Banner[] =>
    state.banners.characterBanners;
export const selectWeaponBanners = (state: RootState): Banner[] =>
    state.banners.weaponBanners;

export default bannerSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchCharacterBanners.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedCharacterBanners) {
            localStorage.setItem("characterBanners", data);
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: fetchWeaponBanners.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedWeaponBanners) {
            localStorage.setItem("weaponBanners", data);
        }
    },
});
