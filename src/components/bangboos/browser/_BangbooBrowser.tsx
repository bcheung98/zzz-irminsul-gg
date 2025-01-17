import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import InfoCard from "custom/InfoCard";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectBangboos } from "reducers/bangboo";

// Type imports
import { Bangboo } from "types/bangboo";

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

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentBangboos = useMemo(
        () => filterBangboos(bangboos, searchValue),
        [bangboos, searchValue]
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
                        Bangboos
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
                {currentBangboos.map((bangboo, index) => (
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

function filterBangboos(bangboos: Bangboo[], searchValue: string) {
    if (searchValue !== "") {
        return bangboos.filter(
            (bangboo) =>
                bangboo.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                bangboo.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    } else {
        return bangboos;
    }
}
