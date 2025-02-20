import {
    createSlice,
    isAnyOf,
    PayloadAction,
    UnknownAction,
} from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { reduceMaterialCosts } from "helpers/createMaterialCostData";
import { objectKeys } from "helpers/utils";
import {
    CharacterCostObject,
    CostObjectSourceIndex,
    PayloadData,
    TotalCostObject,
    UpdateCostsPayload,
    WeaponCostObject,
} from "types/costs";
import { Character } from "types/character";
import { Weapon } from "types/weapon";
import {
    getCharacterCoreSkillCost,
    getCharacterLevelCost,
    getCharacterSkillCost,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";

interface PlannerState {
    totalCost: TotalCostObject;
    characters: CharacterCostObject[];
    weapons: WeaponCostObject[];
    hidden: string[];
}

const storedCharacters = localStorage.getItem("planner/characters") || "null";
const storedWeapons = localStorage.getItem("planner/weapons") || "null";
const storedHidden = localStorage.getItem("planner/hidden") || "null";

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
    characters: parseLocalStorage(storedCharacters),
    weapons: parseLocalStorage(storedWeapons),
    hidden: storedHidden !== "null" ? JSON.parse(storedHidden) : [],
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
                let costs;
                const { start, stop, selected } = action.payload
                    .data as Required<PayloadData>;
                switch (action.payload.type) {
                    case "level":
                        costs = getCharacterLevelCost({
                            start,
                            stop,
                            selected,
                            withXP: true,
                        });
                        break;
                    case "basic":
                    case "dodge":
                    case "assist":
                    case "special":
                    case "chain":
                        costs = getCharacterSkillCost({
                            start,
                            stop,
                            selected,
                        });
                        break;
                    case "core":
                        costs = getCharacterCoreSkillCost({
                            start,
                            stop,
                            selected,
                        });
                        break;
                }
                state.characters[charIndex].values[action.payload.type] = {
                    start,
                    stop,
                    selected,
                };
                const index = CostObjectSourceIndex[action.payload.type];
                objectKeys(characterCosts).forEach((material) => {
                    if (costs[material] !== undefined) {
                        const characterSubCosts = characterCosts[material];
                        objectKeys(characterSubCosts).forEach((mat, idx) => {
                            const values = Object.values(costs[material]);
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
                const { rarity, start, stop, selected } = action.payload
                    .data as Required<PayloadData>;
                let costs = getWeaponLevelCost({
                    start,
                    stop,
                    selected,
                    rarity,
                    withXP: true,
                });
                state.weapons[wepIndex].values.level = {
                    start,
                    stop,
                    selected,
                };
                objectKeys(weaponCosts).forEach((material) => {
                    if (costs[material] !== undefined) {
                        objectKeys(weaponCosts[material]).forEach(
                            (mat, idx) => {
                                const values = Object.values(costs[material]);
                                (weaponCosts[material][mat] as number) =
                                    values[idx];
                            }
                        );
                    }
                });
            }
        },
        toggleHidden: (state, action: PayloadAction<string>) => {
            !state.hidden.includes(action.payload)
                ? state.hidden.push(action.payload)
                : state.hidden.splice(state.hidden.indexOf(action.payload), 1);
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
                state.characters
                    .filter((character) => !state.hidden.includes(character.id))
                    .forEach((character) => {
                        const costs = reduceMaterialCosts({
                            ...character.costs,
                        });
                        objectKeys(costs).forEach((material) => {
                            objectKeys(costs[material]).forEach((mat) => {
                                if (
                                    !objectKeys(
                                        totalCostDraft[material]
                                    ).includes(mat)
                                ) {
                                    (totalCostDraft[material][
                                        mat
                                    ] as number) = 0;
                                }
                                (totalCostDraft[material][mat] as number) +=
                                    costs[material][mat];
                            });
                        });
                    });
                state.weapons
                    .filter((weapon) => !state.hidden.includes(weapon.id))
                    .forEach((weapon) => {
                        const costs = { ...weapon.costs };
                        objectKeys(costs).forEach((material) => {
                            objectKeys(costs[material]).forEach((mat) => {
                                if (
                                    !objectKeys(
                                        totalCostDraft[material]
                                    ).includes(mat)
                                ) {
                                    (totalCostDraft[material][
                                        mat
                                    ] as number) = 0;
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
    selectors: {
        getSelectedCharacters: (state): CharacterCostObject[] =>
            state.characters,
        getSelectedWeapons: (state): WeaponCostObject[] => state.weapons,
        getTotalCost: (state): TotalCostObject => state.totalCost,
        getHiddenItems: (state): string[] => state.hidden,
    },
});

export const {
    setPlannerCharacters,
    setPlannerWeapons,
    updateCharacterCosts,
    updateWeaponCosts,
    toggleHidden,
} = plannerSlice.actions;

export const {
    getSelectedCharacters,
    getSelectedWeapons,
    getTotalCost,
    getHiddenItems,
} = plannerSlice.selectors;

export default plannerSlice.reducer;

startAppListening({
    matcher: isAnyOf(setPlannerCharacters, updateCharacterCosts),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.characters);
        localStorage.setItem("planner/characters", data);
    },
});

startAppListening({
    matcher: isAnyOf(setPlannerWeapons, updateWeaponCosts),
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.weapons);
        localStorage.setItem("planner/weapons", data);
    },
});

startAppListening({
    actionCreator: toggleHidden,
    effect: (_, state) => {
        const data = JSON.stringify(state.getState().planner.hidden);
        localStorage.setItem("planner/hidden", data);
    },
});

function parseLocalStorage<T extends CharacterCostObject | WeaponCostObject>(
    dataString: string
) {
    if (dataString !== "null") {
        const reformattedData = (JSON.parse(dataString) as T[])
            .map((item) => {
                const type = "element" in item ? "character" : "weapon";
                const data: Character[] | Weapon[] = JSON.parse(
                    localStorage.getItem(`data/${type}s`)!
                );
                const target: Character | Weapon = data.find(
                    (d) => d.id === Number(item.id.split("_")[1])
                )!;
                const id = `${type}_${target.id}`;
                return {
                    ...item,
                    id: id,
                    name: target.name,
                    displayName: target.displayName,
                };
            })
            .filter((item) => item.dataFormat !== undefined);
        if (reformattedData.length === 0) {
            localStorage.removeItem("planner/characters");
            localStorage.removeItem("planner/weapons");
            localStorage.removeItem("planner/hidden");
        }
        return reformattedData;
    } else {
        return [];
    }
}
