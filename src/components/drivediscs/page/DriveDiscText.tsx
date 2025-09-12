import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import { Text } from "styled/StyledTypography";

// MUI imports
import { TypographyVariant, useTheme } from "@mui/material";

// Type imports
import { DriveDisc } from "types/driveDisc";

function DriveDiscText({
    disc,
    textVariant = "body1",
}: {
    disc: DriveDisc;
    textVariant?: TypographyVariant;
}) {
    const theme = useTheme();

    return (
        <>
            <Text variant={textVariant}>
                {`2-Pieces: `}
                <span style={{ color: theme.text.description }}>
                    {parseSkillDescription(
                        disc.setEffect.twoPiece,
                        textVariant
                    )}
                </span>
            </Text>
            <Text variant={textVariant}>
                {`4-Pieces: `}
                <span style={{ color: theme.text.description }}>
                    {parseSkillDescription(
                        disc.setEffect.fourPiece,
                        textVariant
                    )}
                </span>
            </Text>
        </>
    );
}

export default DriveDiscText;

function parseSkillDescription(
    description: string,
    textVariant: TypographyVariant
) {
    const theme = useTheme();
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <Text
                            component="span"
                            variant={textVariant}
                            className={className}
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

    return parse(description, options);
}
