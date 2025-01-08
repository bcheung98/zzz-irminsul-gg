import { useParams } from "react-router";

// Component imports
import DriveDiscImage from "./DriveDiscImage";
import DriveDiscInfo from "./DriveDiscInfo";
import DriveDiscEffect from "./DriveDiscEffect";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import { Stack } from "@mui/material";
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
        const documentTitle = `${driveDisc.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `2-Pieces: ${driveDisc.setEffect.twoPiece}\n4-Pieces: ${driveDisc.setEffect.fourPiece}`;
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
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <DriveDiscImage disc={driveDisc} />
                </Grid>
                <Grid size="grow">
                    <Stack spacing={2}>
                        <BetaTag version={driveDisc.release.version} />
                        <DriveDiscInfo disc={driveDisc} />
                        <DriveDiscEffect disc={driveDisc} />
                    </Stack>
                </Grid>
            </Grid>
        );
    } else {
        return <PageNotFound />;
    }
}

export default DriveDiscPage;
