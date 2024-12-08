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

// Helper imports
import { baseATKScaling, subStatScaling } from "data/weaponStats";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponStatsTable({ weapon }: WeaponProps) {
    const { rarity, stats } = weapon;

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
    const atk = baseATKScaling[stats.atk];
    const subStat = subStatScaling[rarity][stats.subStat];
    const rows = levels.map((level, index) => ({
        level: level,
        atk: atk[index],
        subStat: subStat[index],
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
                                Base ATK
                            </TextStyled>
                        </StyledTableCell>
                        <StyledTableCell>
                            <TextStyled variant="body1" sx={tableTextStyle}>
                                {stats.subStat}
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
                                    {row.atk}
                                </Text>
                            </StyledTableCell>
                            <StyledTableCell>
                                <Text variant="body2" sx={tableTextStyle}>
                                    {row.subStat}
                                </Text>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WeaponStatsTable;
