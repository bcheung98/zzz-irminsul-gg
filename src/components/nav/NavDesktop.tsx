import React from "react";

// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";
import Logo from "./Logo";

// MUI imports
import {
    styled,
    useTheme,
    Theme,
    CSSObject,
    SxProps,
    Toolbar,
    Box,
    IconButton,
    ButtonBase,
    List,
    Divider,
    Collapse,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Helper imports
import { NavProps, navStyles } from "./Nav";

const drawerWidth = 240; // px
const iconSize = 32; // px

function NavDesktop({ onHomePage, navItems, linkItems }: NavProps) {
    const theme = useTheme();
    const styles = navStyles(theme);

    const [drawerOpen, setDrawerOpen] = React.useState(onHomePage);
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen);
    };

    const [dropdownOpen, setDropdownOpen] = React.useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const menuButtonStyle: SxProps = {
        borderRadius: "5px",
        px: "2px",
        width: "36px",
        height: "36px",
        "&:hover": {
            backgroundColor: theme.table.body.hover,
        },
    };

    const menuIconStyle: SxProps = {
        minWidth: "32px",
        width: "32px",
        height: "32px",
        padding: "4px",
        transform: drawerOpen ? "rotateY(0deg)" : "rotateY(180deg)",
        transition: "transform 0.25s",
    };

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar disableGutters>
                    <Box sx={{ width: "64px", px: "14px" }}>
                        <IconButton
                            onClick={toggleDrawerState}
                            disableRipple
                            disableTouchRipple
                            sx={menuButtonStyle}
                        >
                            <MenuOpenIcon sx={menuIconStyle} />
                        </IconButton>
                    </Box>
                    <Logo onHomePage={onHomePage} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{
                    boxSizing: "content-box",
                    [`& .MuiDrawer-paper`]: {
                        borderRight: `1px solid ${theme.border.color}`,
                        backgroundColor: theme.appbar.backgroundColor,
                        pt: 2.5,
                    },
                }}
            >
                {/* Empty toolbar necessary for content to be below app bar */}
                <Toolbar />
                <List>
                    {navItems.map((item, index) => (
                        <Box key={index} sx={styles.listItem(item.link)}>
                            <ButtonBase
                                href={item.link}
                                disableRipple
                                disableTouchRipple
                                sx={styles.listItemButton()}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    style={styles.navItem()}
                                    tooltip={!drawerOpen ? item.text : null}
                                    tooltipArrow="right"
                                />
                                <TextStyled
                                    sx={styles.listItemText(drawerOpen)}
                                >
                                    {item.text}
                                </TextStyled>
                            </ButtonBase>
                        </Box>
                    ))}
                </List>
                <Divider variant="middle" />
                <List>
                    <Box sx={styles.listItem("_")}>
                        <IconButton
                            onClick={toggleDropdownState}
                            disableRipple
                            disableTouchRipple
                            sx={styles.listItemButton()}
                        >
                            <StyledTooltip
                                title={!drawerOpen ? "Other Games" : null}
                                arrow
                                placement="right"
                            >
                                <ExpandMore
                                    sx={styles.listIcon(dropdownOpen)}
                                />
                            </StyledTooltip>
                            <TextStyled sx={styles.listItemText(drawerOpen)}>
                                Other Games
                            </TextStyled>
                        </IconButton>
                    </Box>
                    <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                        {linkItems.map((item, index) => (
                            <Box key={index} sx={styles.listItem(item.link)}>
                                <ButtonBase
                                    href={item.link}
                                    disableRipple
                                    disableTouchRipple
                                    sx={styles.listItemButton()}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.text}
                                        style={styles.linkItem()}
                                        tooltip={!drawerOpen ? item.text : null}
                                        tooltipArrow="right"
                                    />
                                    <TextStyled
                                        sx={styles.listItemText(drawerOpen)}
                                    >
                                        {item.text}
                                    </TextStyled>
                                </ButtonBase>
                            </Box>
                        ))}
                    </Collapse>
                </List>
            </Drawer>
        </React.Fragment>
    );
}

export default NavDesktop;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${iconSize * 2}px`,
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));
