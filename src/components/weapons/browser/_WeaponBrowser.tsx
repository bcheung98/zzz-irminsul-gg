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
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Theme,
    Box,
    Button,
    Drawer,
    Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { filterWeapons } from "helpers/filterWeapons";
import { selectWeapons } from "reducers/weapon";
import { selectWeaponFilters } from "reducers/weaponFilters";
import { RarityMap } from "data/common";

const drawerWidth = 350; // px

function WeaponBrowser() {
    document.title = `W-Engines ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

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

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
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

    return (
        <Box sx={{ display: { xs: "block", md: "flex" } }}>
            <Box sx={rootStyle(theme, drawerOpen, matches_md_up)}>
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
                            onClick={toggleDrawerState}
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
                    <Grid container spacing={2.5}>
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
                    action={toggleDrawerState}
                    icon={<TuneIcon />}
                    tooltip="Open filters"
                    tooltipArrow="left"
                />
            </Box>
            <Drawer
                sx={
                    matches_sm_up
                        ? {
                              width: drawerWidth,
                              flexShrink: 0,
                              "& .MuiDrawer-paper": {
                                  width: drawerWidth,
                                  borderLeft: `1px solid ${theme.border.color.primary}`,
                                  backgroundColor: theme.appbar.backgroundColor,
                                  pb: 2.5,
                                  scrollbarWidth: "none",
                              },
                          }
                        : {
                              "& .MuiDrawer-paper": {
                                  borderTop: `1px solid ${theme.border.color.primary}`,
                                  backgroundColor: theme.appbar.backgroundColor,
                                  height: "auto",
                                  maxHeight: "88%",
                              },
                          }
                }
                variant={matches_md_up ? "persistent" : "temporary"}
                anchor={matches_sm_up ? "right" : "bottom"}
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                {/* 
                Empty toolbars necessary for desktop for content to be below the app bar
                Not needed for mobile because drawer will be above the app bar
                */}
                {matches_md_up && <Toolbar />}
                <WeaponFilters handleClose={handleDrawerClose} />
                {matches_md_up && <Toolbar />}
            </Drawer>
        </Box>
    );
}

export default WeaponBrowser;

const rootStyle = (theme: Theme, open: boolean, matches: boolean): SxProps =>
    matches
        ? {
              position: "relative",
              marginRight: open ? 0 : `-${drawerWidth}px`,
              flexGrow: 1,
              transition: open
                  ? theme.transitions.create("margin", {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    })
                  : theme.transitions.create("margin", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
              /**
               * IMPORTANT: prevents layout deformities in list view
               * (don't really know why this works but hey it works)
               */
              width: 0,
          }
        : {
              position: "static",
              marginRight: 0,
              flexGrow: 0,
          };
