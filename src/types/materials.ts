import {
    expertChallengeMaterials,
    notoroiusHuntMaterials,
} from "data/materials/coreSkillMaterials";

export type ExpertChallengeMaterial = keyof typeof expertChallengeMaterials;
export type NotoriousHuntMaterial = keyof typeof notoroiusHuntMaterials;

export interface CharacterMaterials {
    bossMat: ExpertChallengeMaterial;
    weeklyBossMat: NotoriousHuntMaterial;
}
