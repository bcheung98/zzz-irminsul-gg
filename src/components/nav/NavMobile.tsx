import React from "react";
import { Link as RouterLink, useLocation } from "react-router";

// Component imports
import Settings from "components/Settings";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import Logo from "./Logo";

// MUI imports
import {
    useTheme,
    AppBar,
    Toolbar,
    IconButton,
    SwipeableDrawer,
    Box,
    List,
    ButtonBase,
    Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { NavProps, navStyles } from "./Nav";

function NavMobile({ navItems, linkItems }: NavProps) {
    const theme = useTheme();

    const location = useLocation().pathname;
    const styles = navStyles(location);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setDrawerOpen(open);
        };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar disableGutters>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{ mx: "8px", color: theme.appbar.color }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Logo href="/" />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                        backgroundColor: theme.appbar.backgroundColor,
                        width: "100%",
                        overflowX: "hidden",
                    },
                }}
            >
                <AppBar position="static">
                    <Toolbar disableGutters>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ color: theme.appbar.color, mx: "8px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Logo href="https://irminsul.gg/" />
                    </Toolbar>
                </AppBar>
                <List>
                    <Box sx={styles.listItem("_")}>
                        <Settings />
                    </Box>
                </List>
                <Divider variant="middle" />
                <List>
                    {navItems.map((item, index) => (
                        <Box key={index} sx={styles.listItem(item.link)}>
                            <ButtonBase
                                component={RouterLink}
                                to={item.link}
                                sx={styles.listItemButton(item.link)}
                                onClick={toggleDrawer(false)}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    style={styles.navItem()}
                                />
                                <TextStyled
                                    sx={styles.listItemText(true, item.link)}
                                >
                                    {item.text}
                                </TextStyled>
                            </ButtonBase>
                        </Box>
                    ))}
                </List>
                <Divider variant="middle" />
                <TextStyled
                    variant="h6-styled"
                    sx={{ color: theme.appbar.color, ml: "20px", mt: "16px" }}
                >
                    Other Games
                </TextStyled>
                <List>
                    {linkItems.map((item, index) => (
                        <Box key={index} sx={styles.listItem(item.link)}>
                            <ButtonBase
                                href={item.link}
                                sx={styles.listItemButton()}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    style={styles.linkItem()}
                                />
                                <TextStyled sx={styles.listItemText()}>
                                    {item.text}
                                </TextStyled>
                            </ButtonBase>
                        </Box>
                    ))}
                </List>
            </SwipeableDrawer>
        </>
    );
}

export default NavMobile;
