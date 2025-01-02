// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Divider, Card, Stack } from "@mui/material";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooInfo({ bangboo }: BangbooProps) {
    const theme = useTheme();

    const { displayName, rarity, description } = bangboo;

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "16px", rowGap: "8px" }}
                >
                    <Image
                        src={`ranks/bangboo/${rarity}`}
                        alt={rarity}
                        style={{ width: "48px" }}
                    />
                    <TextStyled variant="h4-styled">{displayName}</TextStyled>
                </FlexBox>
                <TextStyled variant="subtitle1-styled" sx={{ fontStyle: "italic" }}>
                    {description}
                </TextStyled>
            </Stack>
        </Card>
    );
}

export default BangbooInfo;
