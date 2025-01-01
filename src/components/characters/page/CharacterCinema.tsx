import parse, {
    HTMLReactParserOptions,
    Element,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import MainContentBox from "custom/MainContentBox";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { CharacterCinemaKey, CharacterProps } from "types/character";

function CharacterCinema({ character }: CharacterProps) {
    const theme = useTheme();
    const { cinema } = character;

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <Text
                            component="span"
                            sx={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </Text>
                    );
                }
            }
        },
    };

    return (
        <MainContentBox title="Mindscape Cinema">
            <Grid container spacing={3}>
                {Object.keys(cinema).map((key, index) => (
                    <Grid
                        key={key}
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(1, "light"),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <TextStyled variant="h6-styled" sx={{ mb: "4px" }}>
                            {`${index + 1}. ${
                                cinema[key as CharacterCinemaKey].name
                            }`}
                        </TextStyled>
                        <Text sx={{ color: theme.text.description }}>
                            {parse(
                                cinema[key as CharacterCinemaKey].description,
                                options
                            )}
                        </Text>
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterCinema;
