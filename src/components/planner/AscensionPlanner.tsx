import React from "react";

// Component imports
import CharacterSelector from "./CharacterSelector";
import WeaponSelector from "./WeaponSelector";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

function AscensionPlanner() {
    document.title = `Ascension Planner ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <React.Fragment>
            <TextStyled variant="h5" sx={{ mb: "20px", lineHeight: "36px" }}>
                Ascension Planner
            </TextStyled>
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 6, xl: 5 }}>
                    <CharacterSelector />
                </Grid>
                <Grid size={{ xs: 12, md: 6, xl: 5 }}>
                    <WeaponSelector />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AscensionPlanner;
