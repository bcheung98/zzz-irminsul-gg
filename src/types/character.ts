import { AttackType, Element, Faction, Rarity, Specialty, Version } from "./_common"
import { Materials } from "./materials"
import { Skill, SkillWithSplash } from "./skill"

export interface CharacterProps {
    character: Character
}

export interface Character {
    id: number,
    name: string,
    fullName: string
    rarity: Rarity,
    element: Element,
    specialty: Specialty,
    attackType: AttackType,
    skills: CharacterSkills,
    cinema: CharacterCinema,
    stats: CharacterStats,
    materials: Materials,
    birthday: string,
    gender: "Male" | "Female",
    faction: Faction,
    colors: {
        primary: string,
        secondary: string
    },
    voiceActors: {
        en: string,
        jp: string
    },
    release: Version
}

export interface CharacterSkills {
    basic: Skill[],
    dodge: Skill[],
    assist: Skill[],
    special: Skill[],
    chain: Skill[],
    core: Skill[]
}

export interface CharacterCinema {
    c1: SkillWithSplash,
    c2: SkillWithSplash,
    c3: SkillWithSplash,
    c4: SkillWithSplash,
    c5: SkillWithSplash,
    c6: SkillWithSplash
}

export interface CharacterAscensionStat {
    [stat: string]: number[]
}

export interface CharacterStats {
    ascension: CharacterAscensionStat,
    hp: number[],
    atk: number[],
    def: number[]
}