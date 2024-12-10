import { characterLevel, characterSkill, weaponLevel } from "data/levelUpCosts";
import {
    CharacterAscensionMaterial,
    CharacterSkillMaterial,
    CharacterXPMaterial,
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
    WeaponAscensionMaterial,
    WeaponXPMaterial,
} from "./materials";

export type CostObjectKeys =
    | TotalCostObjectKeys
    | CharacterSkillMaterial
    | CharacterAscensionMaterial
    | keyof typeof characterLevel
    | keyof typeof characterSkill
    | keyof ReturnType<typeof weaponLevel>;

export type TotalCostObjectKeys = keyof TotalCostObject;

export interface TotalCostObject {
    credits: number;
    characterXP: Record<CharacterXPMaterial, number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    bossMat: Record<ExpertChallengeMaterial, number>;
    weeklyBossMat: Record<NotoriousHuntMaterial, number>;
    hamsterCagePass: number;
    characterAscension: Record<CharacterAscensionMaterial, number>;
    characterSkill: Record<CharacterSkillMaterial, number>;
    weaponAscension: Record<WeaponAscensionMaterial, number>;
}

export type CostObject = Record<CostObjectKeys, number>;
export type PayloadCostObject = Record<
    TotalCostObjectKeys,
    number | CostObject
>;
