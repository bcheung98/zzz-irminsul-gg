import { useParams } from "react-router";

// Component imports
import CharacterImage from "./CharacterImage";
import CharacterInfoMain from "./CharacterInfoMain";
import CharacterInfoMisc from "./CharacterInfoMisc";
import CharacterStats from "./CharacterStats";
import CharacterAscension from "./CharacterAscension";
import CharacterSkills from "./skills/CharacterSkills";
import CharacterCinema from "./CharacterCinema";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
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
        document.title = `${character.fullName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;

        const charSplash = <CharacterImage character={character} />;
        const infoMain = <CharacterInfoMain character={character} />;
        const infoMisc = <CharacterInfoMisc character={character} />;
        const ascension = <CharacterAscension character={character} />;
        const stats = <CharacterStats character={character} />;

        return (
            <Stack spacing={2}>
                {matches_md_up ? (
                    <Grid container spacing={3}>
                        <Grid size={{ md: 4, xl: "auto" }}>
                            <Stack spacing={2}>
                                {charSplash}
                                {infoMisc}
                            </Stack>
                        </Grid>
                        <Grid size="grow">
                            <Stack spacing={2}>
                                {infoMain}
                                {stats}
                                {ascension}
                            </Stack>
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        {infoMain}
                        {charSplash}
                        {stats}
                        {ascension}
                        {infoMisc}
                    </>
                )}
                <CharacterSkills character={character} />
                <CharacterCinema character={character} />
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default CharacterPage;
