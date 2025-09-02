import { BannerOption, BannerType } from "types/banner";
import { Character } from "types/character";
import { Weapon } from "types/weapon";

export function createBannerData(
    name: string,
    type: BannerType,
    characters: Character[],
    weapons: Weapon[]
) {
    let data: BannerOption = {
        id: -1,
        name: "TBA",
        displayName: "TBA",
        rarity: "A",
        specialty: "",
    };
    if (type === "character") {
        let char = characters.find((char) => char.name === name);
        if (char) {
            data.id = char.id;
            data.name = char.name;
            data.displayName = char.fullName;
            data.rarity = char.rarity;
            data.element = char.subElement || char.element;
            data.specialty = char.specialty;
        }
    } else {
        let wep = weapons.find((wep) => wep.name === name);
        if (wep) {
            data.id = wep.id;
            data.name = wep.name;
            data.displayName = wep.displayName;
            data.rarity = wep.rarity;
            data.specialty = wep.specialty;
        }
    }
    return data;
}
