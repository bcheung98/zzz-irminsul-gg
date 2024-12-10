import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "rtk/store";
import {
    CharacterCostObject,
    TotalCostObject,
    WeaponCostObject,
} from "types/costs";

interface PlannerState {
    totalCost: TotalCostObject;
    characters: CharacterCostObject[];
    weapons: WeaponCostObject[];
}

const initialState: PlannerState = {
    totalCost: {
        credits: 0,
        characterXP: {
            characterXP1: 0,
            characterXP2: 0,
            characterXP3: 0,
        },
        weaponXP: {
            weaponXP1: 0,
            weaponXP2: 0,
            weaponXP3: 0,
        },
        bossMat: {},
        weeklyBossMat: {},
        hamsterCagePass: 0,
        characterAscension: {},
        characterSkill: {},
        weaponAscension: {},
    } as TotalCostObject,
    characters: [],
    weapons: [],
};

export const plannerSlice = createSlice({
    name: "planner",
    initialState,
    reducers: {
        setPlannerCharacters: (
            state,
            action: PayloadAction<CharacterCostObject[]>
        ) => {
            state.characters = action.payload;
        },
        setPlannerWeapons: (
            state,
            action: PayloadAction<WeaponCostObject[]>
        ) => {
            state.weapons = action.payload;
        },
    },
});

export const { setPlannerCharacters, setPlannerWeapons } = plannerSlice.actions;

export const getSelectedCharacters = (state: RootState) =>
    state.planner.characters;
export const getSelectedWeapons = (state: RootState) => state.planner.weapons;

export default plannerSlice.reducer;
