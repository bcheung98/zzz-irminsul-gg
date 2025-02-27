import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";
import { RarityMap } from "data/common";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.specialty.length > 0) {
        chars = chars.filter((char) =>
            filters.specialty.includes(char.specialty)
        );
    }
    if (filters.attackType.length > 0) {
        chars = chars.filter((char) =>
            filters.attackType.includes(char.attackType)
        );
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.faction.length > 0) {
        chars = chars.filter((char) => filters.faction.includes(char.faction));
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.bossMat.includes(char.materials.bossMat)
        );
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.weeklyBossMat.includes(char.materials.weeklyBossMat)
        );
    }
    if (searchValue) {
        chars = chars.filter(
            (char) =>
                char.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase()) ||
                char.fullName
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
        );
    }

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort((a, b) => a.fullName.localeCompare(b.fullName));
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    RarityMap[b.rarity] - RarityMap[a.rarity] ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "element":
            chars = chars.sort(
                (a, b) =>
                    a.element.localeCompare(b.element) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "specialty":
            chars = chars.sort(
                (a, b) =>
                    a.specialty.localeCompare(b.specialty) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) => b.id - a.id || a.fullName.localeCompare(b.fullName)
            );
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        chars = chars.reverse();
    }

    return chars;
}
