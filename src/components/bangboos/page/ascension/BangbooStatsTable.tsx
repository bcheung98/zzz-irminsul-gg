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
import { BangbooProps } from "types/bangboo";

function BangbooStatsTable({ bangboo }: BangbooProps) {
    const { stats } = bangboo;

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
        atk: stats.atk[index].toLocaleString() || 0,
        def: stats.def[index].toLocaleString() || 0,
        critRate: `${stats.critRate[index]}%` || 0,
        critDMG: `${stats.critDMG[index]}%` || 0,
        anomaly: stats.anomalyMastery[index] || 0,
    }));

    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <TableContainer component={Card} sx={{ width: "100%" }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {[
                            "Level",
                            "Base HP",
                            "Base ATK",
                            "Base DEF",
                            "Crit RATE",
                            "Crit DMG",
                            "Anomaly Mastery",
                        ].map((col, index) => (
                            <StyledTableCell key={index} sx={{ px: 0 }}>
                                <TextStyled variant="body1" sx={tableTextStyle}>
                                    {col}
                                </TextStyled>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.level} hover>
                            {Object.values(row).map((col, index) => (
                                <StyledTableCell key={index} sx={{ px: 0 }}>
                                    <Text variant="body2" sx={tableTextStyle}>
                                        {col}
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

export default BangbooStatsTable;
