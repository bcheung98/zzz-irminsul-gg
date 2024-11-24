import { createTheme } from "@mui/material"

export const darkThemeData = {
    background: [
        "rgb(23, 46, 98)",
    ],
    font: {
        main: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300
        },
        styled: {
            family: "Rowdies, Roboto, sans-serif",
            weight: 300
        }
    },
    text: {
        main: "white",
        selected: "rgb(25, 118, 210)"
    },
    appbar: {
        backgroundColor: "rgb(0, 16, 32)"
    },
    border: {
        color: "rgb(168, 147, 105)",
        radius: "5px"
    },
    table: {
        body: {
            hover: "rgb(19, 47, 76)"
        }
    }
}

export const darkTheme = createTheme(darkThemeData)