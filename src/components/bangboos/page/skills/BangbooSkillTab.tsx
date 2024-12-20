import parse, {
    HTMLReactParserOptions,
    Element,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Type imports
import { BangbooSkills } from "types/bangboo";
import { Skill } from "types/skill";
import BangbooSkillScaling from "./BangbooSkillScaling";

interface BangbooSkillTabProps {
    mode: "table" | "slider";
    skillKey: keyof BangbooSkills;
    skillData: Skill[];
}

export interface BangbooSkillScalingProps {
    mode: "table" | "slider";
    skillKey: keyof BangbooSkills;
    scaling: string[][];
}

function BangbooSkillTab({ mode, skillKey, skillData }: BangbooSkillTabProps) {
    const theme = useTheme();

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs.class) {
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

    return (
        <Box>
            <TextStyled sx={{ mb: "10px", fontStyle: "italic" }}>
                {formatSkillKey(skillKey)}
            </TextStyled>
            {skillData.map((skill, index) => (
                <Box key={`${skillKey}-${index}`} sx={{ pb: "16px" }}>
                    <TextStyled variant="h5" sx={{ mb: "15px" }}>
                        {skill.name}
                    </TextStyled>
                    <Text sx={{ color: theme.text.description }}>
                        {parse(skill.description, options)}
                    </Text>
                    <Box sx={{ pt: "24px" }}>
                        {skill.scaling && (
                            <BangbooSkillScaling
                                mode={mode}
                                skillKey={skillKey}
                                scaling={skill.scaling}
                            />
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default BangbooSkillTab;

function formatSkillKey(skill: keyof BangbooSkills) {
    switch (skill) {
        case "A":
            return "Active Skill";
        case "B":
            return "Additional Ability";
        case "C":
            return "Bangboo Chain Attack";
    }
}
