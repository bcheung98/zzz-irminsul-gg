import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";

// Helper imports
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterProps } from "types/character";
import { CharacterColors } from "types/character";

function CharacterStatsTable({ character }: CharacterProps) {
    const { stats, colors, element } = character;

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const [mode, setMode] = React.useState<"slider" | "table">("slider");
    const handleMode = (
        _: React.BaseSyntheticEvent,
        newView: "slider" | "table"
    ) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const buttons: CustomToggleButtonProps[] = [
        { value: "slider", label: "Slider" },
        { value: "table", label: "Table" },
    ];

    const levels = [
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

    const data = [
        ["Level", ...levels],
        [
            "Base HP",
            ...levels.map((_, index) => stats.hp[index].toLocaleString() || 0),
        ],
        [
            "Base ATK",
            ...levels.map((_, index) => stats.atk[index].toLocaleString() || 0),
        ],
        [
            "Base DEF",
            ...levels.map((_, index) => stats.def[index].toLocaleString() || 0),
        ],
    ];

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    buttons={buttons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            }
        >
            <StatsTable
                mode={mode}
                levels={levels}
                data={data}
                orientation="column"
                sliderProps={{
                    sx: {
                        minWidth: "100px",
                        maxWidth: "90%",
                        ml: "10px",
                        color: getCharacterColor("accent"),
                    },
                }}
            />
        </MainContentBox>
    );
}

export default CharacterStatsTable;
