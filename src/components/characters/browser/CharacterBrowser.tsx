import React from "react";

// Component imports
import CharacterFilters from "./CharacterFilters";
import DisplayCard from "custom/DisplayCard";
import SearchBar from "custom/SearchBar";
import ActionFab from "custom/ActionFab";
import { FlexBox } from "styled/StyledBox";
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
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { filterCharacters } from "helpers/filterCharacters";
import { selectCharacters } from "reducers/character";
import { selectCharacterFilters } from "reducers/characterFilters";

const drawerWidth = 300; // px

function CharacterBrowser() {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characters = useAppSelector(selectCharacters);
    const filters = useAppSelector(selectCharacterFilters);

    const [searchValue, setSearchValue] = React.useState("");
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const currentCharacters = React.useMemo(
        () => filterCharacters(characters, filters, searchValue),
        [characters, filters, searchValue]
    );

    document.title = `Agents ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <React.Fragment>
            <Box sx={{ display: "flex" }}>
                <Box sx={rootStyle(theme, drawerOpen, matches_md_up)}>
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={4}
                        sx={{ mb: "20px" }}
                    >
                        <Grid size={{ xs: 12, sm: "auto" }}>
                            <FlexBox>
                                <TextStyled
                                    variant="h5"
                                    sx={{ lineHeight: "36px" }}
                                >
                                    Agents
                                </TextStyled>
                            </FlexBox>
                        </Grid>
                        <Grid size="grow">
                            <FlexBox>
                                <Box sx={{ width: "80%", mr: "20px" }}>
                                    <SearchBar
                                        placeholder="Search"
                                        value={searchValue}
                                        onChange={handleInputChange}
                                        size={{ height: "36px" }}
                                    />
                                </Box>
                                <Button
                                    onClick={toggleDrawerState}
                                    variant="outlined"
                                    disableRipple
                                    startIcon={
                                        matches_sm_up && drawerOpen ? (
                                            <KeyboardArrowRightIcon />
                                        ) : (
                                            <TuneIcon />
                                        )
                                    }
                                    sx={{
                                        height: "36px",
                                        border: 0,
                                        backgroundColor:
                                            theme.menu.selectedHover,
                                    }}
                                >
                                    Filters
                                </Button>
                            </FlexBox>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid size="grow">
                            <React.Fragment>
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
                            </React.Fragment>
                        </Grid>
                    </Grid>
                    <ActionFab action={toggleDrawerState} icon={<TuneIcon />} />
                </Box>
                <Drawer
                    sx={
                        matches_sm_up
                            ? {
                                  width: drawerWidth,
                                  flexShrink: 0,
                                  "& .MuiDrawer-paper": {
                                      width: drawerWidth,
                                      borderLeft: `1px solid ${theme.border.color}`,
                                      backgroundColor: theme.background(3),
                                      pt: 2.5,
                                  },
                              }
                            : {
                                  "& .MuiDrawer-paper": {
                                      borderTop: `1px solid ${theme.border.color}`,
                                      backgroundColor: theme.background(3),
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
                    {/* Empty toolbar necessary for desktop for content to be below app bar
                    Not needed for mobile because drawer will be above the app bar
                    */}
                    {matches_sm_up && <Toolbar />}
                    <CharacterFilters handleClose={handleDrawerClose} />
                </Drawer>
            </Box>
        </React.Fragment>
    );
}

export default CharacterBrowser;

const rootStyle = (theme: Theme, open: boolean, matches: boolean): SxProps =>
    matches
        ? {
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
              marginRight: open ? 0 : `-${drawerWidth}px`,
              position: "relative",
          }
        : {
              flexGrow: 0,
              marginRight: 0,
              position: "static",
          };
