// Component imports
import LevelSlider from "components/planner/LevelSlider";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import {
    getCharacterCoreSkillCost,
    getCharacterLevelCost,
    getCharacterSkillCost,
} from "helpers/getLevelUpCosts";
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterCostObject, UpdateCostsPayload } from "types/costs";
import { CharacterColors } from "types/character";

function CharacterSliders({ character }: { character: CharacterCostObject }) {
    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(character.colors, option, character.element);

    const sliders: {
        title: string;
        icon?: string;
        levels: (string | number)[];
        type: UpdateCostsPayload["type"];
        fn: Function;
    }[] = [
        {
            title: "Level",
            levels: charLevel,
            type: "level",
            fn: getCharacterLevelCost,
        },
        {
            title: "Basic Attack",
            icon: "skills/Basic",
            levels: skillLevel,
            type: "basic",
            fn: getCharacterSkillCost,
        },
        {
            title: "Dodge",
            icon: "skills/Dodge",
            levels: skillLevel,
            type: "dodge",
            fn: getCharacterSkillCost,
        },
        {
            title: "Assist",
            icon: "skills/Assist",
            levels: skillLevel,
            type: "assist",
            fn: getCharacterSkillCost,
        },
        {
            title: "Special Attack",
            icon: "skills/SpecialEX",
            levels: skillLevel,
            type: "special",
            fn: getCharacterSkillCost,
        },
        {
            title: "Chain Attack",
            icon: "skills/Ultimate",
            levels: skillLevel,
            type: "chain",
            fn: getCharacterSkillCost,
        },
        {
            title: "Core Skill",
            icon: "skills/Core",
            levels: coreSkillLevel,
            type: "core",
            fn: getCharacterCoreSkillCost,
        },
    ];

    const [Level, Basic, Dodge, Assist, Special, Chain, Core] = sliders.map(
        (slider) => (
            <LevelSlider
                key={slider.type}
                name={character.name}
                variant="character"
                title={slider.title}
                icon={slider.icon}
                levels={slider.levels}
                color={getCharacterColor("accent")}
                dispatchProps={{
                    type: slider.type,
                    getCost: slider.fn,
                }}
            />
        )
    );

    return (
        <Grid container rowSpacing={1} columnSpacing={6}>
            <Grid size={12}>{Level}</Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                {Basic}
                {Dodge}
                {Assist}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                {Special}
                {Chain}
                {Core}
            </Grid>
        </Grid>
    );
}

export default CharacterSliders;

const charLevel = [
    "1",
    "10",
    "10+",
    "20",
    "20+",
    "30",
    "30+",
    "40",
    "40+",
    "50",
    "50+",
    "60",
];

const skillLevel = range(1, 12);

const coreSkillLevel = ["0", "A", "B", "C", "D", "E", "F"];
