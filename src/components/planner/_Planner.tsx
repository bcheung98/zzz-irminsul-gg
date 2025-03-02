import { useEffect } from "react";

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
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import {
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
} from "reducers/planner";
import { selectWidth } from "reducers/settings";
import { isUnreleasedContent } from "helpers/utils";

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

    const wideMode = useAppSelector(selectWidth) === "wide";
    const maxWidthLG = wideMode ? 6 : 8;
    const maxWidthXL = wideMode ? 5.5 : 6;

    const storedSettings = localStorage.getItem("settings") || "{}";
    const { unreleasedContent = false } = JSON.parse(storedSettings);

    let characters = useAppSelector(getSelectedCharacters);
    let weapons = useAppSelector(getSelectedWeapons);

    const charData = useAppSelector(selectCharacters);
    const wepData = useAppSelector(selectWeapons);

    characters = characters.map((character) => {
        const currentChar = charData.find(
            (c) => c.id === Number(character.id.split("_")[1])
        )!;
        character = JSON.parse(JSON.stringify(character));
        character.name = currentChar.name;
        character.fullName = currentChar.fullName;
        return character;
    });
    weapons = weapons.map((weapon) => {
        const currentWep = wepData.find(
            (w) => w.id === Number(weapon.id.split("_")[1])
        )!;
        weapon = JSON.parse(JSON.stringify(weapon));
        weapon.name = currentWep.name;
        weapon.displayName = currentWep.displayName;
        return weapon;
    });

    if (!unreleasedContent) {
        characters = characters.filter((char) =>
            isUnreleasedContent(char.release.version)
        );
        weapons = weapons.filter((wep) =>
            isUnreleasedContent(wep.release.version)
        );
    }

    useEffect(() => {
        dispatch(setPlannerCharacters(characters));
        dispatch(setPlannerWeapons(weapons));
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
                        key={item.id}
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
