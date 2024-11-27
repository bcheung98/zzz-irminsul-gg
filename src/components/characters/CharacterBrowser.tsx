import React from "react";

// Component imports
import DisplayCard from "custom/DisplayCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

function CharacterBrowser() {
    const theme = useTheme();

    const characters = useAppSelector(selectCharacters);
    const currentCharacters = characters;

    document.title = `Agents ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <React.Fragment>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={4}
                sx={{ mb: "20px" }}
            >
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Box sx={{ display: "flex" }}>
                        <TextStyled variant="h5" className="page-name">
                            Agents
                        </TextStyled>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid size="grow">
                    {currentCharacters.length > 0 ? (
                        <React.Fragment>
                            <Grid container spacing={2.5}>
                                {currentCharacters.map((char) => (
                                    <DisplayCard
                                        key={char.id}
                                        id={`${char.name}-characterBrowser`}
                                        name={char.name}
                                        displayName={char.fullName}
                                        type="character"
                                        rarity={char.rarity}
                                        info={{
                                            element: char.element,
                                            specialty: char.specialty,
                                        }}
                                    />
                                ))}
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <LinearProgress />
                    )}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default CharacterBrowser;
