import {
    attackTypes,
    elements,
    factions,
    RarityMap,
    specialities,
} from "data/common";

// Taken from:
// https://medium.com/xgeeks/typescript-utility-keyof-nested-object-fa3e457ef2b2
export type NestedKeyOf<T extends object> = {
    [K in keyof T & (string | number)]: T[K] extends object
        ? `${K}` | keyof T[K]
        : `${K}`;
}[keyof T & (string | number)];

export type Element = (typeof elements)[number];
export type Specialty = (typeof specialities)[number];
export type AttackType = (typeof attackTypes)[number];
export type Rarity = keyof typeof RarityMap;
export type Faction = (typeof factions)[number];
