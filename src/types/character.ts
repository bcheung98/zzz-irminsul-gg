import { AttackType, Element, Faction, Rarity, Specialty } from "./_common";
import { CharacterMaterials } from "./materials";
import { Skill, SkillWithSplash } from "./skill";
import { VersionWithDate } from "./version";

export interface CharacterProps {
    character: Character;
}

export interface Character {
    id: number;
    name: string;
    displayName?: string;
    fullName: string;
    title?: string;
    rarity: Exclude<Rarity, "B" | "C">;
    element: Element;
    subElement?: string;
    specialty: Specialty;
    attackType: AttackType[];
    skills: CharacterSkills;
    cinema: CharacterCinema;
    stats: CharacterStats;
    materials: CharacterMaterials;
    birthday: string;
    gender: "Male" | "Female";
    faction: Faction;
    colors: CharacterColors;
    outfits: CharacterOutfit[];
    voiceActors: {
        en: string;
        jp: string;
    };
    release: VersionWithDate;
}

export type CharacterSkillKey = keyof CharacterSkills;

export interface CharacterSkills {
    basic: Skill[];
    dodge: Skill[];
    assist: Skill[];
    special: Skill[];
    chain: Skill[];
    core: Skill[];
}

export type CharacterCinemaKey = keyof CharacterCinema;

export interface CharacterCinema {
    c1: SkillWithSplash;
    c2: SkillWithSplash;
    c3: SkillWithSplash;
    c4: SkillWithSplash;
    c5: SkillWithSplash;
    c6: SkillWithSplash;
}

export interface CharacterAscensionStat {
    [stat: string]: number[];
}

export interface CharacterStats {
    ascension: CharacterAscensionStat;
    hp: number[];
    atk: number[];
    def: number[];
    impact: number[];
    am: number[];
    ap: number[];
    pen: number[];
    er: number[];
}

export interface CharacterColors {
    primary: string;
    secondary: string;
    accent: string;
}

export interface CharacterOutfit {
    name: string;
    displayName?: string;
    rarity: Rarity;
    description: string;
}
