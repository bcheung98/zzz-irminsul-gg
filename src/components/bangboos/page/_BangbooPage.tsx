import { useParams } from "react-router";

// Component imports
import BangbooImage from "./BangbooImage";
import BangbooInfo from "./BangbooInfo";
import BangbooStats from "./BangbooStats";
import BangbooSkills from "./skills/BangbooSkills";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectBangboos } from "reducers/bangboo";

function BangbooPage() {
    const params = useParams<{ name: string }>();
    const bangboo = useAppSelector(selectBangboos).find(
        (disc) => disc.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (bangboo) {
        const documentTitle = `${bangboo.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `${bangboo.displayName} - ${bangboo.rarity}-Rank Bangboo | ${bangboo.description}`;
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

        return (
            <Stack spacing={2}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        <BangbooImage bangboo={bangboo} />
                    </Grid>
                    <Grid size="grow">
                        <Stack spacing={2}>
                            <BangbooInfo bangboo={bangboo} />
                            <BangbooStats bangboo={bangboo} />
                        </Stack>
                    </Grid>
                </Grid>
                <BangbooSkills bangboo={bangboo} />
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default BangbooPage;
