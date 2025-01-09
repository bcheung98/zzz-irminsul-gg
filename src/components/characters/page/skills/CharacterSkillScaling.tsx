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
    index = 0,
}: Omit<CharacterSkillScalingProps, "ascension">) {
    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const levels = 16;

    return (
        <Dropdown
            title="Skill Scaling"
            iconColor={getCharacterColor("accent")}
            contentPadding={mode === "slider" ? "4px 24px" : "4px 0px"}
        >
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
                        ml: "8px",
                        color: getCharacterColor("accent"),
                    },
                }}
                tableProps={{
                    sx: {
                        width:
                            mode === "slider"
                                ? { sm: "100%", md: "50%" }
                                : "100%",
                        maxWidth: mode === "slider" ? { lg: "500px" } : "100%",
                        mt: "8px",
                    },
                }}
                textID={`character-skill-value-${index}`}
            />
        </Dropdown>
    );
}

export default CharacterSkillScaling;
