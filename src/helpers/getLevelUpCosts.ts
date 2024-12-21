import { PayloadCostObject } from "types/costs";
import { objectKeys, range } from "./utils";
import {
    characterCoreSkill,
    characterLevel,
    characterSkill,
    weaponLevel,
} from "data/levelUpCosts";
import { Weapon } from "types/weapon";

export function getCharacterLevelCost(
    [start, stop]: number[],
    selected: boolean,
    withXP = true
) {
    const costs = { ...characterLevel };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        characterXP1,
        characterXP2,
        characterXP3,
        characterAscension1,
        characterAscension2,
        characterAscension3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterXP1,
            characterXP2,
            characterXP3,
            characterAscension1,
            characterAscension2,
            characterAscension3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        characterXP: {
            characterXP1: characterXP1,
            characterXP2: characterXP2,
            characterXP3: characterXP3,
        },
        characterAscension: {
            characterAscension1: characterAscension1,
            characterAscension2: characterAscension2,
            characterAscension3: characterAscension3,
        },
    } as PayloadCostObject;
}

export function getCharacterSkillCost(
    [start, stop]: number[],
    selected: boolean
) {
    const costs = { ...characterSkill };
    let [
        credits,
        characterSkill1,
        characterSkill2,
        characterSkill3,
        hamsterCagePass,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            characterSkill1,
            characterSkill2,
            characterSkill3,
            hamsterCagePass,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        characterSkill: {
            characterSkill1: characterSkill1,
            characterSkill2: characterSkill2,
            characterSkill3: characterSkill3,
        },
        hamsterCagePass: { "Hamster Cage Pass": hamsterCagePass },
    } as PayloadCostObject;
}

export function getCharacterCoreSkillCost(
    [start, stop]: number[],
    selected: boolean
) {
    const costs = { ...characterCoreSkill };
    let [credits, bossMat, weeklyBossMat] = range(
        0,
        objectKeys(costs).length,
        0
    );
    if (selected) {
        [credits, bossMat, weeklyBossMat] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        bossMat: {
            bossMat: bossMat,
        },
        weeklyBossMat: {
            weeklyBossMat: weeklyBossMat,
        },
    } as PayloadCostObject;
}

export function getWeaponLevelCost(
    rarity: Weapon["rarity"],
    [start, stop]: number[],
    selected: boolean,
    withXP = true
) {
    const costs = { ...weaponLevel(rarity) };
    if (!withXP) {
        objectKeys(costs).forEach((material) => {
            costs[material] = costs[material]
                .map((value, index) => (index % 2 === 0 ? value : -1))
                .filter((i) => (i! -= -1));
        });
    }
    let [
        credits,
        weaponXP1,
        weaponXP2,
        weaponXP3,
        weaponAscension1,
        weaponAscension2,
        weaponAscension3,
    ] = range(0, objectKeys(costs).length, 0);
    if (selected) {
        [
            credits,
            weaponXP1,
            weaponXP2,
            weaponXP3,
            weaponAscension1,
            weaponAscension2,
            weaponAscension3,
        ] = calculateCosts(costs, start, stop);
    }
    return {
        credits: {
            Credit: credits,
        },
        weaponXP: {
            weaponXP1: weaponXP1,
            weaponXP2: weaponXP2,
            weaponXP3: weaponXP3,
        },
        weaponAscension: {
            weaponAscension1: weaponAscension1,
            weaponAscension2: weaponAscension2,
            weaponAscension3: weaponAscension3,
        },
    } as PayloadCostObject;
}

function calculateCosts<T extends { [key: string]: number[] }>(
    costs: T,
    start: number,
    stop: number
) {
    return Object.values(costs).map((arr) =>
        arr.slice(start, stop).reduce((a, c) => a + c)
    );
}
