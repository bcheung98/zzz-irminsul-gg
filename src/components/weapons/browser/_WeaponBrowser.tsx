import React from "react";

// Component imports
import WeaponFilters from "./WeaponFilters";
import WeaponTable from "./WeaponTable";
import DisplayCard from "custom/DisplayCard";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Button, Drawer } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { filterWeapons } from "helpers/filterWeapons";
import { selectWeapons } from "reducers/weapon";
import { clearFilters, selectWeaponFilters } from "reducers/weaponFilters";
import { isRightDrawerOpen, toggleRightDrawer } from "reducers/layout";
import { RarityMap } from "data/common";

function WeaponBrowser() {
    document.title = `W-Engines ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const weapons = [...useAppSelector(selectWeapons)].sort(
        (a, b) =>
            RarityMap[b.rarity] - RarityMap[a.rarity] ||
            a.displayName.localeCompare(b.displayName)
    );
    const filters = useAppSelector(selectWeaponFilters);

    const [searchValue, setSearchValue] = React.useState("");
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentWeapons = React.useMemo(
        () => filterWeapons(weapons, filters, searchValue),
        [weapons, filters, searchValue]
    );

    const drawerOpen = useAppSelector(isRightDrawerOpen);
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const toggleDrawerState = () => {
        dispatch(toggleRightDrawer());
    };
    const handleMobileDrawerOpen = () => {
        setMobileDrawerOpen(true);
    };
    const handleMobileDrawerClose = () => {
        setMobileDrawerOpen(false);
    };

    type View = "card" | "table";
    const [view, setView] = React.useState<View>("card");
    const handleView = (_: React.BaseSyntheticEvent, newView: View) => {
        if (newView !== null) {
            setView(newView);
        }
    };
    const buttons: CustomToggleButtonProps[] = [
        {
            value: "card",
            icon: <ViewModuleIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    React.useEffect(() => {
        dispatch(clearFilters());
    }, []);

    React.useEffect(() => {
        dispatch(toggleRightDrawer(matches_md_up));
    }, [matches_md_up]);

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5" sx={{ lineHeight: "36px" }}>
                        W-Engines
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
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <Button
                        onClick={
                            matches_md_up
                                ? toggleDrawerState
                                : handleMobileDrawerOpen
                        }
                        variant="contained"
                        color="primary"
                        disableElevation
                        disableRipple
                        startIcon={
                            matches_md_up && drawerOpen ? (
                                <KeyboardArrowRightIcon />
                            ) : (
                                <TuneIcon />
                            )
                        }
                        sx={{ height: "36px" }}
                    >
                        Filters
                    </Button>
                </Grid>
            </Grid>
            {view === "card" && (
                <Grid container spacing={2}>
                    {currentWeapons.map((wep) => (
                        <DisplayCard
                            key={wep.id}
                            id={`${wep.name}-weaponBrowser`}
                            name={wep.name}
                            displayName={wep.displayName}
                            type="weapon"
                            rarity={wep.rarity}
                            info={{
                                specialty: wep.specialty,
                            }}
                        />
                    ))}
                </Grid>
            )}
            {view === "table" && <WeaponTable weapons={currentWeapons} />}
            <ActionFab
                action={
                    matches_md_up ? toggleDrawerState : handleMobileDrawerOpen
                }
                icon={<TuneIcon />}
                tooltip="Open filters"
                tooltipArrow="left"
            />
            {!matches_md_up && (
                <Drawer
                    sx={{
                        "& .MuiDrawer-paper": {
                            borderTop: `1px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.appbar.backgroundColor,
                            height: "auto",
                            maxHeight: "88%",
                        },
                    }}
                    variant="temporary"
                    anchor={matches_sm_up ? "right" : "bottom"}
                    open={mobileDrawerOpen}
                    onClose={handleMobileDrawerClose}
                >
                    <WeaponFilters handleClose={handleMobileDrawerClose} />
                </Drawer>
            )}
        </>
    );
}

export default WeaponBrowser;
