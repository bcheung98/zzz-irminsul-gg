import React from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterCoreSkillScaling from "./CharacterCoreSkillScaling";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Type imports
import {
    CharacterAscensionStat,
    CharacterColors,
    CharacterSkillKey,
} from "types/character";
import { Skill } from "types/skill";
import { Element } from "types/_common";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    skillKey: CharacterSkillKey;
    skillData: Skill[];
    ascension: CharacterAscensionStat;
    element: Element;
    colors: CharacterColors;
}

export interface CharacterSkillScalingProps {
    mode: "table" | "slider";
    scaling: string[][];
    colors: CharacterColors;
    element: Element;
    ascension: CharacterAscensionStat;
}

function CharacterSkillTab({
    mode,
    skillKey,
    skillData,
    ascension,
    element,
    colors,
}: CharacterSkillTabProps) {
    const theme = useTheme();
    return (
        <Box>
            <TextStyled sx={{ mb: "10px", fontStyle: "italic" }}>
                {formatSkillKey(skillKey)}
            </TextStyled>
            {skillData.map((skill, index) => (
                <Box key={`${skillKey}-${index}`} sx={{ pb: "16px" }}>
                    <TextStyled variant="h5" sx={{ mb: "5px" }}>
                        {skill.name}
                    </TextStyled>
                    {skill.description.split("<br />").map((line, i) => (
                        <Text sx={{ color: theme.text.description }} key={i}>
                            {parseSkillDescription(line)}
                        </Text>
                    ))}
                    <Box sx={{ pt: "16px" }}>
                        {skill.scaling && (
                            <React.Fragment>
                                {skillKey !== "core" ? (
                                    <CharacterSkillScaling
                                        mode={mode}
                                        scaling={skill.scaling}
                                        element={element}
                                        colors={colors}
                                    />
                                ) : (
                                    <CharacterCoreSkillScaling
                                        scaling={skill.scaling}
                                        element={element}
                                        colors={colors}
                                        ascension={ascension}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default CharacterSkillTab;

function parseSkillDescription(description: string) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split(" ")[0].startsWith("icon")) {
                    const skill = className.split(" ")[1];
                    return (
                        <Image
                            src={`skills/${getSkillIcon(skill)}`}
                            alt={skill}
                            style={{
                                verticalAlign: "middle",
                                width: "auto",
                                height: matches_sm_up
                                    ? `calc(${theme.typography.body1.fontSize} + 0.625rem)`
                                    : `calc(${theme.typography.body1.fontSize} + 0.5rem)`,
                                marginBottom: "1.5px",
                            }}
                        />
                    );
                } else if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <Text
                            component="span"
                            className={
                                className === "text-value"
                                    ? "character-skill-value"
                                    : className
                            }
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

function getSkillIcon(skill: string) {
    switch (skill) {
        case "basic":
            return "Basic";
        case "dodge":
            return "Dodge";
        case "assist":
            return "Assist";
        case "special":
            return "Special";
        case "ex-special":
            return "SpecialEX";
        case "ultimate":
            return "Ultimate";
        case "core":
            return "Core";
        default:
            return "";
    }
}

function formatSkillKey(skill: CharacterSkillKey) {
    switch (skill) {
        case "basic":
            return "Basic Attack";
        case "dodge":
            return "Dodge";
        case "assist":
            return "Assist";
        case "special":
            return "Special Attack";
        case "chain":
            return "Chain Attack";
        case "core":
            return "Core Skill";
    }
}
