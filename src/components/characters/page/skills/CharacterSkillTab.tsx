import parse from "html-react-parser";

// Component imports
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
                <Box key={index} sx={{ mb: "20px" }}>
                    <TextStyled variant="h6" sx={{ mb: "5px" }}>
                        {skill.name}
                    </TextStyled>
                    <Text>{parse(skill.description)}</Text>
                </Box>
            ))}
        </Box>
    );
}

export default CharacterSkillTab;

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
