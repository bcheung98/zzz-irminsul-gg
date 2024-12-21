import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import StatsTable from "custom/StatsTable";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooStatsTable({ bangboo }: BangbooProps) {
    const { stats } = bangboo;

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
        [
            "Crit Rate",
            ...levels.map((_, index) => `${stats.critRate[index]}%` || 0),
        ],
        [
            "Crit DMG",
            ...levels.map((_, index) => `${stats.critDMG[index]}%` || 0),
        ],
        [
            "Anomaly Mastery",
            ...levels.map((_, index) => stats.anomalyMastery[index] || 0),
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
                        maxWidth: "50%",
                        ml: "10px",
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

export default BangbooStatsTable;
