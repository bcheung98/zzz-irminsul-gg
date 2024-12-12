import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import { FlexBox } from "styled/StyledBox";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
} from "@mui/material";

// Helper imports
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkillTab";
import { CharacterColors } from "types/character";

function CharacterSkillScaling({
    mode,
    scaling,
    colors,
    element,
}: Omit<CharacterSkillScalingProps, "ascension">) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const levels = 16;
    const [sliderValue, setSliderValue] = React.useState(12);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const tableTextStyle: SxProps = { textAlign: { xs: "left", md: "center" } };

    return (
        <Dropdown title="Skill Scaling" iconColor={getCharacterColor("accent")} unmountOnExit>
            <FlexBox
                sx={{
                    display: mode === "slider" ? "flex" : "none",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    width: { xs: "90%", md: "50vw" },
                    mb: "15px",
                }}
            >
                <TextStyled sx={{ minWidth: "60px" }}>
                    Lv. {sliderValue}
                </TextStyled>
                <StyledSlider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={levels}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "500px",
                        ml: "10px",
                        color: getCharacterColor("accent"),
                    }}
                />
            </FlexBox>
            <TableContainer
                component={Card}
                sx={{
                    maxWidth: mode === "table" ? "100%" : "400px",
                    mt: "10px",
                }}
            >
                <Table>
                    {mode === "table" && (
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    <TextStyled sx={tableTextStyle}>
                                        Level
                                    </TextStyled>
                                </StyledTableCell>
                                {[...Array(levels).keys()].map((level) => (
                                    <StyledTableCell key={level + 1}>
                                        <TextStyled sx={tableTextStyle}>
                                            {level + 1}
                                        </TextStyled>
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {scaling.map((row) => (
                            <StyledTableRow
                                key={row[0]}
                                hover={mode === "table"}
                            >
                                {mode === "table" ? (
                                    row.map((level, index) => (
                                        <StyledTableCell
                                            key={`${row[0]}-${index}`}
                                        >
                                            <Text
                                                variant="body2"
                                                sx={tableTextStyle}
                                            >
                                                {level}
                                            </Text>
                                        </StyledTableCell>
                                    ))
                                ) : (
                                    <React.Fragment>
                                        <StyledTableCell align="left">
                                            <Text variant="body2">
                                                {row[0]}
                                            </Text>
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Text variant="body2">
                                                {row[sliderValue]}
                                            </Text>
                                        </StyledTableCell>
                                    </React.Fragment>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dropdown>
    );
}

export default CharacterSkillScaling;
