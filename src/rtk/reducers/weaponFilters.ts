import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";
import { Rarity, Specialty } from "types/_common";

export interface WeaponFilterState {
    specialty: Specialty[];
    rarity: Rarity[];
}

const initialState: WeaponFilterState = {
    specialty: [],
    rarity: [],
};

export const weaponFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setSpecialty: (state, action: PayloadAction<Specialty[]>) => {
            state.specialty = action.payload;
        },
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof WeaponFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
});

export const { setSpecialty, setRarity, clearFilters } =
    weaponFilterSlice.actions;
export const selectWeaponFilters = (state: RootState) => state.weaponFilters;
export const activeWeaponFilters = (state: RootState) =>
    Object.keys(state.weaponFilters).filter(
        (filter) =>
            state.weaponFilters[filter as keyof WeaponFilterState].length
    ).length > 0;

export default weaponFilterSlice.reducer;
