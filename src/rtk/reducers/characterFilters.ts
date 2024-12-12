import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";
import { AttackType, Element, Faction, Rarity, Specialty } from "types/_common";
import {
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

export interface CharacterFilterState {
    element: Element[];
    specialty: Specialty[];
    attackType: AttackType[];
    rarity: Rarity[];
    faction: Faction[];
    bossMat: ExpertChallengeMaterial[];
    weeklyBossMat: NotoriousHuntMaterial[];
}

const initialState: CharacterFilterState = {
    element: [],
    specialty: [],
    attackType: [],
    rarity: [],
    faction: [],
    bossMat: [],
    weeklyBossMat: [],
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
        setBossMat: (
            state,
            action: PayloadAction<ExpertChallengeMaterial[]>
        ) => {
            state.bossMat = action.payload;
        },
        setWeeklyBossMat: (
            state,
            action: PayloadAction<NotoriousHuntMaterial[]>
        ) => {
            state.weeklyBossMat = action.payload;
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
    setBossMat,
    setWeeklyBossMat,
    clearFilters,
} = characterFilterSlice.actions;

export const selectCharacterFilters = (
    state: RootState
): CharacterFilterState => state.characterFilters;
export const activeCharacterFilters = (state: RootState): boolean =>
    Object.keys(state.characterFilters).filter(
        (filter) =>
            state.characterFilters[filter as keyof CharacterFilterState].length
    ).length > 0;

export default characterFilterSlice.reducer;
