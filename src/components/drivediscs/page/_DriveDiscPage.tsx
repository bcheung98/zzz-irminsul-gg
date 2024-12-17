import { useParams } from "react-router";

// Component imports
import DriveDiscImage from "./DriveDiscImage";
import DriveDiscInfo from "./DriveDiscInfo";
import DriveDiscEffect from "./DriveDiscEffect";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectDriveDiscs } from "reducers/driveDiscs";

function DriveDiscPage() {
    const params = useParams<{ name: string }>();
    const driveDisc = useAppSelector(selectDriveDiscs).find(
        (disc) => disc.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (driveDisc) {
        document.title = `${driveDisc.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <DriveDiscImage disc={driveDisc} />
                </Grid>
                <Grid size="grow">
                    <DriveDiscInfo disc={driveDisc} />
                    <DriveDiscEffect disc={driveDisc} />
                </Grid>
            </Grid>
        );
    } else {
        return <PageNotFound />;
    }
}

export default DriveDiscPage;
