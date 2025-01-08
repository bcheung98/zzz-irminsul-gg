import { NestedKeyOf } from "./_common";
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

export type CharacterSkillMaterialKeys = keyof typeof characterSkillMaterials;
export type CharacterSkillMaterial = NestedKeyOf<
    typeof characterSkillMaterials
>;

export type CharacterAscensionMaterialKeys =
    keyof typeof characterAscensionMaterials;
export type CharacterAscensionMaterial = NestedKeyOf<
    typeof characterAscensionMaterials
>;

export type ExpertChallengeMaterial = keyof typeof expertChallengeMaterials;
export type NotoriousHuntMaterial = keyof typeof notoroiusHuntMaterials;

export interface Materials {
    skillMat?: CharacterSkillMaterialKeys;
    ascensionMat?: CharacterAscensionMaterialKeys;
    bossMat?: ExpertChallengeMaterial;
    weeklyBossMat?: NotoriousHuntMaterial;
}

export type CharacterMaterials = Required<Materials>;

export type WeaponAscensionMaterialKeys = keyof typeof weaponAscensionMaterials;
export type WeaponAscensionMaterial = NestedKeyOf<
    typeof weaponAscensionMaterials
>;

export interface WeaponMaterials {
    ascensionMat: WeaponAscensionMaterial;
}
