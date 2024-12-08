import { WeaponFilterState } from "reducers/weaponFilters";
import { Weapon } from "types/weapon";

export function filterWeapons(
    weapons: Weapon[],
    filters: WeaponFilterState,
    searchValue: string
) {
    let weps = [...weapons];
    if (filters.specialty.length > 0) {
        weps = weps.filter((wep) => filters.specialty.includes(wep.specialty));
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((wep) => filters.rarity.includes(wep.rarity));
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
    return weps;
}
