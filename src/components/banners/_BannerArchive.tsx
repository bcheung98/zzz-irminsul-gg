import { BaseSyntheticEvent, useState } from "react";

// Component imports
import BannerList from "./BannerList";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWidth } from "reducers/settings";

function BannerArchive() {
    const documentTitle = `Banner Archive ${
        import.meta.env.VITE_DOCUMENT_TITLE
    }`;
    const documentDesc = `A list of all Zenless Zone Zero Signal Searches`;
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

    const theme = useTheme();
    const matches_md_dn = useMediaQuery(theme.breakpoints.down("md"));

    const maxWidth = useAppSelector(selectWidth) === "wide" ? 5 : 6;

    const CharacterBannerList = <BannerList type="character" />;
    const WeaponBannerList = <BannerList type="weapon" />;

    const [value, setValue] = useState<"character" | "weapon">("character");
    const handleValue = (
        _: BaseSyntheticEvent,
        newView: "character" | "weapon"
    ) => {
        if (newView !== null) {
            setValue(newView);
        }
    };

    const buttons: CustomToggleButtonProps[] = [
        { value: "character", label: "Agent" },
        { value: "weapon", label: "W-Engine" },
    ];

    return (
        <>
            <TextStyled
                variant="h5-styled"
                sx={{ mb: "20px", lineHeight: "36px" }}
            >
                Banner Archive
            </TextStyled>
            <ToggleButtons
                buttons={buttons}
                value={value}
                exclusive
                onChange={handleValue}
                spacing={0}
                padding={10}
                highlightOnHover={false}
                sx={{ mb: "20px", display: { xs: "block", md: "none" } }}
            />
            {!matches_md_dn ? (
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, lg: 6, xl: maxWidth }}>
                        <TextStyled variant="h6-styled" sx={{ mb: "20px" }}>
                            Agent Banner
                        </TextStyled>
                        {CharacterBannerList}
                    </Grid>
                    <Grid size={{ xs: 12, lg: 6, xl: maxWidth }}>
                        <TextStyled variant="h6-styled" sx={{ mb: "20px" }}>
                            W-Engine Banner
                        </TextStyled>
                        {WeaponBannerList}
                    </Grid>
                </Grid>
            ) : (
                <>
                    {value === "character" && CharacterBannerList}
                    {value === "weapon" && WeaponBannerList}
                </>
            )}
        </>
    );
}

export default BannerArchive;
