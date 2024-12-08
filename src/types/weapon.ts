import { baseATKScaling, subStats } from "data/weaponStats";
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
    release: Version;
}

export interface WeaponStats {
    atk: BaseATK;
    subStat: WeaponSubStat;
    passive: Required<Skill>;
}

export type BaseATK = keyof typeof baseATKScaling;
export type WeaponSubStat = keyof typeof subStats;
