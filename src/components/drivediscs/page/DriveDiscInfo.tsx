import parse from "html-react-parser";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack, Divider } from "@mui/material";

// Type imports
import { DriveDiscProps } from "types/driveDisc";

function DriveDiscInfo({ disc }: DriveDiscProps) {
    const theme = useTheme();

    const { displayName, description } = disc;

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <TextStyled variant="h4-styled" sx={{ mb: "4px" }}>
                    {displayName}
                </TextStyled>
                <TextStyled
                    variant="subtitle1-styled"
                    sx={{ fontStyle: "italic" }}
                >
                    {parse(description)}
                </TextStyled>
            </Stack>
        </Card>
    );
}

export default DriveDiscInfo;
