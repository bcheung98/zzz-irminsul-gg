import { Rarity } from "types/_common";
import { TotalCostObjectKeys } from "types/costs";

export const materialRarity: Record<TotalCostObjectKeys, [Rarity, Rarity]> = {
    credits: ["B", "B"],
    characterXP: ["C", "A"],
    weaponXP: ["C", "A"],
    bossMat: ["A", "A"],
    weeklyBossMat: ["S", "S"],
    hamsterCagePass: ["S", "S"],
    characterAscension: ["C", "A"],
    characterSkill: ["C", "A"],
    weaponAscension: ["C", "A"],
};
