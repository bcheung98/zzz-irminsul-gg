// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectBangboos } from "reducers/bangboo";

function BangbooBrowser() {
    const documentTitle = `Bangboos ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Zenless Zone Zero Bangboos`;
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

    const bangboos = [...useAppSelector(selectBangboos)].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
    );

    return (
        <>
            <TextStyled
                variant="h5-styled"
                sx={{ mb: "20px", lineHeight: "36px" }}
            >
                Bangboos
            </TextStyled>
            <Grid container spacing={2}>
                {bangboos.map((bangboo, index) => (
                    <InfoCard
                        key={index}
                        id={`${bangboo.name}-bangbooBrowser`}
                        name={bangboo.name}
                        displayName={bangboo.displayName}
                        info={{ element: bangboo.element || undefined }}
                        type="bangboo"
                        rarity={bangboo.rarity}
                    />
                ))}
            </Grid>
        </>
    );
}

export default BangbooBrowser;
