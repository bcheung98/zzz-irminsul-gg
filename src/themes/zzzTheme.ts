import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(4, 4, 4)", "rgb(16, 16, 16)", "rgb(32, 32, 32)"];

const border = {
    color: "rgb(174, 206, 50)",
    highlight: "rgb(190, 255, 0)",
};

const backgroundColors = [
    {
        main: "rgb(32, 32, 32)",
        light: "rgb(52, 52, 52)",
        dark: "rgb(22, 22, 22)",
    },
    {
        main: "rgb(16, 16, 16)",
        light: "rgb(26, 26, 26)",
        dark: "rgb(6, 6, 6)",
    },
    {
        main: "rgb(12, 12, 12)",
        light: "rgb(0, 21, 42)",
        dark: "rgb(0, 11, 22)",
    },
];

export const zzzThemeData = {
    name: "Zenless",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    backgroundImageColors: ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"],
    backgroundImageURL:
        "https://assets.irminsul.gg/zzz/images/Zenless_Background.png",
    backgroundImageAlpha: 0.25,
    palette: {
        primary: {
            main: "rgb(12, 12, 12)",
        },
        secondary: {
            main: "rgb(16, 16, 16)",
        },
        tertiary: {
            main: "rgb(32, 32, 32)",
            light: "rgb(52, 52, 52)",
            dark: "rgb(22, 22, 22)",
        },
        info: {
            main: "rgb(190, 255, 0)",
        },
        divider: border.color,
    },
    font: {
        main: {
            family: "Zenless, Roboto, sans-serif",
            weight: 300,
        },
        styled: {
            family: "Zenless, Roboto, sans-serif",
            weight: 300,
        },
        element: {
            weight: 300,
        },
        highlight: {
            weight: 300,
        },
        sizes: {
            "h4-styled": {
                xs: 24,
                sm: 26,
            },
            "h5-styled": {
                xs: 20,
                sm: 22,
            },
            "h6-styled": {
                xs: 16,
                sm: 18,
            },
            "body1-styled": {
                xs: 12,
                sm: 14,
            },
            "subtitle1-styled": {
                xs: 11,
                sm: 13,
            },
            "body2-styled": {
                xs: 10,
                sm: 12,
            },
            "subtitle2-styled": {
                xs: 9,
                sm: 11,
            },
            h4: {
                xs: 24,
                sm: 26,
            },
            h5: {
                xs: 20,
                sm: 22,
            },
            h6: {
                xs: 16,
                sm: 18,
            },
            body1: {
                xs: 12,
                sm: 14,
            },
            subtitle1: {
                xs: 11,
                sm: 13,
            },
            body2: {
                xs: 10,
                sm: 12,
            },
            subtitle2: {
                xs: 9,
                sm: 11,
            },
        },
    },
    text: {
        primary: "rgb(255, 255, 255)",
        contrast: "rgb(0, 0, 0)",
        selected: "rgb(190, 255, 0)",
        description: "rgb(205, 205, 205)",
        highlight: "rgb(255, 255, 255)",
        highlight2: "#E0BB00",
        physical: "#F0D12B",
        ice: "#98EFF0",
        fire: "#FF5521",
        electric: "#2EB6FF",
        ether: "#FE437E",
        wind: "#48EEA7",
        value: "#2BAD00",
    },
    appbar: {
        backgroundColor: appbarColors[0],
        hover: appbarColors[2],
        selectedHover: backgroundColors[0].light,
        color: "rgb(255, 255, 255)",
    },
    border: {
        color: {
            primary: border.color,
            highlight: border.highlight,
        },
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[2].main,
    },
    icon: {
        backgroundColor: appbarColors[1],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1].main,
    },
    menu: {
        primary: backgroundColors[0].dark,
        hover: backgroundColors[0].light,
        selected: backgroundColors[1].dark,
        selectedHover: backgroundColors[1].light,
    },
    table: {
        body: {
            primary: backgroundColors[0].dark,
            hover: backgroundColors[0].light,
        },
    },
};

export const zzzTheme = createTheme(zzzThemeData);
