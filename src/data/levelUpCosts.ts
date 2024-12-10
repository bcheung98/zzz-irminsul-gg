import { Weapon } from "types/weapon";
import { RarityMap } from "./common";

export const characterLevel = {
    credits: [0, 0, 24000, 0, 56000, 0, 120000, 0, 200000, 0, 400000, 0],
    characterXP1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterXP2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterXP3: [0, 2, 0, 8, 0, 20, 0, 45, 0, 75, 0, 150],
    characterAscension1: [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterAscension2: [0, 0, 0, 0, 12, 0, 20, 0, 0, 0, 0, 0],
    characterAscension3: [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 20, 0],
};

export const characterSkill = {
    credits: [
        0, 2000, 3000, 6000, 9000, 12000, 18000, 45000, 67500, 90000, 112500,
        135000,
    ],
    characterSkill1: [0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    characterSkill2: [0, 0, 0, 2, 3, 4, 6, 0, 0, 0, 0, 0],
    characterSkill3: [0, 0, 0, 0, 0, 0, 0, 5, 8, 10, 12, 15],
    hamsterCagePass: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
};

export const characterCoreSkill = {
    credits: [0, 5000, 12000, 28000, 60000, 100000, 200000],
    bossMat: [0, 0, 2, 4, 9, 15, 30],
    weeklyBossMat: [0, 0, 0, 0, 2, 3, 4],
};

export const weaponLevel = (rarity: Weapon["rarity"]) => {
    const rank = RarityMap[rarity] - 3;
    return {
        credits: weaponCosts.credits[rank],
        weaponXP1: weaponCosts.weaponXP1[rank],
        weaponXP2: weaponCosts.weaponXP2[rank],
        weaponXP3: weaponCosts.weaponXP3[rank],
        weaponAscension1: weaponCosts.weaponAscension1[rank],
        weaponAscension2: weaponCosts.weaponAscension2[rank],
        weaponAscension3: weaponCosts.weaponAscension3[rank],
    };
};

const weaponCosts = {
    credits: [
        [0, 0, 7200, 0, 16800, 0, 36000, 0, 60000, 0, 120000, 0],
        [0, 0, 9600, 0, 22400, 0, 48000, 0, 80000, 0, 160000, 0],
        [0, 0, 12000, 0, 28000, 0, 60000, 0, 100000, 0, 200000, 0],
    ],
    weaponXP1: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0],
    ],
    weaponXP2: [
        [0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    ],
    weaponXP3: [
        [0, 0, 0, 3, 0, 8, 0, 18, 0, 30, 0, 60],
        [0, 1, 0, 4, 0, 10, 0, 23, 0, 40, 0, 80],
        [0, 1, 0, 5, 0, 13, 0, 30, 0, 50, 0, 100],
    ],
    weaponAscension1: [
        [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    weaponAscension2: [
        [0, 0, 0, 0, 7, 0, 12, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 10, 0, 16, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 12, 0, 20, 0, 0, 0, 0, 0],
    ],
    weaponAscension3: [
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 12, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 16, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 20, 0],
    ],
};
