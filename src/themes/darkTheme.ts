import { createTheme } from "@mui/material";
import { getHoverColor } from "helpers/utils";

const backgroundColors = [
    "rgb(32, 56, 96)",
    "rgb(8, 32, 72)",
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

export const darkThemeData = {
    name: "Dark",
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
        primary: getHoverColor(backgroundColors[1], 10),
        hover: getHoverColor(backgroundColors[1], 30),
        selected: backgroundColors[2],
        selectedHover: backgroundColors[1],
    },
    table: {
        body: {
            primary: backgroundColors[0],
            hover: getHoverColor(backgroundColors[0]),
        },
    },
};

export const darkTheme = createTheme(darkThemeData);
