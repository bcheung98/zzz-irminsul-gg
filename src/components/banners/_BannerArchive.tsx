import React from "react";

// Component imports
import BannerList from "./BannerList";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

function BannerArchive() {
    document.title = `Banner Archive ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const theme = useTheme();

    const matches_md_dn = useMediaQuery(theme.breakpoints.down("md"));

    const CharacterBannerList = <BannerList type="character" />;
    const WeaponBannerList = <BannerList type="weapon" />;

    const [value, setValue] = React.useState<"character" | "weapon">("character");
    const handleValue = (
        _: React.BaseSyntheticEvent,
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
            <TextStyled variant="h5" sx={{ mb: "20px", lineHeight: "36px" }}>
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
                <Grid container spacing={5}>
                    <Grid size={{ xs: 12, md: 6, xl: 5 }}>
                        <TextStyled variant="h6" sx={{ mb: "20px" }}>
                            Agent Banner
                        </TextStyled>
                        {CharacterBannerList}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, xl: 5 }}>
                        <TextStyled variant="h6" sx={{ mb: "20px" }}>
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
