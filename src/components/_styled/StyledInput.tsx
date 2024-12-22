import { styled, InputBase } from "@mui/material";

export const StyledInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        backgroundColor: theme.menu.primary,
        borderRadius: 5,
        border: `1px solid ${theme.border.color.primary}`,
        padding: "10px 10px 10px 15px",
        "&:focus": {
            borderRadius: 4,
            borderColor: theme.border.color.highlight,
            backgroundColor: theme.menu.primary,
        },
    },
}));
