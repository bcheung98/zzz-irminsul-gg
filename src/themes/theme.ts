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
                paper: theme.background(1),
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
                defaultProps: {
                    slotProps: {
                        chip: {
                            sx: {
                                backgroundColor: theme.palette.info.main,
                                color: theme.appbar.color,
                                fontFamily: theme.font.styled.family,
                                "& .MuiChip-deleteIcon": {
                                    color: theme.appbar.color,
                                    ":hover": {
                                        color: "rgb(225, 225, 225)",
                                    },
                                },
                            },
                        },
                        listbox: {
                            sx: { p: 0 },
                        },
                        paper: {
                            sx: {
                                backgroundColor: theme.menu.primary,
                                borderRadius: "4px",
                            },
                        },
                        popper: {
                            sx: { zIndex: theme.zIndex.appBar - 1 },
                        },
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
                        color: theme.appbar.color,
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        textTransform: "none",
                    },
                },
            },
            MuiChip: {
                defaultProps: {
                    color: "primary",
                },
                styleOverrides: {
                    root: {
                        fontFamily: theme.font.styled.family,
                        fontWeight: theme.font.styled.weight,
                        textTransform: "none",
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
            MuiSlider: {
                defaultProps: {
                    color: "info",
                },
            },
            MuiSwitch: {
                defaultProps: {
                    color: "info",
                },
            },
            MuiTableContainer: {
                styleOverrides: {
                    root: {
                        borderRadius: "4px",
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

export const variantMap = {
    primary: 0,
    secondary: 1,
    tertiary: 2,
};
