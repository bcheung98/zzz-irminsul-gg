import { Weapon } from "types/weapon";
import { WeaponFilterState } from "reducers/weaponFilters";
import { BrowserSettings } from "reducers/browser";
import { RarityMap, SpecialtyMap } from "data/common";
import { sortBy } from "./utils";

export function filterWeapons(
    weapons: Weapon[],
    filters: WeaponFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let weps = [...weapons];
    if (filters.specialty.length > 0) {
        weps = weps.filter((wep) => filters.specialty.includes(wep.specialty));
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((wep) => filters.rarity.includes(wep.rarity));
    }
    if (filters.substats.length > 0) {
        weps = weps.filter((weapon) =>
            filters.substats.includes(weapon.stats.subStat)
        );
    }
    if (searchValue) {
        weps = weps.filter(
            (wep) =>
                wep.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase()) ||
                wep.displayName
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
        );
    }

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            weps = weps.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            if (reverse) {
                weps = weps.reverse();
            }
            break;
        case "rarity":
            weps = weps.sort(
                (a, b) =>
                    sortBy(RarityMap[a.rarity], RarityMap[b.rarity], reverse) ||
                    sortBy(b.displayName, a.displayName)
            );
            break;
        case "specialty":
            weps = weps.sort(
                (a, b) =>
                    sortBy(
                        SpecialtyMap[b.specialty],
                        SpecialtyMap[a.specialty],
                        reverse
                    ) ||
                    sortBy(RarityMap[a.rarity], RarityMap[b.rarity]) ||
                    sortBy(b.displayName, a.displayName)
            );
            break;
        case "release":
            weps = weps.sort(
                (a, b) =>
                    sortBy(a.id, b.id, reverse) ||
                    sortBy(
                        RarityMap[b.rarity],
                        RarityMap[a.rarity],
                        !reverse
                    ) ||
                    sortBy(b.displayName, a.displayName, !reverse)
            );
            break;
        case "element":
            break;
    }

    return weps;
}
