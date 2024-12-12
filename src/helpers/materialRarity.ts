import { TotalCostObjectKeys } from "types/costs";

export const materialRarity: Record<TotalCostObjectKeys, [number, number]> = {
    credits: [3, 3],
    characterXP: [2, 4],
    weaponXP: [2, 4],
    bossMat: [4, 4],
    weeklyBossMat: [5, 5],
    hamsterCagePass: [5, 5],
    characterAscension: [2, 4],
    characterSkill: [2, 4],
    weaponAscension: [2, 4],
};
