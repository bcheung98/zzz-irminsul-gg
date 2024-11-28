import {
    attackTypes,
    elements,
    factions,
    rarities,
    specialities,
} from "data/common";

export type Element = (typeof elements)[number];
export type Specialty = (typeof specialities)[number];
export type AttackType = (typeof attackTypes)[number];
export type Rarity = (typeof rarities)[number];
export type Faction = (typeof factions)[number];
