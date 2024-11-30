import React from "react";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";

// MUI imports
import {
    SxProps,
    IconButton,
    Collapse,
    Box,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// Helper imports
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterSkillScalingProps } from "./CharacterSkillTab";
import { CharacterColors } from "types/character";

function CharacterSkillScaling({
    scaling,
    colors,
    element,
}: CharacterSkillScalingProps) {
    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const levels = 16;
    const rows = scaling.map((stat, index) => {
        const subRow = [];
        for (let i = 0; i <= levels; i++) {
            subRow.push(stat[i]);
        }
        return {
            [`col${index}`]: subRow,
        };
    });

    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <React.Fragment>
            <IconButton
                onClick={toggleDropdownState}
                disableRipple
                disableTouchRipple
                sx={{ pl: 0 }}
            >
                <ExpandMore
                    sx={{
                        color: getCharacterColor("accent"),
                        mr: "2px",
                        transform: dropdownOpen
                            ? "rotateZ(0deg)"
                            : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                <TextStyled>Skill Scaling</TextStyled>
            </IconButton>
            <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                <Box sx={{ px: { xs: 0, md: "25px" }, py: "15px" }}>
                    <TableContainer component={Card}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>
                                        <TextStyled sx={tableTextStyle}>
                                            Level
                                        </TextStyled>
                                    </StyledTableCell>
                                    {[...Array(levels).keys()].map((i) => (
                                        <StyledTableCell key={i}>
                                            <TextStyled sx={tableTextStyle}>
                                                {i + 1}
                                            </TextStyled>
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow key={index}>
                                        {row[`col${index}`].map((level, i) => (
                                            <StyledTableCell
                                                key={`${
                                                    row[`col${index}`][0]
                                                }-${i}`}
                                            >
                                                <Text
                                                    variant="body2"
                                                    sx={tableTextStyle}
                                                >
                                                    {level}
                                                </Text>
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Collapse>
        </React.Fragment>
    );
}

export default CharacterSkillScaling;
