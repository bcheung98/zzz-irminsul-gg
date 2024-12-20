// Component imports
import StatsTable from "custom/StatsTable";

// Type imports
import { CharacterProps } from "types/character";

function CharacterStatsTable({ character }: CharacterProps) {
    const { stats } = character;

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
                atk: stats.atk[index] || 0,
                def: stats.def[index] || 0,
            }))}
            columns={["Level", "Base HP", "Base ATK", "Base DEF"]}
        />
    );
}

export default CharacterStatsTable;
