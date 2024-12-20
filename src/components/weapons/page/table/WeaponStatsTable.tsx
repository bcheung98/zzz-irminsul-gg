// Component imports
import StatsTable from "custom/StatsTable";

// Helper imports
import { mainStats, subStats } from "data/weaponStats";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponStatsTable({ weapon }: WeaponProps) {
    const { rarity, stats } = weapon;

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
                mainStat:
                    mainStats[stats.mainStat.type].scaling[
                        stats.mainStat.value
                    ][index] || 0,
                subStat: subStats[stats.subStat].scaling[rarity][index] || 0,
            }))}
            columns={["Level", stats.mainStat.type, stats.subStat]}
        />
    );
}

export default WeaponStatsTable;
