// Component imports

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
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { Text, TextStyled } from "styled/StyledTypography";

// Type imports
import { CharacterProps } from "types/character";

function CharacterStatsTable({ character }: CharacterProps) {
    const { stats } = character;

    const levels = [
        "1",
        "10",
        "10+",
        "20",
        "20+",
        "30",
        "30+",
        "40",
        "40+",
        "50",
        "50+",
        "60",
    ];
    const rows = levels.map((level, index) => ({
        level: level,
        hp: stats.hp[index].toLocaleString() || 0,
        atk: stats.atk[index] || 0,
        def: stats.def[index] || 0,
    }));

    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <TableContainer component={Card} sx={{ width: "100%" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <TextStyled variant="body1" sx={tableTextStyle}>
                                Level
                            </TextStyled>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TextStyled variant="body1" sx={tableTextStyle}>
                                Base HP
                            </TextStyled>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TextStyled variant="body1" sx={tableTextStyle}>
                                Base ATK
                            </TextStyled>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TextStyled variant="body1" sx={tableTextStyle}>
                                Base DEF
                            </TextStyled>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.level} hover>
                            <StyledTableCell>
                                <Text variant="body2" sx={tableTextStyle}>
                                    {row.level}
                                </Text>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Text variant="body2" sx={tableTextStyle}>
                                    {row.hp}
                                </Text>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Text variant="body2" sx={tableTextStyle}>
                                    {row.atk}
                                </Text>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Text variant="body2" sx={tableTextStyle}>
                                    {row.def}
                                </Text>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CharacterStatsTable;
