export const expertChallengeMaterials = [
    {
        id: "bossMat_0",
        category: "bossMat",
        tag: "Murderous Obituary",
        name: "Murderous Obituary",
        displayName: "Murderous Obituary",
        source: "Notorious - Dullahan",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "bossMat_1",
        category: "bossMat",
        tag: "Crimson Awe",
        name: "Crimson Awe",
        displayName: "Crimson Awe",
        source: "Troublemaker - Wanted Enforcer",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "bossMat_2",
        category: "bossMat",
        tag: "Ethereal Pursuit",
        name: "Ethereal Pursuit",
        displayName: "Ethereal Pursuit",
        source: "Notorious - Armored Hati",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "bossMat_3",
        category: "bossMat",
        tag: "Steel Malice",
        name: "Steel Malice",
        displayName: "Steel Malice",
        source: "Hans - Energized",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "bossMat_4",
        category: "bossMat",
        tag: "Destructive Advance",
        name: "Destructive Advance",
        displayName: "Destructive Advance",
        source: "Typhon Slugger",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "bossMat_5",
        category: "bossMat",
        tag: "Falling Fist",
        name: "Falling Fist",
        displayName: "Falling Fist",
        source: "Rampant Brute",
        rarity: "A",
        release: { version: "1.1" },
    },
    {
        id: "bossMat_6",
        category: "bossMat",
        tag: "Stealth Phantom",
        name: "Stealth Phantom",
        displayName: "Stealth Phantom",
        source: "Doppelganger - Jane",
        rarity: "A",
        release: { version: "1.2" },
    },
    {
        id: "bossMat_7",
        category: "bossMat",
        tag: "Thunderous Dragon",
        name: "Thunderous Dragon",
        displayName: "Thunderous Dragon",
        source: "Thracian",
        rarity: "A",
        release: { version: "1.4" },
    },
    {
        id: "bossMat_8",
        category: "bossMat",
        tag: "",
        name: "?",
        displayName: "?",
        source: "",
        rarity: "A",
        release: { version: "1.6" },
    },
] as const;

export const expertChallengeMatNames = expertChallengeMaterials.map(
    (mat) => mat.tag
);

export function getExpertChallengeMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return expertChallengeMaterials.find(
        (mat) => mat.id === id || mat.tag === tag
    );
}

export const notoriousHuntMaterials = [
    {
        id: "weeklyBossMat_0",
        category: "weeklyBossMat",
        tag: "Ferocious Grip",
        name: "Ferocious Grip",
        displayName: "Ferocious Grip",
        source: "Newborn Dead End Butcher",
        rarity: "S",
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_1",
        category: "weeklyBossMat",
        tag: "Living Drive",
        name: "Living Drive",
        displayName: "Living Drive",
        source: "Unknown Corruption Complex",
        rarity: "S",
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_2",
        category: "weeklyBossMat",
        tag: "Finale Dance Shoes",
        name: "Finale Dance Shoes",
        displayName: "Finale Dance Shoes",
        source: "Twin Marionettes",
        rarity: "S",
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_3",
        category: "weeklyBossMat",
        tag: "Scarlet Engine",
        name: "Scarlet Engine",
        displayName: "Scarlet Engine",
        source: "Corrupted Overlord - Pompey",
        rarity: "S",
        release: { version: "1.2" },
    },
    {
        id: "weeklyBossMat_4",
        category: "weeklyBossMat",
        tag: "Sycophant's Refinement",
        name: "Sycophant's Refinement",
        displayName: "Sycophant's Refinement",
        source: "Sacrifice - Bringer",
        rarity: "S",
        release: { version: "1.4" },
    },
] as const;

export const notoriousHuntMatNames = notoriousHuntMaterials.map(
    (mat) => mat.tag
);

export function getNotoriousHuntMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return notoriousHuntMaterials.find(
        (mat) => mat.id === id || mat.tag === tag
    );
}
