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
import { Character } from "./character";
import { Weapon } from "./weapon";

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

export type PayloadCostObject = Record<
    TotalCostObjectKeys,
    number | Record<CostObjectKeys, number>
>;

export interface CharacterCost {
    credits: number[];
    characterXP: Record<CharacterXPMaterial, number[]>;
    bossMat: Record<ExpertChallengeMaterial, number[]>;
    weeklyBossMat: Record<NotoriousHuntMaterial, number[]>;
    hamsterCagePass: number[];
    characterAscension: Record<CharacterAscensionMaterial, number[]>;
    characterSkill: Record<CharacterSkillMaterial, number[]>;
}

export interface CharacterCostObject
    extends Pick<
        Character,
        "name" | "fullName" | "rarity" | "element" | "specialty" | "colors"
    > {
    costs: CharacterCost;
}

export interface WeaponCost {
    credits: number;
    weaponXP: Record<WeaponXPMaterial, number>;
    weaponAscension: Record<WeaponAscensionMaterial, number>;
}

export interface WeaponCostObject
    extends Pick<Weapon, "name" | "displayName" | "rarity" | "specialty"> {
    costs: WeaponCost;
}
