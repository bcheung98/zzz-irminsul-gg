import { createTheme } from "@mui/material";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

export const themeList = [
    { name: "Dark", data: darkTheme },
    { name: "Light", data: lightTheme },
] as const;

export const themeNames = themeList.map((t) => t.name);

export function getTheme(name: string) {
    let theme =
        themeList[themeList.findIndex((theme) => theme.name === name)].data;
    const baseThemeData = {
        palette: {
            background: {
                default: theme.background(0),
            },
        },
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    noOptions: {
                        color: theme.text.primary,
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        backgroundColor: theme.menu.primary,
                    },
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.appbar.backgroundColor,
                        borderWidth: "0 0 1px 0",
                        borderStyle: "solid",
                        borderColor: theme.border.color.primary,
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: theme.text.primary,
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        textTransform: "none",
                        variants: [
                            {
                                props: { variant: "contained" },
                                style: {
                                    backgroundColor: theme.button.primary,
                                },
                            },
                            {
                                props: { variant: "outlined" },
                                style: {
                                    backgroundColor: theme.button.secondary,
                                    borderColor: theme.border.color.primary,
                                },
                            },
                        ],
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.background(1),
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
                        borderColor: theme.border.color.primary,
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: theme.text.primary,
                    },
                },
            },
            MuiMenu: {
                styleOverrides: {
                    paper: {
                        backgroundColor: theme.menu.primary,
                    },
                    list: {
                        backgroundColor: theme.menu.primary,
                        color: theme.text.primary,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    icon: {
                        color: theme.text.primary,
                    },
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: "5px",
                        backgroundColor: theme.table.body.primary,
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
    };

    theme = createTheme(theme, baseThemeData);
    return theme;
}
