import React from "react";

// Component imports
import CharacterFilters from "./CharacterFilters";
import DisplayCard from "custom/DisplayCard";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    styled,
    Box,
    Button,
    Drawer,
    SwipeableDrawer,
    Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { filterCharacters } from "helpers/filterCharacters";
import { selectCharacters } from "reducers/character";
import { selectCharacterFilters } from "reducers/characterFilters";

const drawerWidth = 350; // px

function CharacterBrowser() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const characters = useAppSelector(selectCharacters);
    const filters = useAppSelector(selectCharacterFilters);

    const currentCharacters = React.useMemo(
        () => filterCharacters(characters, filters),
        [characters, filters]
    );

    const [desktopDrawerOpen, setDesktopDrawerOpen] = React.useState(true);
    const toggleDesktopDrawerState = () => {
        setDesktopDrawerOpen(!desktopDrawerOpen);
    };
    const handleDesktopDrawerClose = () => {
        setDesktopDrawerOpen(false);
    };

    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const toggleMobileDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setMobileDrawerOpen(open);
        };

    function CharacterBrowserRoot() {
        return (
            <React.Fragment>
                <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={4}
                    sx={{ mb: "20px" }}
                >
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        <FlexBox>
                            <TextStyled variant="h5" className="page-name">
                                Agents
                            </TextStyled>
                        </FlexBox>
                    </Grid>
                    <Grid size="grow">
                        <FlexBox>
                            <Button
                                onClick={
                                    matches_md_up
                                        ? toggleDesktopDrawerState
                                        : toggleMobileDrawer(true)
                                }
                                variant="outlined"
                                startIcon={
                                    matches_md_up && desktopDrawerOpen ? (
                                        <CloseIcon />
                                    ) : (
                                        <TuneIcon />
                                    )
                                }
                                sx={{
                                    backgroundColor: theme.menu.hover,
                                    color: theme.text.main,
                                    height: "40px",
                                    mr: "25px",
                                }}
                            >
                                <TextStyled sx={{ textTransform: "none" }}>
                                    Filters
                                </TextStyled>
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid size="grow">
                        {currentCharacters.length > 0 ? (
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
                        ) : null}
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    document.title = `Agents ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <React.Fragment>
            {matches_md_up ? (
                <Box sx={{ display: "flex" }}>
                    <Main open={desktopDrawerOpen}>
                        <CharacterBrowserRoot />
                    </Main>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                borderLeft: `1px solid ${theme.border.color}`,
                                backgroundColor: theme.background(3),
                                pt: 2.5,
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={desktopDrawerOpen}
                    >
                        {/* Empty toolbar necessary for content to be below app bar */}
                        <Toolbar />
                        <CharacterFilters
                            handleClose={handleDesktopDrawerClose}
                        />
                    </Drawer>
                </Box>
            ) : (
                <React.Fragment>
                    <CharacterBrowserRoot />
                    <SwipeableDrawer
                        anchor="bottom"
                        open={mobileDrawerOpen}
                        onClose={toggleMobileDrawer(false)}
                        onOpen={toggleMobileDrawer(true)}
                        sx={{
                            [`& .MuiDrawer-paper`]: {
                                borderTop: `2px solid ${theme.border.color}`,
                                backgroundColor: theme.background(3),
                                height: "auto",
                                maxHeight: "88%",
                            },
                        }}
                    >
                        <CharacterFilters
                            handleClose={toggleMobileDrawer(false)}
                        />
                    </SwipeableDrawer>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default CharacterBrowser;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: `-${drawerWidth}px`,
    position: "relative",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: 0,
            },
        },
    ],
}));
