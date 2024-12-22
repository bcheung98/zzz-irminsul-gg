import {
    styled,
    TableRow,
    TableCell,
    tableCellClasses,
    tableRowClasses,
} from "@mui/material";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.menu.primary,
    [`&.${tableRowClasses.hover}`]: {
        "&:hover": {
            backgroundColor: theme.menu.hover,
        },
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderColor: theme.border.color.primary,
    padding: "8px 16px",
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.background(8),
    },
}));
