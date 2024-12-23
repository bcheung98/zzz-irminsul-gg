import { useTheme } from "@mui/material";
import { Element } from "types/_common";
import { CharacterColors } from "types/character";

export function characterColors(
    colors: CharacterColors,
    option: keyof CharacterColors,
    element: Element
) {
    const theme = useTheme();
    if (theme.name === "Light") {
        return theme.button.primary;
    } else {
        return (
            colors[option] ||
            theme.text[element.toLowerCase() as keyof typeof theme.text] ||
            "white"
        );
    }
}
