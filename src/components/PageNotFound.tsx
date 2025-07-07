import { Link } from "react-router";

// Component imports
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Stack, Button, getContrastRatio } from "@mui/material";

// Helper imports
import { selectCharacterNames } from "reducers/character";
import { selectWeaponNames } from "reducers/weapon";
import { selectDriveDiscNames } from "reducers/driveDiscs";
import { selectBangbooNames } from "reducers/bangboo";
import { useAppSelector } from "helpers/hooks";

function PageNotFound({ params }: { params?: string }) {
    const theme = useTheme();

    const names = [
        ...useAppSelector(selectCharacterNames),
        ...useAppSelector(selectWeaponNames),
        ...useAppSelector(selectDriveDiscNames),
        ...useAppSelector(selectBangbooNames),
    ];

    let isUnreleased = false;
    if (params && names.includes(params)) {
        isUnreleased = true;
    }

    return (
        <Stack alignItems="center" spacing={2}>
            <Image src="emotes/Error" alt="404" style={{ width: "256px" }} />
            {!isUnreleased && <TextStyled variant="h4-styled">404</TextStyled>}
            {!isUnreleased ? (
                <Text variant="h4">
                    The page you were looking for was not recorded in Irminsul.
                </Text>
            ) : (
                <Text variant="h6" sx={{ width: "50%", textAlign: "center" }}>
                    You are attempting to view content from an unreleased
                    version.
                    <br />
                    Please enable "Forbidden Knowledge" in the Settings to view
                    this page.
                </Text>
            )}
            <Button component={Link} to="/" variant="contained">
                <TextStyled
                    variant="h6-styled"
                    sx={{
                        color:
                            getContrastRatio(
                                theme.palette.primary.main,
                                theme.text.primary
                            ) > 4.5
                                ? theme.text.primary
                                : theme.text.contrast,
                    }}
                >
                    Back to Home
                </TextStyled>
            </Button>
        </Stack>
    );
}

export default PageNotFound;
