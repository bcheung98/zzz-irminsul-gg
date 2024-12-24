import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";

// Helper imports
import { characterColors } from "helpers/characterColors";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import { CharacterProps } from "types/character";
import { CharacterColors } from "types/character";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function CharacterStats({ character }: CharacterProps) {
    const { stats, colors, element } = character;

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const currentSkillDisplay = useAppSelector(selectSkillDisplay).mode;
    const [mode, setMode] = React.useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: React.BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

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

    React.useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Stats"
            actions={
                <ToggleButtons
                    color="secondary"
                    buttons={skillDisplayButtons}
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
                        maxWidth: "50%",
                        ml: "10px",
                        color: getCharacterColor("accent"),
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "50%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default CharacterStats;
