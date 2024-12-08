export const elements = [
    "Physical",
    "Fire",
    "Ice",
    "Electric",
    "Ether",
] as const;

export const specialities = [
    "Attack",
    "Stun",
    "Anomaly",
    "Defense",
    "Support",
] as const;

export const attackTypes = ["Strike", "Slash", "Pierce"] as const;

export const rarities = ["S", "A", "B", "C"] as const;
export enum RarityMap {
    C = 2,
    B,
    A,
    S,
}

export const factions = [
    "Cunning Hares",
    "Belobog Heavy Industries",
    "Victoria Housekeeping Co.",
    "Obol Squad",
    "Criminal Investigation Special Response Team",
    "Sons of Calydon",
    "Hollow Special Operations Section 6",
] as const;
