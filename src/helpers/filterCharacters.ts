import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";
import { ElementMap, RarityMap, SpecialtyMap } from "data/common";
import { createDateObject } from "./dates";
import { sortBy } from "./utils";

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
            filters.attackType.some((filter) =>
                char.attackType.includes(filter)
            )
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

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort((a, b) => a.fullName.localeCompare(b.fullName));
            if (reverse) {
                chars = chars.reverse();
            }
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    sortBy(RarityMap[a.rarity], RarityMap[b.rarity], reverse) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "element":
            chars = chars.sort(
                (a, b) =>
                    sortBy(
                        ElementMap[b.element],
                        ElementMap[a.element],
                        reverse
                    ) ||
                    sortBy(RarityMap[a.rarity], RarityMap[b.rarity]) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "specialty":
            chars = chars.sort(
                (a, b) =>
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty],
                        reverse
                    ) ||
                    sortBy(RarityMap[a.rarity], RarityMap[b.rarity]) ||
                    sortBy(b.fullName, a.fullName)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) =>
                    sortBy(
                        createDateObject({
                            date: a.release.date,
                        }).obj.getTime(),
                        createDateObject({
                            date: b.release.date,
                        }).obj.getTime(),
                        reverse
                    ) ||
                    sortBy(
                        RarityMap[b.rarity],
                        RarityMap[a.rarity],
                        !reverse
                    ) ||
                    sortBy(b.fullName, a.fullName, !reverse)
            );
            break;
    }

    return chars;
}
