import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider } from "@mui/material";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponInfo({ weapon }: WeaponProps) {
    const theme = useTheme();

    const { displayName, rarity, specialty, shortDescription } = weapon;

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
                    src={`specialties/${specialty}`}
                    alt={specialty}
                    tooltip={specialty}
                    style={{ width: "64px" }}
                />
                <Box sx={{ ml: "15px" }}>
                    <TextStyled variant="h4" sx={{ mb: "5px" }}>
                        {displayName}
                    </TextStyled>
                    <FlexBox columnGap="4px">
                        <Image
                            src={`ranks/item/${rarity}`}
                            alt={rarity}
                            style={{ width: "40px" }}
                        />
                    </FlexBox>
                </Box>
            </FlexBox>
            <Divider sx={{ my: "15px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>
                {parse(shortDescription)}
            </TextStyled>
        </Box>
    );
}

export default WeaponInfo;
