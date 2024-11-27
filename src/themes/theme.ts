import { createTheme } from "@mui/material";
import { darkTheme } from "./darkTheme";

let theme = darkTheme;

theme = createTheme(theme, {
    palette: {
        background: {
            default: theme.background(0),
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.appbar.backgroundColor,
                    borderWidth: "0 0 1px 0",
                    borderStyle: "solid",
                    borderColor: theme.border.color,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.border.color,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: theme.text.main,
                },
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: theme.background(1),
                },
                list: {
                    backgroundColor: theme.background(1),
                    color: theme.text.main,
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: theme.text.main,
                },
            },
        },
    },
    typography: {
        sitename: {
            fontFamily: "Rowdies, Roboto !important",
            fontSize: "1.333rem",
            fontWeight: "400 !important",
            letterSpacing: ".1rem",
        },
        h5: {
            [theme.breakpoints.up("xs")]: {
                fontSize: theme.typography.pxToRem(22),
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.pxToRem(24),
            },
        },
        h6: {
            [theme.breakpoints.up("xs")]: {
                fontSize: theme.typography.pxToRem(18),
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.pxToRem(20),
            },
        },
        body1: {
            [theme.breakpoints.up("xs")]: {
                fontSize: theme.typography.pxToRem(14),
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.pxToRem(16),
            },
        },
        body2: {
            [theme.breakpoints.up("xs")]: {
                fontSize: theme.typography.pxToRem(12),
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.pxToRem(14),
            },
        },
    },
});

export default theme;
