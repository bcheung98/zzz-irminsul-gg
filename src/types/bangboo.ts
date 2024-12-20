import { Element, Faction, Rarity } from "./_common";
import { Skill } from "./skill";
import { Version } from "./version";

export interface BangbooProps {
    bangboo: Bangboo
}

export interface Bangboo {
    id: number;
    name: string;
    displayName: string;
    rarity: Exclude<Rarity, "B" | "C">;
    element: Element | "";
    faction: Faction | "";
    skills: BangbooSkills;
    stats: BangbooStats;
    description: string;
    release: Version;
}

export interface BangbooSkills {
    A: Skill[];
    B: Skill[];
    C: Skill[];
}

export interface BangbooStats {
    hp: number[];
    atk: number[];
    def: number[];
    critRate: number[];
    critDMG: number[];
    anomalyMastery: number[];
}
