// Component imports
import StatsTable from "custom/StatsTable";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooStatsTable({ bangboo }: BangbooProps) {
    const { stats } = bangboo;

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

    return (
        <StatsTable
            rows={levels.map((level, index) => ({
                level: level,
                hp: stats.hp[index].toLocaleString() || 0,
                atk: stats.atk[index].toLocaleString() || 0,
                def: stats.def[index].toLocaleString() || 0,
                critRate: `${stats.critRate[index]}%` || 0,
                critDMG: `${stats.critDMG[index]}%` || 0,
                anomaly: stats.anomalyMastery[index] || 0,
            }))}
            columns={[
                "Level",
                "Base HP",
                "Base ATK",
                "Base DEF",
                "Crit RATE",
                "Crit DMG",
                "Anomaly Mastery",
            ]}
        />
    );
}

export default BangbooStatsTable;
