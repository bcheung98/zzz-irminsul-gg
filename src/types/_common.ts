import {
    attackTypes,
    elements,
    factions,
    RarityMap,
    specialities,
} from "data/common";

export type Element = (typeof elements)[number];
export type Specialty = (typeof specialities)[number];
export type AttackType = (typeof attackTypes)[number];
export type Rarity = keyof typeof RarityMap
export type Faction = (typeof factions)[number];
