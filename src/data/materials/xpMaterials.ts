export const characterXPMaterials = [
    {
        id: "characterXP_0",
        category: "characterXP",
        tag: "CharacterXP1",
        name: "Trainee Investigator Log",
        displayName: "Trainee Investigator Log",
        rarity: "B",
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_1",
        category: "characterXP",
        tag: "CharacterXP2",
        name: "Official Investigator Log",
        displayName: "Official Investigator Log",
        rarity: "A",
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_2",
        category: "characterXP",
        tag: "CharacterXP3",
        name: "Senior Investigator Log",
        displayName: "Senior Investigator Log",
        rarity: "A",
        release: {
            version: "1.0",
        },
    },
] as const;

export const weaponXPMaterials = [
    {
        id: "weaponXP_0",
        category: "weaponXP",
        tag: "WeaponXP1",
        name: "W-Engine Battery",
        displayName: "W-Engine Battery",
        rarity: "B",
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_1",
        category: "weaponXP",
        tag: "WeaponXP2",
        name: "W-Engine Power Supply",
        displayName: "W-Engine Power Supply",
        rarity: "A",
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_2",
        category: "weaponXP",
        tag: "WeaponXP3",
        name: "W-Engine Energy Module",
        displayName: "W-Engine Energy Module",
        rarity: "A",
        release: {
            version: "1.0",
        },
    },
] as const;

export const characterXPMatNames = characterXPMaterials.map((mat) => mat.tag);
export const weaponXPMatNames = weaponXPMaterials.map((mat) => mat.tag);

export function getCharacterXPMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return characterXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}

export function getWeaponXPMaterial({ id, tag }: { id?: string; tag: string }) {
    return weaponXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}