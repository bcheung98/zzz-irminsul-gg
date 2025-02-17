// Component imports
import LevelSlider from "components/planner/LevelSlider";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { characterColors } from "helpers/characterColors";

// Type imports
import {
    CharacterCostObject,
    CostSliderData,
    UpdateCostsPayload,
} from "types/costs";
import { CharacterColors } from "types/character";
import { CardMode } from "./PlannerCard";

function CharacterSliders({
    character,
    mode,
}: {
    character: CharacterCostObject;
    mode: CardMode;
}) {
    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(character.colors, option, character.element);

    const values = character.values;

    const sliders: {
        title: string;
        icon?: string;
        levels: (string | number)[];
        type: UpdateCostsPayload["type"];
        values: CostSliderData;
    }[] = [
        {
            title: "Level",
            levels: charLevel,
            type: "level",
            values: values.level,
        },
        {
            title: "Basic Attack",
            icon: "skills/Basic",
            levels: skillLevel,
            type: "basic",
            values: values.basic,
        },
        {
            title: "Dodge",
            icon: "skills/Dodge",
            levels: skillLevel,
            type: "dodge",
            values: values.dodge,
        },
        {
            title: "Assist",
            icon: "skills/Assist",
            levels: skillLevel,
            type: "assist",
            values: values.assist,
        },
        {
            title: "Special Attack",
            icon: "skills/SpecialEX",
            levels: skillLevel,
            type: "special",
            values: values.special,
        },
        {
            title: "Chain Attack",
            icon: "skills/Ultimate",
            levels: skillLevel,
            type: "chain",
            values: values.chain,
        },
        {
            title: "Core Skill",
            icon: "skills/Core",
            levels: coreSkillLevel,
            type: "core",
            values: values.core,
        },
    ];

    const [Level, Basic, Dodge, Assist, Special, Chain, Core] = sliders.map(
        (slider) => (
            <LevelSlider
                mode={mode}
                key={slider.type}
                name={character.name}
                variant="character"
                title={slider.title}
                icon={slider.icon}
                levels={slider.levels}
                values={slider.values}
                color={getCharacterColor("accent")}
                type={slider.type}
            />
        )
    );

    return (
        <Grid container rowSpacing={1} columnSpacing={mode === "view" ? 2 : 6}>
            <Grid size={12}>{Level}</Grid>
            {[Basic, Dodge, Assist, Special, Chain, Core].map(
                (slider, index) => (
                    <Grid
                        key={index}
                        size={
                            mode === "view"
                                ? { xs: 6, sm: 4 }
                                : { xs: 12, md: 6 }
                        }
                    >
                        {slider}
                    </Grid>
                )
            )}
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
