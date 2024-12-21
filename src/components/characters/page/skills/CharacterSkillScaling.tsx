// Component imports
import Dropdown from "custom/Dropdown";
import StatsTable from "custom/StatsTable";

// Helper imports
import { characterColors } from "helpers/characterColors";
import { range } from "helpers/utils";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkillTab";
import { CharacterColors } from "types/character";

function CharacterSkillScaling({
    mode,
    scaling,
    colors,
    element,
}: Omit<CharacterSkillScalingProps, "ascension">) {
    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const levels = 16;

    return (
        <Dropdown title="Skill Scaling" iconColor={getCharacterColor("accent")}>
            <StatsTable
                mode={mode}
                levels={range(1, levels)}
                data={scaling}
                headColumns={["Level", ...range(1, levels)]}
                sliderProps={{
                    initialValue: 12,
                    sx: {
                        minWidth: "100px",
                        maxWidth: "500px",
                        ml: "10px",
                        color: getCharacterColor("accent"),
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { xs: "100%", sm: "30%" }
                                : "100%",
                        mt: "10px",
                    },
                }}
                textID="character-skill-value"
            />
        </Dropdown>
    );
}

export default CharacterSkillScaling;
