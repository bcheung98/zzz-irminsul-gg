// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, rarity, specialty } = character;
    const element = character.subElement || character.element;

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <FlexBox
                sx={{ flexWrap: "wrap", columnGap: "16px", rowGap: "8px" }}
            >
                <Image
                    src={`ranks/character/${rarity}`}
                    alt={rarity}
                    style={{ width: "56px" }}
                />
                <Box>
                    <Box sx={{ mb: "8px" }}>
                        <TextStyled variant="h4-styled">{fullName}</TextStyled>
                        {character.title && (
                            <TextStyled sx={{ mt: "4px", fontStyle: "italic" }}>
                                {character.title}
                            </TextStyled>
                        )}
                    </Box>
                    <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                        <InfoChip
                            color="tertiary"
                            src={`elements/${element}`}
                            label={element}
                        />
                        <InfoChip
                            color="tertiary"
                            src={`specialties/${specialty}`}
                            label={specialty}
                        />
                    </FlexBox>
                </Box>
            </FlexBox>
        </Card>
    );
}

export default CharacterInfoMain;
