import React from "react";

// Component imports
import CharacterFilters from "./CharacterFilters";
import CharacterTable from "./CharacterTable";
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
import { filterCharacters } from "helpers/filterCharacters";
import { selectCharacters } from "reducers/character";
import { selectCharacterFilters } from "reducers/characterFilters";

const drawerWidth = 350; // px

function CharacterBrowser() {
    document.title = `Agents ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );
    const filters = useAppSelector(selectCharacterFilters);

    const [searchValue, setSearchValue] = React.useState("");
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentCharacters = React.useMemo(
        () => filterCharacters(characters, filters, searchValue),
        [characters, filters, searchValue]
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
                            Agents
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
                        {currentCharacters.map((char) => (
                            <DisplayCard
                                key={char.id}
                                id={`${char.name}-characterBrowser`}
                                name={char.name}
                                displayName={char.fullName}
                                type="character"
                                rarity={char.rarity}
                                info={{
                                    element: char.element,
                                    specialty: char.specialty,
                                }}
                            />
                        ))}
                    </Grid>
                )}
                {view === "table" && (
                    <CharacterTable characters={currentCharacters} />
                )}
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
                <CharacterFilters handleClose={handleDrawerClose} />
                {matches_md_up && <Toolbar />}
            </Drawer>
        </Box>
    );
}

export default CharacterBrowser;

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
