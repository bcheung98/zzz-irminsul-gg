// Component imports
import LevelSlider from "components/planner/LevelSlider";

// Helper imports
import { getWeaponLevelCost } from "helpers/getLevelUpCosts";

// Type imports
import { WeaponCostObject } from "types/costs";

function WeaponSliders({ weapon }: { weapon: WeaponCostObject }) {
    return (
        <LevelSlider
            name={weapon.name}
            variant="weapon"
            title="Level"
            levels={weaponLevel}
            rarity={weapon.rarity}
            dispatchProps={{
                type: "level",
                getCost: getWeaponLevelCost,
            }}
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
