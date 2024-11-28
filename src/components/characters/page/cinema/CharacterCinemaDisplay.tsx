import parse from "html-react-parser";

// Component imports
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { CharacterCinemaKey, CharacterProps } from "types/character";

function CharacterCinemaDisplay({ character }: CharacterProps) {
    const theme = useTheme();
    const { cinema } = character;

    return (
        <MainContentBox title="Mindscape Cinema">
            <Grid container rowSpacing={2} columnSpacing={6}>
                {Object.keys(cinema).map((key, index) => (
                    <Grid
                        key={key}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        sx={{
                            p: 2,
                            backgroundColor: theme.background(1),
                            border: theme.mainContentBox.border,
                            borderRadius: theme.mainContentBox.borderRadius,
                        }}
                    >
                        <TextStyled variant="h6" sx={{ mb: "5px" }}>
                            {`${index + 1}. ${
                                cinema[key as CharacterCinemaKey].name
                            }`}
                        </TextStyled>
                        <TextStyled>
                            {parse(
                                cinema[key as CharacterCinemaKey].description
                            )}
                        </TextStyled>
                    </Grid>
                ))}
            </Grid>
        </MainContentBox>
    );
}

export default CharacterCinemaDisplay;
