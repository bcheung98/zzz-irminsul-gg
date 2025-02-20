import { Rarity } from "./_common";
import {
    characterXPMatNames,
    weaponXPMatNames,
} from "data/materials/xpMaterials";
import { characterSkillMatNames } from "data/materials/characterSkillMaterials";
import { characterAscensionMatNames } from "data/materials/characterAscensionMaterials";
import {
    expertChallengeMatNames,
    notoriousHuntMatNames,
} from "data/materials/characterCoreSkillMaterials";
import { weaponAscensionMatNames } from "data/materials/weaponAscensionMaterials";
import { Version } from "./version";

export type MaterialCategory =
    | "credits"
    | "characterXP"
    | "weaponXP"
    | "bossMat"
    | "weeklyBossMat"
    | "hamsterCagePass"
    | "characterAscension"
    | "characterSkill"
    | "weaponAscension";

export interface Material {
    id: string;
    category: MaterialCategory;
    tag: string;
    name: string;
    displayName: string;
    source?: string;
    rarity?: Rarity;
    release: Version;
}

export type CharacterXPMaterial = (typeof characterXPMatNames)[number];
export type WeaponXPMaterial = (typeof weaponXPMatNames)[number];

export type CharacterSkillMaterial = (typeof characterSkillMatNames)[number];
export type CharacterAscensionMaterial =
    (typeof characterAscensionMatNames)[number];
export type ExpertChallengeMaterial = (typeof expertChallengeMatNames)[number];
export type NotoriousHuntMaterial = (typeof notoriousHuntMatNames)[number];

export type WeaponAscensionMaterial = (typeof weaponAscensionMatNames)[number];

export interface Materials {
    skillMat?: CharacterSkillMaterial;
    ascensionMat?: CharacterAscensionMaterial;
    bossMat?: ExpertChallengeMaterial;
    weeklyBossMat?: NotoriousHuntMaterial;
}

export type CharacterMaterials = Required<Materials>;
export interface WeaponMaterials {
    ascensionMat: WeaponAscensionMaterial;
}
