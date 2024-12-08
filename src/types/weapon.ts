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
    rarity: Rarity;
    specialty: Specialty;
    stats: WeaponStats;
    description: string;
    shortDescription: string;
    release: Version;
}

export interface WeaponStats {
    atk: number;
    subStat: string;
    passive: Required<Skill>;
}
