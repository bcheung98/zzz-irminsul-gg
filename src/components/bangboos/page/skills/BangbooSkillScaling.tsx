import React from "react";

// Component imports
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

// Type imports
import { BangbooSkillScalingProps } from "./BangbooSkillTab";

function BangbooSkillScaling({
    mode,
    skillKey,
    scaling,
}: BangbooSkillScalingProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const levels = skillKey === "B" ? 5 : 10;
    const [sliderValue, setSliderValue] = React.useState(levels);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const targets = document.getElementsByClassName("text-value");

    React.useEffect(() => {
        scaling.forEach((subScaling: string[], index: number) => {
            const target = targets[index];
            if (target) {
                target.innerHTML = subScaling[sliderValue];
            }
        });
    }, [sliderValue]);

    const tableTextStyle: SxProps = { textAlign: { xs: "left", md: "center" } };

    return (
        <>
            <TextStyled sx={{ mb: "15px" }}>Skill Scaling</TextStyled>
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
                        maxWidth: skillKey === "B" ? "250px" : "500px",
                        ml: "10px",
                    }}
                />
            </FlexBox>
            <TableContainer
                component={Card}
                sx={{
                    maxWidth: mode === "table" ? "90%" : "400px",
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
                                    <>
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
                                    </>
                                )}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BangbooSkillScaling;
