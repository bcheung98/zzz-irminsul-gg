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
                p: "15px",
                mb: "15px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(8),
            }}
        >
            <TextStyled variant="h4" sx={{ mb: "5px" }}>
                {displayName}
            </TextStyled>
            <Divider sx={{ my: "15px" }} />
            <TextStyled sx={{ fontStyle: "italic" }}>{description}</TextStyled>
        </Box>
    );
}

export default DriveDiscInfo;
