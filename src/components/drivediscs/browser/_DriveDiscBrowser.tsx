// Component imports
import DisplayCard from "custom/DisplayCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectDriveDiscs } from "reducers/driveDiscs";

function DriveDiscBrowser() {
    document.title = `Drive Discs ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const driveDiscs = [...useAppSelector(selectDriveDiscs)].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
    );

    return (
        <>
            <TextStyled variant="h5" sx={{ mb: "20px", lineHeight: "36px" }}>
                Drive Discs
            </TextStyled>
            <Grid container spacing={2}>
                {driveDiscs.map((disc, index) => (
                    <DisplayCard
                        key={index}
                        id={`${disc.name}-versionHighlights`}
                        name={disc.name}
                        displayName={disc.displayName}
                        type="drivedisc"
                        rarity={disc.rarity}
                    />
                ))}
            </Grid>
        </>
    );
}

export default DriveDiscBrowser;
