import {
    expertChallengeMaterialNames,
    notoroiusHuntMaterialNames,
} from "data/materials/coreSkillMaterials";

export interface Materials {
    bossMat: ExpertChallengeMaterial;
    weeklyBossMat: NotoriousHuntMaterial;
}

export type ExpertChallengeMaterial =
    (typeof expertChallengeMaterialNames)[number];

export type NotoriousHuntMaterial = (typeof notoroiusHuntMaterialNames)[number];
