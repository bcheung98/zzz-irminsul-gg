import { createTheme } from "@mui/material";
import { getThemeBackgroundColors } from "helpers/utils";
import { Shade } from "types/theme";

const appbarColors = ["rgb(0, 16, 32)", "rgb(8, 32, 72)", "rgb(32, 56, 96)"];

const border = {
    color: "rgb(168, 147, 105)",
    highlight: `rgb(233, 194, 39)`,
};

const backgroundColors = [
    {
        main: "rgb(32, 56, 96)",
        light: "rgb(42, 66, 106)",
        dark: "rgb(22, 46, 86)",
    },
    {
        main: "rgb(8, 32, 72)",
        light: "rgb(10, 42, 82)",
        dark: "rgb(6, 22, 62)",
    },
    {
        main: "rgb(0, 16, 32)",
        light: "rgb(0, 21, 42)",
        dark: "rgb(0, 11, 22)",
    },
];

export const darkThemeData = {
    name: "Dark",
    background: (index: number, shade?: Shade) =>
        getThemeBackgroundColors({ colors: backgroundColors, index, shade }),
    palette: {
        primary: {
            main: "rgb(0, 16, 32)",
        },
        secondary: {
            main: "rgb(8, 32, 72)",
        },
        tertiary: {
            main: "rgb(32, 56, 96)",
            light: "rgb(52, 76, 116)",
            dark: "rgb(22, 46, 86)",
        },
        info: {
            main: "rgb(25, 118, 210)",
        },
        divider: border.color,
    },
    font: {
        main: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
        styled: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
        element: {
            weight: 300,
        },
        highlight: {
            weight: 300,
        },
    },
    text: {
        primary: "white",
        selected: "rgb(30, 175, 255)",
        description: "rgb(205, 205, 205)",
        highlight: "white",
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
        hover: appbarColors[1],
        color: "white",
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
        backgroundColor: appbarColors[2],
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

export const darkTheme = createTheme(darkThemeData);
