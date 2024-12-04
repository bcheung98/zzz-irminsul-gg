import {
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

export const expertChallengeMaterials = <const>[
    {
        name: "Murderous Obituary",
        source: "Notorious - Dullahan",
    },
    {
        name: "Crimson Awe",
        source: "Troublemaker - Wanted Enforcer",
    },
    {
        name: "Ethereal Pursuit",
        source: "Notorious - Armored Hati",
    },
    {
        name: "Steel Malice",
        source: "Hans - Energized",
    },
    {
        name: "Destructive Advance",
        source: "Typhon Slugger",
    },
    {
        name: "Falling Fist",
        source: "Rampant Brute",
    },
    {
        name: "Stealth Phantom",
        source: "Doppelganger - Jane",
    },
];

export const expertChallengeMaterialNames = expertChallengeMaterials.map(
    (material) => material.name
);

export const formatExpertChallengeMaterials = (
    material: ExpertChallengeMaterial
) => {
    const target =
        expertChallengeMaterials[
            expertChallengeMaterials.findIndex((mat) => mat.name === material)
        ];
    return `${target.name} (${target.source})`;
};

export const notoroiusHuntMaterials = <const>[
    {
        name: "Ferocious Grip",
        source: "Newborn Dead End Butcher",
    },
    {
        name: "Living Drive",
        source: "Unknown Corruption Complex",
    },
    {
        name: "Finale Dance Shoes",
        source: "Twin Marionettes",
    },
    {
        name: "Scarlet Engine",
        source: "Corrupted Overlord - Pompey",
    },
];

export const notoroiusHuntMaterialNames = notoroiusHuntMaterials.map(
    (material) => material.name
);

export const formatNotoriousHuntMaterials = (
    material: NotoriousHuntMaterial
) => {
    const target =
        notoroiusHuntMaterials[
            notoroiusHuntMaterials.findIndex((mat) => mat.name === material)
        ];
    return `${target.name} (${target.source})`;
};
