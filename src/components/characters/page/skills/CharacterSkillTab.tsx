import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterCoreSkillScaling from "./CharacterCoreSkillScaling";
import CharacterSkillLevelUpCost from "./CharacterSkillLevelUpCost";
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
import { Element, Specialty } from "types/_common";
import { CharacterMaterials } from "types/materials";

interface CharacterSkillTabProps {
    mode: "table" | "slider";
    skillKey: CharacterSkillKey;
    skillData: Skill[];
    ascension: CharacterAscensionStat;
    element: Element;
    specialty: Specialty;
    materials: CharacterMaterials;
    colors: CharacterColors;
}

export interface CharacterSkillScalingProps {
    mode: "table" | "slider";
    scaling: string[][];
    element: Element;
    colors: CharacterColors;
    ascension: CharacterAscensionStat;
    index?: number;
}

export interface CharacterSkillLevelUpProps {
    skillKey: CharacterSkillKey;
    element: Element;
    colors: CharacterColors;
    materials: CharacterMaterials;
}

function CharacterSkillTab({
    mode,
    skillKey,
    skillData,
    ascension,
    element,
    specialty,
    materials,
    colors,
}: CharacterSkillTabProps) {
    const theme = useTheme();
    return (
        <Box>
            <TextStyled sx={{ mb: "8px", fontStyle: "italic" }}>
                {formatSkillKey(skillKey)}
            </TextStyled>
            {skillData.map((skill, index) => (
                <Box key={`${skillKey}-${index}`} sx={{ pb: "16px" }}>
                    <TextStyled variant="h6-styled" sx={{ mb: "4px" }}>
                        {skill.name}
                    </TextStyled>
                    {skill.description.split("<br />").map((line, i) => (
                        <Text sx={{ color: theme.text.description }} key={i}>
                            {parseSkillDescription(line, index, specialty)}
                        </Text>
                    ))}
                    <Box sx={{ pt: "16px" }}>
                        {skill.scaling && (
                            <>
                                {skillKey !== "core" ? (
                                    <CharacterSkillScaling
                                        mode={mode}
                                        scaling={skill.scaling}
                                        element={element}
                                        colors={colors}
                                        index={index}
                                    />
                                ) : (
                                    <CharacterCoreSkillScaling
                                        scaling={skill.scaling}
                                        element={element}
                                        colors={colors}
                                        ascension={ascension}
                                    />
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            ))}
            <CharacterSkillLevelUpCost
                skillKey={skillKey}
                element={element}
                colors={colors}
                materials={materials}
            />
        </Box>
    );
}

export default CharacterSkillTab;

function parseSkillDescription(
    description: string,
    index: number,
    specialty: Specialty
) {
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
                            src={`skills/${getSkillIcon(skill, specialty)}`}
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
                        <span
                            className={
                                className.startsWith("text-value")
                                    ? `character-skill-value-${index}`
                                    : className
                            }
                            data-index={domNode.attribs["data-index"]}
                            style={{
                                color: theme.text[
                                    tag
                                        .split(" ")
                                        .slice(-1)[0] as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
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
        .replaceAll(`Icon_EXSpecial2`, `<span class="icon ex-special2"></span>`)
        .replaceAll(`Icon_EXSpecial`, `<span class="icon ex-special"></span>`)
        .replaceAll(`Icon_Ultimate`, `<span class="icon ultimate"></span>`)
        .replaceAll(`Icon_Core`, `<span class="icon core"></span>`);
    return parse(text, options);
}

function getSkillIcon(skill: string, specialty: Specialty) {
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
            return specialty === "Rupture" ? "SpecialEX2" : "SpecialEX";
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
