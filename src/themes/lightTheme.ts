import { createTheme } from "@mui/material";
import { getHoverColor } from "helpers/utils";

const backgroundColors: string[] = [
    "rgb(32, 56, 96)",
    "rgb(24, 48, 88)",
    "rgb(16, 40, 80)",
    "rgb(8, 32, 72)",
    "rgb(0, 24, 64)",
    "rgb(0, 24, 60)",
    "rgb(0, 20, 50)",
    "rgb(0, 20, 40)",
    "rgb(0, 16, 32)",
];

const border = {
    color: "rgb(168, 147, 105)",
    highlight: `rgb(233, 194, 39)`,
};

export const lightThemeData = {
    background: (i: number) => backgroundColors[i],
    font: {
        main: {
            family: "Segoe UI, sans-serif",
            weight: 600,
        },
        styled: {
            family: "Segoe UI, sans-serif",
            weight: 700,
        },
        element: {
            weight: 600,
        },
        highlight: {
            weight: 600,
        },
    },
    text: {
        primary: "white",
        selected: "rgb(30, 175, 255)",
        description: "rgb(205, 205, 205)",
        highlight: "white",
    },
    appbar: {
        backgroundColor: "rgb(0, 16, 32)",
    },
    border: {
        color: {
            primary: border.color,
            highlight: border.highlight,
        },
    },
    button: {
        primary: "rgb(25, 118, 210)",
        hover: "rgb(45, 138, 230)",
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "5px",
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "5px",
    },
    menu: {
        primary: backgroundColors[1],
        hover: getHoverColor(backgroundColors[1]),
        selected: backgroundColors[3],
        selectedHover: backgroundColors[4],
    },
    table: {
        body: {
            primary: backgroundColors[1],
            hover: getHoverColor(backgroundColors[1]),
        },
    },
};

export const lightTheme = createTheme(lightThemeData);
