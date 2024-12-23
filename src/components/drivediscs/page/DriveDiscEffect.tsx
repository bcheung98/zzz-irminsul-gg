import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import { Text } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Type imports
import { DriveDiscProps } from "types/driveDisc";

function DriveDiscEffect({ disc }: DriveDiscProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                p: "15px",
                mb: "15px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
            }}
        >
            <Text>
                {`2-Pieces: `}
                <span style={{ color: theme.text.description }}>
                    {parseSkillDescription(disc.setEffect.twoPiece)}
                </span>
            </Text>
            <Text>
                {`4-Pieces: `}
                <span style={{ color: theme.text.description }}>
                    {parseSkillDescription(disc.setEffect.fourPiece)}
                </span>
            </Text>
        </Box>
    );
}

export default DriveDiscEffect;

function parseSkillDescription(description: string) {
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
