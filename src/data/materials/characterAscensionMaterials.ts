export const characterAscensionMaterials = [
    {
        id: "characterAscension_0",
        category: "characterAscension",
        tag: "Attack",
        name: "Attack Seal",
        displayName: "Attack Seal",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_0_0",
        category: "characterAscension",
        tag: "Attack1",
        name: "Basic Attack Certification Seal",
        displayName: "Basic Attack Certification Seal",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_0_1",
        category: "characterAscension",
        tag: "Attack2",
        name: "Advanced Attack Certification Seal",
        displayName: "Advanced Attack Certification Seal",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_0_2",
        category: "characterAscension",
        tag: "Attack3",
        name: "Pioneer's Certification Seal",
        displayName: "Pioneer's Certification Seal",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_1",
        category: "characterAscension",
        tag: "Stun",
        name: "Stun Seal",
        displayName: "Stun Seal",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_1_0",
        category: "characterAscension",
        tag: "Stun1",
        name: "Basic Stun Certification Seal",
        displayName: "Basic Stun Certification Seal",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_1_1",
        category: "characterAscension",
        tag: "Stun2",
        name: "Advanced Stun Certification Seal",
        displayName: "Advanced Stun Certification Seal",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_1_2",
        category: "characterAscension",
        tag: "Stun3",
        name: "Buster Certification Seal",
        displayName: "Buster Certification Seal",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_2",
        category: "characterAscension",
        tag: "Anomaly",
        name: "Anomaly Seal",
        displayName: "Anomaly Seal",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_2_0",
        category: "characterAscension",
        tag: "Anomaly1",
        name: "Basic Anomaly Certification Seal",
        displayName: "Basic Anomaly Certification Seal",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_2_1",
        category: "characterAscension",
        tag: "Anomaly2",
        name: "Advanced Anomaly Certification Seal",
        displayName: "Advanced Anomaly Certification Seal",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_2_2",
        category: "characterAscension",
        tag: "Anomaly3",
        name: "Controller Certification Seal",
        displayName: "Controller Certification Seal",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_3",
        category: "characterAscension",
        tag: "Defense",
        name: "Defense Seal",
        displayName: "Defense Seal",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_3_0",
        category: "characterAscension",
        tag: "Defense1",
        name: "Basic Defense Certification Seal",
        displayName: "Basic Defense Certification Seal",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_3_1",
        category: "characterAscension",
        tag: "Defense2",
        name: "Advanced Defense Certification Seal",
        displayName: "Advanced Defense Certification Seal",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_3_2",
        category: "characterAscension",
        tag: "Defense3",
        name: "Defender Certification Seal",
        displayName: "Defender Certification Seal",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_4",
        category: "characterAscension",
        tag: "Support",
        name: "Support Seal",
        displayName: "Support Seal",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_4_0",
        category: "characterAscension",
        tag: "Support1",
        name: "Basic Support Certification Seal",
        displayName: "Basic Support Certification Seal",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_4_1",
        category: "characterAscension",
        tag: "Support2",
        name: "Advanced Support Certification Seal",
        displayName: "Advanced Support Certification Seal",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "characterAscension_4_2",
        category: "characterAscension",
        tag: "Support3",
        name: "Ruler Certification Seal",
        displayName: "Ruler Certification Seal",
        rarity: "A",
        release: { version: "1.0" },
    },
] as const;

export const characterAscensionMatNames = characterAscensionMaterials.map(
    (mat) => mat.tag
);
export const characterAscensionMatKeyNames = characterAscensionMatNames.filter(
    (mat) => !["1", "2", "3"].includes(mat.slice(-1))
);

export function getCharacterAscensionMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return characterAscensionMaterials.find(
        (mat) => mat.id === id || mat.tag === tag
    );
}
