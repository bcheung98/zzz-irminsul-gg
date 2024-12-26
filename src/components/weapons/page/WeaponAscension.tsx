// Component imports
import MainContentBox from "custom/MainContentBox";
import LevelUpCosts from "custom/LevelUpCosts";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponAscension({ weapon }: WeaponProps) {
    const { rarity, specialty } = weapon;

    return (
        <MainContentBox title="Ascension">
            <LevelUpCosts
                type="weapon"
                skillKey="level"
                rarity={rarity}
                specialty={specialty}
            />
        </MainContentBox>
    );
}

export default WeaponAscension;
