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

export type CharacterXPMaterial = keyof typeof characterXPMaterials;
export type WeaponXPMaterial = keyof typeof weaponXPMaterials;

export type CharacterSkillMaterial = keyof typeof characterSkillMaterials;
// export type PhysicalMats = keyof (typeof characterSkillMaterials)["Physical"];
// export type FireMats = keyof (typeof characterSkillMaterials)["Fire"];
// export type IceMats = keyof (typeof characterSkillMaterials)["Ice"];
// export type ElectricMats = keyof (typeof characterSkillMaterials)["Electric"];
// export type EtherMats = keyof (typeof characterSkillMaterials)["Ether"];

export type CharacterAscensionMaterial =
    keyof typeof characterAscensionMaterials;
// export type AttackMats = keyof (typeof characterAscensionMaterials)["Attack"];
// export type StunMats = keyof (typeof characterAscensionMaterials)["Stun"];
// export type AnomalyMats = keyof (typeof characterAscensionMaterials)["Anomaly"];
// export type DefenseMats = keyof (typeof characterAscensionMaterials)["Defense"];
// export type SupportMats = keyof (typeof characterAscensionMaterials)["Support"];

export type ExpertChallengeMaterial = keyof typeof expertChallengeMaterials;
export type NotoriousHuntMaterial = keyof typeof notoroiusHuntMaterials;

export interface CharacterMaterials {
    bossMat: ExpertChallengeMaterial;
    weeklyBossMat: NotoriousHuntMaterial;
}
