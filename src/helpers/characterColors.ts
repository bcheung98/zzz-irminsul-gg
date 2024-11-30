import theme from "themes/theme";
import { Element } from "types/_common";
import { CharacterColors } from "types/character";

export function characterColors(
    colors: CharacterColors,
    option: keyof CharacterColors,
    element: Element
) {
    return (
        colors[option] ||
        theme.text[element.toLowerCase() as keyof typeof theme.text] ||
        "white"
    );
}
