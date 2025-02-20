export const characterSkillMaterials = [
    {
        id: "characterSkill_0",
        category: "characterSkill",
        tag: "Physical",
        name: "Physical Chip",
        displayName: "Physical Chip",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_0_0",
        category: "characterSkill",
        tag: "Physical1",
        name: "Basic Physical Chip",
        displayName: "Basic Physical Chip",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_0_1",
        category: "characterSkill",
        tag: "Physical2",
        name: "Advanced Physical Chip",
        displayName: "Advanced Physical Chip",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_0_2",
        category: "characterSkill",
        tag: "Physical3",
        name: "Specialized Physical Chip",
        displayName: "Specialized Physical Chip",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_1",
        category: "characterSkill",
        tag: "Fire",
        name: "Fire Chip",
        displayName: "Fire Chip",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_1_0",
        category: "characterSkill",
        tag: "Fire1",
        name: "Basic Burn Chip",
        displayName: "Basic Burn Chip",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_1_1",
        category: "characterSkill",
        tag: "Fire2",
        name: "Advanced Burn Chip",
        displayName: "Advanced Burn Chip",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_1_2",
        category: "characterSkill",
        tag: "Fire3",
        name: "Specialized Burn Chip",
        displayName: "Specialized Burn Chip",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_2",
        category: "characterSkill",
        tag: "Ice",
        name: "Ice",
        displayName: "Ice",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_2_0",
        category: "characterSkill",
        tag: "Ice1",
        name: "Basic Freeze Chip",
        displayName: "Basic Freeze Chip",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_2_1",
        category: "characterSkill",
        tag: "Ice2",
        name: "Advanced Freeze Chip",
        displayName: "Advanced Freeze Chip",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_2_2",
        category: "characterSkill",
        tag: "Ice3",
        name: "Specialized Freeze Chip",
        displayName: "Specialized Freeze Chip",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_3",
        category: "characterSkill",
        tag: "Electric",
        name: "Electric",
        displayName: "Electric",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_3_0",
        category: "characterSkill",
        tag: "Electric1",
        name: "Basic Shock Chip",
        displayName: "Basic Shock Chip",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_3_1",
        category: "characterSkill",
        tag: "Electric2",
        name: "Advanced Shock Chip",
        displayName: "Advanced Shock Chip",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_3_2",
        category: "characterSkill",
        tag: "Electric3",
        name: "Specialized Shock Chip",
        displayName: "Specialized Shock Chip",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_4",
        category: "characterSkill",
        tag: "Ether",
        name: "Ether",
        displayName: "Ether",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_4_0",
        category: "characterSkill",
        tag: "Ether1",
        name: "Basic Ether Chip",
        displayName: "Basic Ether Chip",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_4_1",
        category: "characterSkill",
        tag: "Ether2",
        name: "Advanced Ether Chip",
        displayName: "Advanced Ether Chip",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterSkill_4_2",
        category: "characterSkill",
        tag: "Ether3",
        name: "Specialized Ether Chip",
        displayName: "Specialized Ether Chip",
        rarity: "A",
        release: { version: "1.0" },
    },
] as const;

export const characterSkillMatNames = characterSkillMaterials.map(
    (mat) => mat.tag
);
export const characterSkillMatKeyNames = characterSkillMatNames.filter(
    (mat) => !["1", "2", "3"].includes(mat.slice(-1))
);

export function getCharacterSkillMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return characterSkillMaterials.find(
        (mat) => mat.id === id || mat.tag === tag
    );
}
