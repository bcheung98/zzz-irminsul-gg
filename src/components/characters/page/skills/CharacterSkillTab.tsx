import parse, { HTMLReactParserOptions, Element } from "html-react-parser";

// Component imports
import CharacterSkillScalingTable from "./CharacterSkillScalingTable";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Type imports
import { CharacterSkillKey } from "types/character";
import { Skill } from "types/skill";

interface CharacterSkillTabProps {
    skillKey: CharacterSkillKey;
    skillData: Skill[];
}

function CharacterSkillTab({ skillKey, skillData }: CharacterSkillTabProps) {
    return (
        <Box>
            <TextStyled sx={{ mb: "10px", fontStyle: "italic" }}>
                {formatSkillKey(skillKey)}
            </TextStyled>
            {skillData.map((skill, index) => (
                <Box key={`${skillKey}-${index}`} sx={{ mb: "25px" }}>
                    <Box sx={{ mb: "20px" }}>
                        <TextStyled variant="h5" sx={{ mb: "5px" }}>
                            {skill.name}
                        </TextStyled>
                        {skill.description.split("<br />").map((line, i) => (
                            <Text key={i}>{parseSkillDescription(line)}</Text>
                        ))}
                    </Box>
                    {skill.scaling && skillKey !== "core" && (
                        <CharacterSkillScalingTable scaling={skill.scaling} />
                    )}
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
            if (domNode instanceof Element && domNode.attribs) {
                const { attribs } = domNode;
                if (attribs.class) {
                    const className = attribs.class;
                    if (className.split(" ")[0].startsWith("icon")) {
                        const skill = className.split(
                            " "
                        )[1] as CharacterSkillKey;
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
                    }
                }
            }
        },
    };

    const text = description
        .replace(`Icon_Basic`, `<span class="icon basic"></span>`)
        .replace(`Icon_Dodge`, `<span class="icon dodge"></span>`)
        .replace(`Icon_Assist`, `<span class="icon assist"></span>`)
        .replace(`Icon_Special`, `<span class="icon special"></span>`)
        .replace(`Icon_EXSpecial`, `<span class="icon ex-special"></span>`)
        .replace(`Icon_Ultimate`, `<span class="icon ultimate"></span>`)
        .replace(`Icon_Core`, `<span class="icon core"></span>`);
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
