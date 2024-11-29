import { styled, InputBase } from "@mui/material";

export const StyledInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        backgroundColor: theme.menu.default,
        borderRadius: 5,
        border: `1px solid ${theme.border.color}`,
        padding: "10px 10px 10px 15px",
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0, 12, 255, .25)",
            backgroundColor: theme.menu.default,
        },
    },
}));
