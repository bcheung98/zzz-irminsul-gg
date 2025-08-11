import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import InfoCard from "custom/InfoCard";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectDriveDiscs } from "reducers/driveDiscs";

// Type imports
import { DriveDisc } from "types/driveDisc";

function DriveDiscBrowser() {
    const documentTitle = `Drive Discs ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Zenless Zone Zero Drive Discs`;
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

    const driveDiscs = [...useAppSelector(selectDriveDiscs)].sort(
        (a, b) =>
            b.release.version.localeCompare(a.release.version) ||
            b.displayName.localeCompare(a.displayName)
    );

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentDriveDiscs = useMemo(
        () => filterDriveDiscs(driveDiscs, searchValue),
        [driveDiscs, searchValue]
    );

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Drive Discs
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {currentDriveDiscs.map((disc, index) => (
                    <InfoCard
                        key={index}
                        id={`${disc.name}-driveDiscBrowser`}
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

function filterDriveDiscs(discs: DriveDisc[], searchValue: string) {
    if (searchValue !== "") {
        return discs.filter(
            (disc) =>
                disc.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                disc.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    } else {
        return discs;
    }
}
