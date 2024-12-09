import {
    expertChallengeMaterials,
    notoroiusHuntMaterials,
} from "data/materials/characterCoreSkillMaterials";

export type ExpertChallengeMaterial = keyof typeof expertChallengeMaterials;
export type NotoriousHuntMaterial = keyof typeof notoroiusHuntMaterials;

export interface CharacterMaterials {
    bossMat: ExpertChallengeMaterial;
    weeklyBossMat: NotoriousHuntMaterial;
}
