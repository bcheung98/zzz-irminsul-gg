import { objectKeys } from "./utils";
import { materialRarity } from "./materialRarity";
import { RarityMap } from "data/common";
import {
    characterXPMaterials,
    weaponXPMaterials,
} from "data/materials/xpMaterials";
import { characterAscensionMaterials } from "data/materials/characterAscensionMaterials";
import { characterSkillMaterials } from "data/materials/characterSkillMaterials";
import { weaponAscensionMaterials } from "data/materials/weaponAscensionMaterials";
import {
    formatExpertChallengeMaterials,
    formatNotoriousHuntMaterials,
} from "data/materials/characterCoreSkillMaterials";
import { Element, Rarity, Specialty } from "types/_common";
import {
    CharacterCost,
    TotalCostObject,
    TotalCostObjectKeys,
} from "types/costs";
import {
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

export interface MaterialCostData {
    name: string;
    rarity: Rarity;
    cost: number;
    img: string;
}

export function createMaterialCostData(costs: TotalCostObject) {
    const materials: MaterialCostData[] = [];
    const costArray: number[] = [];
    objectKeys(costs).forEach((material) => {
        const [minRarity, maxRarity] = materialRarity[material];
        let rarity = minRarity;
        objectKeys(costs[material]).forEach((mat) => {
            costArray.push(costs[material][mat]);
            let { name, img } = getMaterialData(material, mat);
            costs[material][mat] &&
                materials.push({
                    name: name,
                    rarity: RarityMap[rarity] as Rarity,
                    cost: costs[material][mat],
                    img: img,
                });
            rarity += 1;
            if (rarity > maxRarity) {
                rarity = minRarity;
            }
        });
    });
    return materials;
}

function getMaterialData(
    key: TotalCostObjectKeys,
    material = ""
): { name: string; rarity?: Rarity; img: string } {
    switch (key) {
        case "credits":
            return { name: "Denny", img: "Denny" };
        case "characterXP":
            return {
                name: characterXPMaterials[
                    `${material}` as keyof typeof characterXPMaterials
                ],
                img: `xp/${material}`,
            };
        case "weaponXP":
            return {
                name: weaponXPMaterials[
                    `${material}` as keyof typeof weaponXPMaterials
                ],
                img: `xp/${material}`,
            };
        case "bossMat":
            return {
                name: formatExpertChallengeMaterials(
                    material as ExpertChallengeMaterial
                ),
                img: `boss/${material}.gif`,
            };
        case "weeklyBossMat":
            return {
                name: formatNotoriousHuntMaterials(
                    material as NotoriousHuntMaterial
                ),
                img: `weekly/${material}.gif`,
            };
        case "hamsterCagePass":
            return {
                name: "Hamster Cage Pass",
                img: "Hamster_Cage_Pass",
            };
        case "characterAscension":
            let charAscensionMats =
                characterAscensionMaterials[material.slice(0, -1) as Specialty];
            return {
                name: charAscensionMats[
                    material as keyof typeof charAscensionMats
                ],
                img: `agent/ascension/${material}`,
            };
        case "characterSkill":
            let charSkillMats =
                characterSkillMaterials[material.slice(0, -1) as Element];
            return {
                name: charSkillMats[material as keyof typeof charSkillMats],
                img: `agent/skill/${material}`,
            };

        case "weaponAscension":
            let wepAscensionMats =
                weaponAscensionMaterials[material.slice(0, -1) as Specialty];
            return {
                name: wepAscensionMats[
                    material as keyof typeof wepAscensionMats
                ],
                img: `weapon/${material}`,
            };
    }
}

export function reduceMaterialCosts(costs: CharacterCost) {
    const result = {
        credits: {
            Credit: 0,
        },
        characterXP: {
            CharacterXP1: 0,
            CharacterXP2: 0,
            CharacterXP3: 0,
        },
        weaponXP: {
            WeaponXP1: 0,
            WeaponXP2: 0,
            WeaponXP3: 0,
        },
        bossMat: {},
        weeklyBossMat: {},
        hamsterCagePass: {
            "Hamster Cage Pass": 0,
        },
        characterAscension: {},
        characterSkill: {},
        weaponAscension: {},
    } as TotalCostObject;
    objectKeys(costs).forEach((material) => {
        objectKeys(costs[material]).forEach((mat) => {
            (result[material][mat] as number) = (
                costs[material][mat] as number[]
            ).reduce((a, c) => a + c);
        });
    });
    return result;
}
