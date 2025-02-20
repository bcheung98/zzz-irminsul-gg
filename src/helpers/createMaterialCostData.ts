import { objectKeys } from "./utils";
import { formatMaterialName } from "./materials";
import { materialRarity } from "./materialRarity";
import { RarityMap } from "data/common";
import {
    getCharacterXPMaterial,
    getWeaponXPMaterial,
} from "data/materials/xpMaterials";
import { getCharacterAscensionMaterial } from "data/materials/characterAscensionMaterials";
import { getCharacterSkillMaterial } from "data/materials/characterSkillMaterials";
import { getWeaponAscensionMaterial } from "data/materials/weaponAscensionMaterials";
import {
    getExpertChallengeMaterial,
    getNotoriousHuntMaterial,
} from "data/materials/characterCoreSkillMaterials";
import { Rarity } from "types/_common";
import {
    CharacterCost,
    TotalCostObject,
    TotalCostObjectKeys,
} from "types/costs";
import { Material } from "types/materials";

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
    let mat: Material | undefined;
    switch (key) {
        case "credits":
            return { name: "Denny", rarity: "B", img: "Denny" };
        case "characterXP":
            mat = getCharacterXPMaterial({ tag: material, id: material })!;
            return {
                name: mat.displayName,
                rarity: mat.rarity,
                img: `xp/${mat.tag}`,
            };
        case "weaponXP":
            mat = getWeaponXPMaterial({ tag: material, id: material })!;
            return {
                name: mat.displayName,
                rarity: mat.rarity,
                img: `xp/${mat.tag}`,
            };
        case "bossMat":
            mat = getExpertChallengeMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `boss/${mat.tag}.gif`,
            };
        case "weeklyBossMat":
            mat = getNotoriousHuntMaterial({ tag: material, id: material })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `weekly/${mat.tag}.gif`,
            };
        case "hamsterCagePass":
            return {
                name: "Hamster Cage Pass",
                rarity: "S",
                img: "Hamster_Cage_Pass",
            };
        case "characterAscension":
            mat = getCharacterAscensionMaterial({
                tag: material,
                id: material,
            })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `agent/ascension/${mat.tag}`,
            };
        case "characterSkill":
            mat = getCharacterSkillMaterial({
                tag: material,
                id: material,
            })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `agent/skill/${mat.tag}`,
            };
        case "weaponAscension":
            mat = getWeaponAscensionMaterial({
                tag: material,
                id: material,
            })!;
            return {
                name: formatMaterialName(mat),
                rarity: mat.rarity,
                img: `weapon/${mat.tag}`,
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
