// Component imports
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, rarity, element, specialty } = character;

    return (
        <Box
            sx={{
                p: "16px",
                mb: "16px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
            }}
        >
            <FlexBox>
                <Image
                    src={`ranks/character/${rarity}`}
                    alt={rarity}
                    style={{ width: "56px" }}
                />
                <Box sx={{ ml: "16px" }}>
                    <TextStyled
                        variant="h4"
                        className="page-name"
                        sx={{ mb: "8px" }}
                    >
                        {fullName}
                    </TextStyled>
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
        </Box>
    );
}

export default CharacterInfoMain;
