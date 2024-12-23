import { createTheme } from "@mui/material";
import { getHoverColor } from "helpers/utils";

const backgroundColors: string[] = [
    "rgb(223, 218, 213)",
    "rgb(243, 238, 233)",
    "rgb(250, 250, 255)",
    "rgb(0, 20, 40)",
];

const appbarColors = ["rgb(0, 16, 32)", "rgb(8, 32, 72)", "rgb(32, 56, 96)"];

const border = {
    color: "rgb(168, 147, 105)",
    highlight: `rgb(233, 194, 39)`,
};

const button = {
    primary: "rgb(25, 118, 210)",
    secondary: backgroundColors[2],
    hover: "rgb(45, 138, 230)",
};

export const lightThemeData = {
    name: "Light",
    background: (i: number) =>
        backgroundColors[Math.min(i, backgroundColors.length - 1)],
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
        primary: "rgb(26, 24, 24)",
        selected: "rgb(30, 175, 255)",
        description: "rgb(32, 32, 32)",
        highlight: "rgb(26, 24, 24)",
        physical: "#C2A30A",
        ice: "#1DAFAD",
        fire: "#FF5623",
        electric: "#33B6FE",
        ether: "#FE427E",
        wind: "#0AC272",
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
    button: button,
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[2],
    },
    icon: {
        backgroundColor: appbarColors[2],
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${border.color}`,
        borderRadius: "4px",
        backgroundColor: backgroundColors[1],
    },
    menu: {
        primary: "rgb(250, 250, 250)",
        hover: "rgb(240, 240, 240)",
        selected: "rgb(230, 230, 230)",
        selectedHover: "rgb(227, 238, 250)",
    },
    table: {
        body: {
            primary: backgroundColors[0],
            hover: getHoverColor(backgroundColors[0]),
        },
    },
};

export const lightTheme = createTheme(lightThemeData);
