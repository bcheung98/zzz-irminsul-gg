import {
    characterXPMaterials,
    weaponXPMaterials,
} from "data/materials/xpMaterials";
import { characterSkillMaterials } from "data/materials/characterSkillMaterials";
import { characterAscensionMaterials } from "data/materials/characterAscensionMaterials";
import {
    expertChallengeMaterials,
    notoroiusHuntMaterials,
} from "data/materials/characterCoreSkillMaterials";
import { weaponAscensionMaterials } from "data/materials/weaponAscensionMaterials";

export type CharacterXPMaterial = keyof typeof characterXPMaterials;
export type WeaponXPMaterial = keyof typeof weaponXPMaterials;

type CharacterSkillMaterialType = typeof characterSkillMaterials;
export type CharacterSkillMaterial =
    | keyof CharacterSkillMaterialType
    | keyof CharacterSkillMaterialType["Physical"]
    | keyof CharacterSkillMaterialType["Fire"]
    | keyof CharacterSkillMaterialType["Ice"]
    | keyof CharacterSkillMaterialType["Electric"]
    | keyof CharacterSkillMaterialType["Ether"];

type CharacterAscensionMaterialType = typeof characterAscensionMaterials;
export type CharacterAscensionMaterial =
    | keyof CharacterAscensionMaterialType
    | keyof CharacterAscensionMaterialType["Attack"]
    | keyof CharacterAscensionMaterialType["Stun"]
    | keyof CharacterAscensionMaterialType["Anomaly"]
    | keyof CharacterAscensionMaterialType["Defense"]
    | keyof CharacterAscensionMaterialType["Support"];

export type ExpertChallengeMaterial = keyof typeof expertChallengeMaterials;
export type NotoriousHuntMaterial = keyof typeof notoroiusHuntMaterials;

export interface CharacterMaterials {
    bossMat: ExpertChallengeMaterial;
    weeklyBossMat: NotoriousHuntMaterial;
}

type WeaponAscensionMaterialType = typeof weaponAscensionMaterials;
export type WeaponAscensionMaterial =
    | keyof WeaponAscensionMaterialType
    | keyof WeaponAscensionMaterialType["Attack"]
    | keyof WeaponAscensionMaterialType["Stun"]
    | keyof WeaponAscensionMaterialType["Anomaly"]
    | keyof WeaponAscensionMaterialType["Defense"]
    | keyof WeaponAscensionMaterialType["Support"];
