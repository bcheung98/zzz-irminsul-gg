import { useParams } from "react-router";

// Component imports
import BangbooImage from "./BangbooImage";
import BangbooInfo from "./BangbooInfo";
import BangbooStats from "./BangbooStats";
import BangbooSkills from "./skills/BangbooSkills";
import PageNotFound from "components/PageNotFound";

// MUI Imports
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
        document.title = `${bangboo.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;

        return (
            <>
                <Grid container spacing={3} sx={{ mb: "15px" }}>
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        <BangbooImage bangboo={bangboo} />
                    </Grid>
                    <Grid size="grow">
                        <BangbooInfo bangboo={bangboo} />
                        <BangbooStats bangboo={bangboo} />
                    </Grid>
                </Grid>
                <BangbooSkills bangboo={bangboo} />
            </>
        );
    } else {
        return <PageNotFound />;
    }
}

export default BangbooPage;
