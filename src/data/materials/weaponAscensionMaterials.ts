export const weaponAscensionMaterials = [
    {
        id: "weaponAscension_0",
        category: "weaponAscension",
        tag: "Attack",
        name: "Attack Component",
        displayName: "Attack Component",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_0_0",
        category: "weaponAscension",
        tag: "Attack1",
        name: "Attack Component",
        displayName: "Attack Component",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_0_1",
        category: "weaponAscension",
        tag: "Attack2",
        name: "Reinforced Attack Component",
        displayName: "Reinforced Attack Component",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_0_2",
        category: "weaponAscension",
        tag: "Attack3",
        name: "Specialized Attack Component",
        displayName: "Specialized Attack Component",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_1",
        category: "weaponAscension",
        tag: "Stun",
        name: "Stun Component",
        displayName: "Stun Component",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_1_0",
        category: "weaponAscension",
        tag: "Stun1",
        name: "Stun Component",
        displayName: "Stun Component",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_1_1",
        category: "weaponAscension",
        tag: "Stun2",
        name: "Reinforced Stun Component",
        displayName: "Reinforced Stun Component",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_1_2",
        category: "weaponAscension",
        tag: "Stun3",
        name: "Specialized Stun Component",
        displayName: "Specialized Stun Component",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_2",
        category: "weaponAscension",
        tag: "Anomaly",
        name: "Anomaly Component",
        displayName: "Anomaly Component",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_2_0",
        category: "weaponAscension",
        tag: "Anomaly1",
        name: "Anomaly Component",
        displayName: "Anomaly Component",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_2_1",
        category: "weaponAscension",
        tag: "Anomaly2",
        name: "Reinforced Anomaly Component",
        displayName: "Reinforced Anomaly Component",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_2_2",
        category: "weaponAscension",
        tag: "Anomaly3",
        name: "Specialized Anomaly Component",
        displayName: "Specialized Anomaly Component",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_3",
        category: "weaponAscension",
        tag: "Defense",
        name: "Defense Component",
        displayName: "Defense Component",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_3_0",
        category: "weaponAscension",
        tag: "Defense1",
        name: "Defense Component",
        displayName: "Defense Component",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_3_1",
        category: "weaponAscension",
        tag: "Defense2",
        name: "Reinforced Defense Component",
        displayName: "Reinforced Defense Component",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_3_2",
        category: "weaponAscension",
        tag: "Defense3",
        name: "Specialized Defense Component",
        displayName: "Specialized Defense Component",
        rarity: "A",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_4",
        category: "weaponAscension",
        tag: "Support",
        name: "Support Component",
        displayName: "Support Component",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_4_0",
        category: "weaponAscension",
        tag: "Support1",
        name: "Support Component",
        displayName: "Support Component",
        rarity: "C",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_4_1",
        category: "weaponAscension",
        tag: "Support2",
        name: "Reinforced Support Component",
        displayName: "Reinforced Support Component",
        rarity: "B",
        release: { version: "1.0" },
    },
    {
        id: "weaponAscension_4_2",
        category: "weaponAscension",
        tag: "Support3",
        name: "Specialized Support Component",
        displayName: "Specialized Support Component",
        rarity: "A",
        release: { version: "1.0" },
    },
] as const;

export const weaponAscensionMatNames = weaponAscensionMaterials.map(
    (mat) => mat.tag
);
export const weaponAscensionMatKeyNames = weaponAscensionMatNames.filter(
    (mat) => !["1", "2", "3"].includes(mat.slice(-1))
);

export function getWeaponAscensionMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return weaponAscensionMaterials.find(
        (mat) => mat.id === id || mat.tag === tag
    );
}
