import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";
import { AttackType, Element, Faction, Rarity, Specialty } from "types/_common";

export interface CharacterFilterState {
    element: Element[];
    specialty: Specialty[];
    attackType: AttackType[];
    rarity: Rarity[];
    faction: Faction[];
}

const initialState: CharacterFilterState = {
    element: [],
    specialty: [],
    attackType: [],
    rarity: [],
    faction: [],
};

export const characterFilterSlice = createSlice({
    name: "characterFilters",
    initialState,
    reducers: {
        setElement: (state, action: PayloadAction<Element[]>) => {
            state.element = action.payload;
        },
        setSpecialty: (state, action: PayloadAction<Specialty[]>) => {
            state.specialty = action.payload;
        },
        setAttackType: (state, action: PayloadAction<AttackType[]>) => {
            state.attackType = action.payload;
        },
        setRarity: (state, action: PayloadAction<Rarity[]>) => {
            state.rarity = action.payload;
        },
        setFaction: (state, action: PayloadAction<Faction[]>) => {
            state.faction = action.payload;
        },
        clearFilters: (
            state,
            action: PayloadAction<keyof CharacterFilterState | undefined>
        ) => {
            if (!action.payload) {
                return initialState;
            } else {
                state[action.payload] = [];
            }
        },
    },
});

export const {
    setElement,
    setSpecialty,
    setAttackType,
    setRarity,
    setFaction,
    clearFilters,
} = characterFilterSlice.actions;
export const selectCharacterFilters = (state: RootState) =>
    state.characterFilters;
export const activeCharacterFilters = (state: RootState) =>
    Object.keys(state.characterFilters).filter(
        (filter) =>
            state.characterFilters[filter as keyof CharacterFilterState].length
    ).length > 0;

export default characterFilterSlice.reducer;
