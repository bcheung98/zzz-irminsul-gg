import { Weapon } from "types/weapon";
import { WeaponFilterState } from "reducers/weaponFilters";
import { BrowserSettings } from "reducers/browser";
import { RarityMap } from "data/common";

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

    switch (sortSettings.sortBy) {
        case "name":
            weps = weps.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            break;
        case "rarity":
            weps = weps.sort(
                (a, b) =>
                    RarityMap[b.rarity] - RarityMap[a.rarity] ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "specialty":
            weps = weps.sort(
                (a, b) =>
                    a.specialty.localeCompare(b.specialty) ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "release":
            weps = weps.sort(
                (a, b) =>
                    b.id - a.id || a.displayName.localeCompare(b.displayName)
            );
            break;
        case "element":
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        weps = weps.reverse();
    }

    return weps;
}
