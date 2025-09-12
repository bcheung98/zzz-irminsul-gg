import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import DriveDiscListRow from "./DriveDiscListRow";
import InfoCard from "custom/InfoCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectDriveDiscs } from "reducers/driveDiscs";
import { selectBrowserSettings, setBrowserView, View } from "reducers/browser";

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

    const dispatch = useAppDispatch();

    const driveDiscs = [...useAppSelector(selectDriveDiscs)].sort(
        (a, b) =>
            b.release.version.localeCompare(a.release.version) ||
            b.displayName.localeCompare(a.displayName)
    );

    const browserSettings = useAppSelector(selectBrowserSettings).driveDiscs;

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentDriveDiscs = useMemo(
        () => filterDriveDiscs(driveDiscs, searchValue),
        [driveDiscs, searchValue]
    );

    const currentView = browserSettings.view;
    const [view, setView] = useState<View>(currentView);
    const handleView = (_: BaseSyntheticEvent, view: View) => {
        if (view !== null) {
            setView(view);
            dispatch(setBrowserView({ type: "driveDiscs", view }));
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

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
                <Grid size={{ xs: 6, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={buttons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
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
            {view === "icon" && (
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
            )}
            {view === "table" && (
                <Card>
                    {currentDriveDiscs.map((disc, index) => (
                        <DriveDiscListRow
                            key={index}
                            disc={disc}
                            index={index}
                        />
                    ))}
                </Card>
            )}
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
