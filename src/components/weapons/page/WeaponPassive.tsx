import React from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponPassive({ weapon }: WeaponProps) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { specialty, stats } = weapon;

    const [sliderValue, setSliderValue] = React.useState(1);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const targets = document.getElementsByClassName("text-value");
    stats.passive.scaling.forEach((subScaling: string[], index: number) => {
        let target = targets[index];
        if (target) {
            target.innerHTML = subScaling[sliderValue - 1];
        }
    });

    return (
        <Box
            sx={{
                p: "15px",
                mb: "15px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(8),
            }}
        >
            <TextStyled sx={{ mb: "20px" }}>
                {"For characters with the "}
                <span style={{ color: `rgb(224, 187, 0)` }}>{specialty}</span>
                {" Specialty, the following effects can be triggered:"}
            </TextStyled>
            <TextStyled variant="h6" sx={{ mb: "10px" }}>
                {stats.passive.name}
            </TextStyled>
            <Text sx={{ color: theme.text.description }}>
                {parseSkillDescription(stats.passive.description)}
            </Text>
            <Box sx={{ width: { xs: "90%", md: "30vw" }, mt: "20px" }}>
                <StyledSlider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={5}
                    onChange={handleSliderChange}
                    size={matches_md_up ? "medium" : "small"}
                    sx={{
                        minWidth: "100px",
                        maxWidth: "200px",
                        ml: "10px",
                    }}
                />
            </Box>
            {[...Array(5).keys()].map((i) => (
                <Image
                    key={i}
                    src={i + 1 <= sliderValue ? "icons/Star" : "icons/Star2"}
                    alt="*"
                    style={{
                        width: matches_md_up ? "32px" : "24px",
                        pointerEvents: "none",
                    }}
                />
            ))}
        </Box>
    );
}

export default WeaponPassive;

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

    const text = description
        .replaceAll(`Icon_Basic`, `<span class="icon basic"></span>`)
        .replaceAll(`Icon_Dodge`, `<span class="icon dodge"></span>`)
        .replaceAll(`Icon_Assist`, `<span class="icon assist"></span>`)
        .replaceAll(`Icon_Special`, `<span class="icon special"></span>`)
        .replaceAll(`Icon_EXSpecial`, `<span class="icon ex-special"></span>`)
        .replaceAll(`Icon_Ultimate`, `<span class="icon ultimate"></span>`)
        .replaceAll(`Icon_Core`, `<span class="icon core"></span>`);
    return parse(text, options);
}
