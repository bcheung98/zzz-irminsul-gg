// Component imports
import MainContentBox from "custom/MainContentBox";
import LevelUpCosts from "custom/LevelUpCosts";

// Type imports
import { CharacterProps } from "types/character";

function CharacterAscension({ character }: CharacterProps) {
    const { colors, element, specialty } = character;

    return (
        <MainContentBox title="Ascension">
            <LevelUpCosts
                type="character"
                skillKey="level"
                element={element}
                specialty={specialty}
                colors={colors}
            />
        </MainContentBox>
    );
}

export default CharacterAscension;
