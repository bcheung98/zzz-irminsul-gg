// Component imports
import CharacterSelector from "./CharacterSelector";
import WeaponSelector from "./WeaponSelector";
import TotalCost from "./TotalCost";
import PlannerCard from "./PlannerCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { getSelectedCharacters, getSelectedWeapons } from "reducers/planner";

function Planner() {
    document.title = `Ascension Planner ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    return (
        <>
            <TextStyled variant="h5" sx={{ mb: "20px", lineHeight: "36px" }}>
                Ascension Planner
            </TextStyled>
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, lg: 6, xl: 5 }}>
                    <CharacterSelector />
                </Grid>
                <Grid size={{ xs: 12, lg: 6, xl: 5 }}>
                    <WeaponSelector />
                </Grid>
            </Grid>
            <Grid container spacing={5} sx={{ my: "24px" }}>
                <Grid size={{ xs: 12, xl: 10 }}>
                    <TotalCost />
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                {[...characters, ...weapons].map((item) => (
                    <Grid key={item.name} size={{ xs: 12, lg: 6, xl: 5 }}>
                        <PlannerCard data={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Planner;
