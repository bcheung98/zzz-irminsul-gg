import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";

// Helper imports
import { mainStats, subStats } from "data/weaponStats";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponStatsTable({ weapon }: WeaponProps) {
    const { rarity, stats } = weapon;

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
                    },
                }}
            />
        </MainContentBox>
    );
}

export default WeaponStatsTable;
