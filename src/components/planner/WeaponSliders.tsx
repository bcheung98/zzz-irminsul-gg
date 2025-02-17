// Component imports
import LevelSlider from "components/planner/LevelSlider";

// Type imports
import { WeaponCostObject } from "types/costs";
import { CardMode } from "./PlannerCard";

function WeaponSliders({
    weapon,
    mode,
}: {
    weapon: WeaponCostObject;
    mode: CardMode;
}) {
    return (
        <LevelSlider
            mode={mode}
            name={weapon.name}
            variant="weapon"
            title="Level"
            levels={weaponLevel}
            values={weapon.values.level}
            rarity={weapon.rarity}
            type="level"
        />
    );
}

export default WeaponSliders;

const weaponLevel = [
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
