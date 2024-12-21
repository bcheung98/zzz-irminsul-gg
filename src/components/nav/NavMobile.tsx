import React from "react";

// Component imports
import Settings from "./Settings";
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

function NavMobile({ onHomePage, navItems, linkItems }: NavProps) {
    const theme = useTheme();
    const styles = navStyles(theme);

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
                    <IconButton onClick={toggleDrawer(true)} sx={{ mx: "8px" }}>
                        <MenuIcon />
                    </IconButton>
                    <Logo onHomePage={onHomePage} />
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="top"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    [`& .MuiDrawer-paper`]: {
                        backgroundColor: theme.background(0),
                        borderBottom: `1px solid ${theme.border.color}`,
                        height: "100%",
                        overflowX: "hidden",
                    },
                }}
            >
                <AppBar position="static">
                    <Toolbar disableGutters>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ mx: "8px" }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Logo onHomePage={onHomePage} />
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
                                href={item.link}
                                sx={styles.listItemButton()}
                            >
                                <Image
                                    src={item.icon}
                                    alt={item.text}
                                    style={styles.navItem()}
                                />
                                <TextStyled sx={styles.listItemText()}>
                                    {item.text}
                                </TextStyled>
                            </ButtonBase>
                        </Box>
                    ))}
                </List>
                <Divider variant="middle" />
                <List>
                    <TextStyled sx={{ ml: "20px", my: "10px" }}>
                        Other Games
                    </TextStyled>
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
