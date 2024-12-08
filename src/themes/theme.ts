import { createTheme } from "@mui/material";
import { darkTheme } from "./darkTheme";

let theme = darkTheme;

theme = createTheme(theme, {
    palette: {
        background: {
            default: theme.background(0),
        },
    },
    shape: {
        borderRadius: "5px",
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
        MuiButton: {
            styleOverrides: {
                root: {
                    borderColor: theme.border.color,
                    color: theme.text.main,
                    fontFamily: theme.font.styled.family,
                    fontWeight: theme.font.styled.weight,
                    textTransform: "none",
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: theme.background(0),
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
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: "5px",
                    backgroundColor: theme.background(1),
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
        h4: {
            [theme.breakpoints.up("xs")]: {
                fontSize: theme.typography.pxToRem(26),
            },
            [theme.breakpoints.up("sm")]: {
                fontSize: theme.typography.pxToRem(28),
            },
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
    text: {
        physical: "#F0D12B",
        ice: "#98EFF0",
        fire: "#FF5521",
        electric: "#2EB6FF",
        ether: "#FE437E",
        wind: "#48EEA7",
        value: "#2BAD00",
    },
});

export default theme;
