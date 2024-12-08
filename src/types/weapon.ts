import { WeaponMainStat, WeaponSubStat } from "data/weaponStats";
import { Rarity, Specialty } from "./_common";
import { Skill } from "./skill";
import { Version } from "./version";

export interface WeaponProps {
    weapon: Weapon;
}

export interface Weapon {
    id: number;
    name: string;
    displayName: string;
    rarity: Exclude<Rarity, "C">;
    specialty: Specialty;
    stats: WeaponStats;
    description: string;
    shortDescription: string;
    signature?: string;
    release: Version;
}

export interface WeaponStats {
    mainStat: {
        type: WeaponMainStat;
        value: string;
    };
    subStat: WeaponSubStat;
    passive: Required<Skill>;
}
