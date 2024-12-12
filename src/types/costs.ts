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
import { CostObjectSourceIndex } from "reducers/planner";

export type CostObjectKeys =
    | TotalCostObjectKeys
    | CharacterXPMaterial
    | ExpertChallengeMaterial
    | NotoriousHuntMaterial
    | CharacterSkillMaterial
    | CharacterAscensionMaterial
    | keyof typeof characterLevel
    | keyof typeof characterSkill
    | keyof ReturnType<typeof weaponLevel>;

export type TotalCostObjectKeys = keyof TotalCostObject;

export interface TotalCostObject {
    credits: Record<"Credit", number>;
    characterXP: Record<CharacterXPMaterial, number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    bossMat: Record<ExpertChallengeMaterial, number>;
    weeklyBossMat: Record<NotoriousHuntMaterial, number>;
    hamsterCagePass: Record<"Hamster Cage Pass", number>;
    characterAscension: Record<CharacterAscensionMaterial, number>;
    characterSkill: Record<CharacterSkillMaterial, number>;
    weaponAscension: Record<WeaponAscensionMaterial, number>;
}

export type PayloadCostObject = Record<
    TotalCostObjectKeys,
    Record<CostObjectKeys, number>
>;

export interface UpdateCostsPayload {
    name: string;
    type: keyof typeof CostObjectSourceIndex;
    costs: PayloadCostObject;
}

export interface CharacterCost {
    credits: Record<"Credit", number[]>;
    characterXP: Record<CharacterXPMaterial, number[]>;
    bossMat: Record<ExpertChallengeMaterial, number[]>;
    weeklyBossMat: Record<NotoriousHuntMaterial, number[]>;
    hamsterCagePass: Record<"Hamster Cage Pass", number[]>;
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
    credits: Record<"Credit", number>;
    weaponXP: Record<WeaponXPMaterial, number>;
    weaponAscension: Record<WeaponAscensionMaterial, number>;
}

export interface WeaponCostObject
    extends Pick<Weapon, "name" | "displayName" | "rarity" | "specialty"> {
    costs: WeaponCost;
}
