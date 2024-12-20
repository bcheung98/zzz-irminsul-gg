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

interface StatsTableProps {
    rows: { [key: string]: string | number }[];
    columns: string[];
}

function StatsTable({ rows, columns }: StatsTableProps) {
    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <TableContainer component={Card} sx={{ width: "100%" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((col, index) => (
                            <StyledTableCell key={index}>
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
                                <StyledTableCell key={index}>
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

export default StatsTable;
