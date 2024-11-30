import React from "react";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Helper imports
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkillTab";
import { CharacterColors } from "types/character";

function CharacterCoreSkillScaling({
    scaling,
    element,
    colors,
    ascension,
}: Omit<CharacterSkillScalingProps, "mode">) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const [sliderValue, setSliderValue] = React.useState(0);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const levels = ["0", "A", "B", "C", "D", "E", "F"];
    const marks = levels.map((level, index) => ({
        value: index,
        label: <TextStyled sx={{ userSelect: "none" }}>{level}</TextStyled>,
    }));
    const targets = document.getElementsByClassName("text-value");
    scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index];
        if (target) {
            target.innerHTML = subScaling[sliderValue];
        }
    });

    const bonusStats = Object.entries(ascension)
        .map(([stat, scaling]) => ({
            stat: stat,
            value:
                stat === "CRIT Rate" || stat === "CRIT DMG"
                    ? `${scaling[0] / 100}%`
                    : scaling[0],
        }))
        .reverse();

    return (
        <Box sx={{ pb: "15px" }}>
            <Box sx={{ width: { xs: "90%", md: "50vw" } }}>
                <StyledSlider
                    value={sliderValue}
                    marks={marks}
                    step={1}
                    min={0}
                    max={levels.length - 1}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "500px",
                        ml: "10px",
                        color: getCharacterColor("accent"),
                    }}
                />
            </Box>
            {sliderValue > 0 && (
                <Text sx={{ color: theme.text.description, mt: "15px" }}>
                    {bonusStats[sliderValue % 2].stat} increases by{" "}
                    <span style={{ color: theme.text.highlight }}>
                        {bonusStats[sliderValue % 2].value}
                    </span>
                </Text>
            )}
        </Box>
    );
}

export default CharacterCoreSkillScaling;
