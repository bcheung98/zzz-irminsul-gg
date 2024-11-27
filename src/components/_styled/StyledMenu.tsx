import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&.MuiMenuItem-root": {
        backgroundColor: theme.menu.default,
        color: theme.text.main,
        "&:hover": {
            backgroundColor: theme.menu.hover,
        },
        "&.Mui-selected": {
            backgroundColor: theme.menu.selected,
            "&:hover": {
                backgroundColor: theme.menu.selectedHover,
            },
        },
    },
}));
