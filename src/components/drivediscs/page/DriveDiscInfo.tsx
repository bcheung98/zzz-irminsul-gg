// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Divider } from "@mui/material";

// Type imports
import { DriveDiscProps } from "types/driveDisc";

function DriveDiscInfo({ disc }: DriveDiscProps) {
    const theme = useTheme();

    const { displayName, description } = disc;

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
            <TextStyled variant="h4" sx={{ mb: "4px" }}>
                {displayName}
            </TextStyled>
            <Divider sx={{ my: "16px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>{description}</TextStyled>
        </Box>
    );
}

export default DriveDiscInfo;
