import React from "react";

// Component imports
import CharacterSelector from "./CharacterSelector";
import WeaponSelector from "./WeaponSelector";
import TotalCost from "./TotalCost";
import PlannerCard from "./PlannerCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
} from "reducers/planner";
import { selectWidth } from "reducers/settings";

function Planner() {
    const documentTitle = `Ascension Planner ${
        import.meta.env.VITE_DOCUMENT_TITLE
    }`;
    const documentDesc = `Tool for calculating level-up costs`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const dispatch = useAppDispatch();

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const wideMode = useAppSelector(selectWidth) === "wide";
    const maxWidthLG = wideMode ? 6 : 8;
    const maxWidthXL = wideMode ? 5 : 6;

    React.useEffect(() => {
        dispatch(setPlannerCharacters([]));
        dispatch(setPlannerWeapons([]));
    }, []);

    return (
        <>
            <TextStyled
                variant="h5-styled"
                sx={{ mb: "20px", lineHeight: "36px" }}
            >
                Ascension Planner
            </TextStyled>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, lg: 6, xl: maxWidthXL }}>
                    <CharacterSelector />
                </Grid>
                <Grid size={{ xs: 12, lg: 6, xl: maxWidthXL }}>
                    <WeaponSelector />
                </Grid>
            </Grid>
            <Grid container spacing={4} sx={{ my: "24px" }}>
                <Grid size={{ xs: 12, xl: maxWidthXL * 2 }}>
                    <TotalCost />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={4}
                justifyContent={{
                    xs: wideMode ? "left" : "center",
                    xl: "left",
                }}
            >
                {[...characters, ...weapons].map((item) => (
                    <Grid
                        key={item.name}
                        size={{ xs: 12, lg: maxWidthLG, xl: maxWidthXL }}
                    >
                        <PlannerCard data={item} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Planner;
