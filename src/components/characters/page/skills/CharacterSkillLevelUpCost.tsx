// Component imports
import Dropdown from "custom/Dropdown";
import LevelUpCosts from "custom/LevelUpCosts";

// Helper imports
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterSkillLevelUpProps } from "./CharacterSkillTab";

function CharacterSkillLevelUpCost({
    skillKey,
    element,
    colors,
    materials,
}: CharacterSkillLevelUpProps) {
    return (
        <Dropdown
            title="Level Up Cost"
            iconColor={characterColors(colors, "accent", element)}
            contentPadding="16px 24px"
        >
            <LevelUpCosts
                type="character"
                skillKey={skillKey}
                element={element}
                colors={colors}
                mats={materials}
                threshold="@250"
            />
        </Dropdown>
    );
}

export default CharacterSkillLevelUpCost;
