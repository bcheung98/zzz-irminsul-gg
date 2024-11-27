import { createTheme } from "@mui/material";

let [r, g, b] = [32, 56, 96];
const max = (b - 32) / 8;
const backgroundColors: string[] = [];
for (let i = 0; i <= max; i++) {
    backgroundColors.push(`rgb(${r}, ${g}, ${b})`);
    if (r > 0) {
        r -= 8;
    }
    if (g > 16) {
        g -= 8;
    }
    if (b > 32) {
        b -= 8;
    }
}

const borderColor = "rgb(168, 147, 105)";

export const darkThemeData = {
    background: (i: number) => backgroundColors[i],
    font: {
        main: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
        styled: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300,
        },
    },
    text: {
        main: "white",
        selected: "rgb(25, 118, 210)",
    },
    appbar: {
        backgroundColor: backgroundColors[8],
    },
    border: {
        color: borderColor,
    },
    displayCard: {
        borderWidth: 0,
        border: `0px solid ${borderColor}`,
        borderRadius: "5px",
    },
    mainContentBox: {
        borderWidth: 0,
        border: `0px solid ${borderColor}`,
        borderRadius: "5px",
    },
    menu: {
        default: backgroundColors[1],
        hover: backgroundColors[2],
        selected: backgroundColors[4],
        selectedHover: backgroundColors[3],
    },
    table: {
        body: {
            hover: backgroundColors[2],
        },
    },
};

export const darkTheme = createTheme(darkThemeData);
