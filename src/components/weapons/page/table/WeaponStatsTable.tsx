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
import { mainStats, subStats } from "data/weaponStats";

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
    const rows = levels.map((level, index) => ({
        level: level,
        mainStat:
            mainStats[stats.mainStat.type].scaling[stats.mainStat.value][index],
        subStat: subStats[stats.subStat].scaling[rarity][index],
    }));

    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <TableContainer component={Card} sx={{ width: "100%" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {["Level", stats.mainStat.type, stats.subStat].map(
                            (col, index) => (
                                <StyledTableCell
                                    key={index}
                                    sx={{ maxWidth: "50px" }}
                                >
                                    <TextStyled
                                        variant="body1"
                                        sx={tableTextStyle}
                                    >
                                        {col}
                                    </TextStyled>
                                </StyledTableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.level} hover>
                            {[row.level, row.mainStat, row.subStat].map(
                                (col, index) => (
                                    <StyledTableCell key={index}>
                                        <Text
                                            variant="body2"
                                            sx={tableTextStyle}
                                        >
                                            {col}
                                        </Text>
                                    </StyledTableCell>
                                )
                            )}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default WeaponStatsTable;
