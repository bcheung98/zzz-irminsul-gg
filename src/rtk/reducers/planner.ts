import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { reduceMaterialCosts } from "helpers/createMaterialCostData";
import { objectKeys } from "helpers/utils";
import { RootState } from "rtk/store";
import {
    CharacterCostObject,
    TotalCostObject,
    UpdateCostsPayload,
    WeaponCostObject,
} from "types/costs";

interface PlannerState {
    totalCost: TotalCostObject;
    characters: CharacterCostObject[];
    weapons: WeaponCostObject[];
}

const initialState: PlannerState = {
    totalCost: {
        credits: {
            Credit: 0,
        },
        characterXP: {
            CharacterXP1: 0,
            CharacterXP2: 0,
            CharacterXP3: 0,
        },
        weaponXP: {
            WeaponXP1: 0,
            WeaponXP2: 0,
            WeaponXP3: 0,
        },
        bossMat: {},
        weeklyBossMat: {},
        hamsterCagePass: {
            "Hamster Cage Pass": 0,
        },
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
        updateCharacterCosts: (
            state,
            action: PayloadAction<UpdateCostsPayload>
        ) => {
            const charIndex = state.characters.findIndex(
                ({ name }) => name === action.payload.name
            );
            if (charIndex !== -1) {
                const characterCosts = state.characters[charIndex].costs;
                const payloadCosts = action.payload.costs;
                const index = CostObjectSourceIndex[action.payload.type];
                objectKeys(characterCosts).forEach((material) => {
                    if (payloadCosts[material] !== undefined) {
                        const characterSubCosts = characterCosts[material];
                        objectKeys(characterSubCosts).forEach((mat, idx) => {
                            const values = Object.values(
                                payloadCosts[material]
                            );
                            (characterCosts[material][mat][index] as number) =
                                values[idx];
                        });
                    }
                });
            }
        },
        updateWeaponCosts: (
            state,
            action: PayloadAction<UpdateCostsPayload>
        ) => {
            const wepIndex = state.weapons.findIndex(
                ({ name }) => name === action.payload.name
            );
            if (wepIndex !== -1) {
                const weaponCosts = state.weapons[wepIndex].costs;
                const payloadCosts = action.payload.costs;
                objectKeys(weaponCosts).forEach((material) => {
                    if (payloadCosts[material] !== undefined) {
                        objectKeys(weaponCosts[material]).forEach(
                            (mat, idx) => {
                                const values = Object.values(
                                    payloadCosts[material]
                                );
                                (weaponCosts[material][mat] as number) =
                                    values[idx];
                            }
                        );
                    }
                });
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher<UnknownAction>(
            (action) => action.type.startsWith("planner/"),
            (state) => {
                const totalCostDraft = {
                    credits: {
                        Credit: 0,
                    },
                    characterXP: {
                        CharacterXP1: 0,
                        CharacterXP2: 0,
                        CharacterXP3: 0,
                    },
                    weaponXP: {
                        WeaponXP1: 0,
                        WeaponXP2: 0,
                        WeaponXP3: 0,
                    },
                    bossMat: {},
                    weeklyBossMat: {},
                    hamsterCagePass: {
                        "Hamster Cage Pass": 0,
                    },
                    characterAscension: {},
                    characterSkill: {},
                    weaponAscension: {},
                } as TotalCostObject;
                state.characters.forEach((character) => {
                    const costs = reduceMaterialCosts({ ...character.costs });
                    objectKeys(costs).forEach((material) => {
                        objectKeys(costs[material]).forEach((mat) => {
                            if (
                                !objectKeys(totalCostDraft[material]).includes(
                                    mat
                                )
                            ) {
                                (totalCostDraft[material][mat] as number) = 0;
                            }
                            (totalCostDraft[material][mat] as number) +=
                                costs[material][mat];
                        });
                    });
                });
                state.weapons.forEach((weapon) => {
                    const costs = { ...weapon.costs };
                    objectKeys(costs).forEach((material) => {
                        objectKeys(costs[material]).forEach((mat) => {
                            if (
                                !objectKeys(totalCostDraft[material]).includes(
                                    mat
                                )
                            ) {
                                (totalCostDraft[material][mat] as number) = 0;
                            }
                            (totalCostDraft[material][mat] as number) +=
                                costs[material][mat];
                        });
                    });
                });
                state.totalCost = totalCostDraft;
            }
        );
    },
});

export const {
    setPlannerCharacters,
    setPlannerWeapons,
    updateCharacterCosts,
    updateWeaponCosts,
} = plannerSlice.actions;

export const getSelectedCharacters = (
    state: RootState
): CharacterCostObject[] => state.planner.characters;
export const getSelectedWeapons = (state: RootState): WeaponCostObject[] =>
    state.planner.weapons;
export const getTotalCost = (state: RootState): TotalCostObject =>
    state.planner.totalCost;

export default plannerSlice.reducer;

export enum CostObjectSourceIndex {
    level,
    basic,
    dodge,
    assist,
    special,
    chain,
    core,
}
