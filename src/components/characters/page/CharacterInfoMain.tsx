// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, rarity, element, specialty } = character;

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
            <FlexBox>
                <Image
                    src={`ranks/character/${rarity}`}
                    alt={rarity}
                    style={{ width: "56px" }}
                />
                <Box sx={{ ml: "15px" }}>
                    <TextStyled
                        variant="h4"
                        className="page-name"
                        sx={{ mb: "5px" }}
                    >
                        {fullName}
                    </TextStyled>
                    <FlexBox columnGap="4px">
                        <Image
                            src={`elements/${element}`}
                            alt={element}
                            tooltip={element}
                            style={{ width: "32px" }}
                        />
                        <Image
                            src={`specialties/${specialty}`}
                            alt={specialty}
                            tooltip={specialty}
                            style={{ width: "32px" }}
                        />
                    </FlexBox>
                </Box>
            </FlexBox>
        </Box>
    );
}

export default CharacterInfoMain;
