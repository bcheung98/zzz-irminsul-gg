import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons from "custom/ToggleButtons";

// Helper imports
import { mainStats, subStats } from "data/weaponStats";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import { WeaponProps } from "types/weapon";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function WeaponStats({ weapon }: WeaponProps) {
    const { rarity, stats } = weapon;

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
            stats.mainStat.type,
            ...levels.map(
                (_, index) =>
                    mainStats[stats.mainStat.type].scaling[
                        stats.mainStat.value
                    ][index] || 0
            ),
        ],
        [
            stats.subStat,
            ...levels.map(
                (_, index) =>
                    subStats[stats.subStat].scaling[rarity][index] || 0
            ),
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
                        maxWidth: "75%",
                        ml: "10px",
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "75%" }
                                : "100%",
                    },
                }}
            />
        </MainContentBox>
    );
}

export default WeaponStats;
