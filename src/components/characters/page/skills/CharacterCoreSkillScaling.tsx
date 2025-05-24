import { useEffect, useState } from "react";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Stack,
    Box,
    Card,
    TableContainer,
    Table,
    TableBody,
} from "@mui/material";

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

    const levels = ["0", "A", "B", "C", "D", "E", "F"];
    const marks = levels.map((level, index) => ({
        value: index,
        label: <TextStyled sx={{ userSelect: "none" }}>{level}</TextStyled>,
    }));

    const [sliderValue, setSliderValue] = useState(levels.length - 1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const targets = document.getElementsByClassName("character-skill-value-0");
    useEffect(() => {
        scaling.forEach((subScaling: string[], index: number) => {
            let target = targets[index];
            if (target) {
                target.innerHTML = subScaling[sliderValue];
            }
        });
    }, [sliderValue]);

    const bonusStats: string[][] = [[], []];
    Object.entries(ascension).map(([stat, scaling], index) => {
        let values: number[] = [];
        if (index === 0) {
            values = [0, scaling[0], ...scaling];
        } else {
            values = [0, 0, ...scaling];
        }
        bonusStats[index] = [stat, ...values.map((value) => value.toString())];
    });

    return (
        <Stack spacing={2} sx={{ pb: "16px" }}>
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
                        ml: "8px",
                        color: getCharacterColor("accent"),
                    }}
                />
            </Box>
            <TableContainer
                component={Card}
                sx={{ minWidth: "20%", width: "max-content" }}
            >
                <Table>
                    <TableBody>
                        {bonusStats.map((stat) =>
                            stat[sliderValue + 1] !== "0" ? (
                                <StyledTableRow key={stat[0]} color="primary">
                                    <StyledTableCell align="left">
                                        <Text variant="body2">{stat[0]}</Text>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Text variant="body2">
                                            {[
                                                "CRIT Rate",
                                                "CRIT DMG",
                                                "PEN Ratio",
                                                "Base Energy Regen",
                                                "HP",
                                            ].includes(stat[0])
                                                ? `${
                                                      Number(
                                                          stat[sliderValue + 1]
                                                      ) / 100
                                                  }%`
                                                : `${stat[sliderValue + 1]}`}
                                        </Text>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ) : null
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    );
}

export default CharacterCoreSkillScaling;
