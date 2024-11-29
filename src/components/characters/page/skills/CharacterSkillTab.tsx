import parse, { HTMLReactParserOptions, Element } from "html-react-parser";

// Component imports
import CharacterSkillScalingTable from "./CharacterSkillScalingTable";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box } from "@mui/material";

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
                        <TextStyled variant="h6" sx={{ mb: "5px" }}>
                            {skill.name}
                        </TextStyled>
                        {skill.description.split("<br />").map((line, i) => (
                            <span key={i}>
                                <Text sx={{ display: "inline" }}>
                                    {parseSkillDescription(line)}
                                </Text>
                                <br />
                            </span>
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

export function getSkillIcon(skill: string) {
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

function parseSkillDescription(description: string) {
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

const options: HTMLReactParserOptions = {
    replace: (domNode) => {
        if (domNode instanceof Element && domNode.attribs) {
            const { attribs } = domNode;
            if (attribs.class) {
                const className = attribs.class;
                if (className.split(" ")[0].startsWith("icon")) {
                    const skill = className.split(" ")[1] as CharacterSkillKey;
                    return (
                        <Image
                            src={`skills/${getSkillIcon(skill)}`}
                            alt={skill}
                            style={{
                                margin: "0 0.25rem",
                                width: "24px",
                                height: "24px",
                            }}
                        />
                    );
                }
            }
        }
    },
};
