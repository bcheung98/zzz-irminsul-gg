import React from "react";
import { useParams } from "react-router";

// Component imports
import CharacterImage from "./CharacterImage";
import CharacterInfoMain from "./CharacterInfoMain";
import CharacterInfoMisc from "./CharacterInfoMisc";
import CharacterTable from "./CharacterTable";
import CharacterSkillDisplay from "./skills/CharacterSkillDisplay";
import CharacterCinemaDisplay from "./cinema/CharacterCinemaDisplay";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

function CharacterPage() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const params = useParams<{ name: string }>();
    const character = useAppSelector(selectCharacters).find(
        (char) => char.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (character) {
        const charSplash = <CharacterImage character={character} />;
        const infoMain = <CharacterInfoMain character={character} />;
        const infoMisc = <CharacterInfoMisc character={character} />;
        const stats = <CharacterTable character={character} />;

        document.title = `${character.fullName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;

        return (
            <React.Fragment>
                <Box sx={{ mb: "15px" }}>
                    {matches_md_up ? (
                        <Grid container spacing={3}>
                            <Grid size={{ md: 4, xl: "auto" }}>
                                {charSplash}
                                <br />
                                {infoMisc}
                            </Grid>
                            <Grid size="grow">
                                {infoMain}
                                {stats}
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2} columns={1}>
                            {infoMain}
                            {charSplash}
                            {stats}
                            {infoMisc}
                        </Grid>
                    )}
                </Box>
                <CharacterSkillDisplay character={character} />
                <br />
                <CharacterCinemaDisplay character={character} />
            </React.Fragment>
        );
    } else {
        return <PageNotFound />;
    }
}

export default CharacterPage;
