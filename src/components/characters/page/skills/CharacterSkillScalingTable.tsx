// Component imports
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    SxProps,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
} from "@mui/material";

function CharacterSkillScalingTable({ scaling }: { scaling: string[][] }) {
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
        <TableContainer component={Card}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <TextStyled sx={tableTextStyle}>Level</TextStyled>
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
                                    key={`${row[`col${index}`][0]}-${i}`}
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
    );
}

export default CharacterSkillScalingTable;
