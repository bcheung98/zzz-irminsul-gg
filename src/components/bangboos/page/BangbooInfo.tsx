// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider } from "@mui/material";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooInfo({ bangboo }: BangbooProps) {
    const theme = useTheme();

    const { displayName, rarity, description } = bangboo;

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
                    src={`ranks/bangboo/${rarity}`}
                    alt={rarity}
                    style={{ width: "48px" }}
                />
                <TextStyled variant="h4" sx={{ ml: "4px" }}>
                    {displayName}
                </TextStyled>
            </FlexBox>
            <Divider sx={{ my: "16px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>{description}</TextStyled>
        </Box>
    );
}

export default BangbooInfo;
