import React from "react"

// Component imports
import Image from "custom/Image"
import { TextStyled } from "styled/StyledTypography"
import Logo from "./Logo"

// MUI imports
import { useTheme, SxProps, AppBar, Toolbar, IconButton, SwipeableDrawer, Box, List, ButtonBase, Divider } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"

// Helper imports
import { NavProps } from "./Nav"

const iconSize = 32 // px

function NavMobile({ onHomePage, navItems, linkItems }: NavProps) {

    const theme = useTheme()

    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
                ) {
                    return
                }
                setDrawerOpen(open)
            }

    const navItemsStyle: React.CSSProperties = {
        width: iconSize,
        height: iconSize,
        padding: "2px"
    }

    const linkItemsStyle: React.CSSProperties = {
        width: iconSize,
        height: iconSize,
        borderRadius: "5px"
    }

    const listItemStyle: SxProps = {
        px: `${(iconSize * 2) / 8}px`,
    }

    const listItemButtonStyle: SxProps = {
        borderRadius: "5px",
        justifyContent: "left",
        px: `${(iconSize * 2) / 8}px`,
        width: "100%",
        height: `${iconSize * 1.5}px`
    }

    const listItemTextStyle: SxProps = {
        ml: "20px"
    }

    return (
        <React.Fragment>
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
                    }
                }}
            >
                <AppBar position="static">
                    <Toolbar disableGutters>
                        <IconButton onClick={toggleDrawer(false)} sx={{ mx: "8px" }}>
                            <CloseIcon />
                        </IconButton>
                        <Logo onHomePage={onHomePage} />
                    </Toolbar>
                </AppBar>
                <List>
                    {
                        navItems.map((item, index) =>
                            <Box key={index} sx={listItemStyle}>
                                <ButtonBase
                                    href={item.link}
                                    sx={listItemButtonStyle}
                                >
                                    <Image src={item.icon} alt={item.text} style={navItemsStyle} />
                                    <TextStyled sx={listItemTextStyle}>
                                        {item.text}
                                    </TextStyled>
                                </ButtonBase>
                            </Box>
                        )
                    }
                </List>
                <Divider variant="middle" />
                <List>
                    <TextStyled sx={[{ ...listItemTextStyle }, { mt: "4px", height: `${iconSize}px` }]}>
                        Other Games
                    </TextStyled>
                    {
                        linkItems.map((item, index) =>
                            <Box key={index} sx={listItemStyle}>
                                <ButtonBase
                                    href={item.link}
                                    sx={listItemButtonStyle}
                                >
                                    <Image src={item.icon} alt={item.text} style={linkItemsStyle} />
                                    <TextStyled sx={listItemTextStyle}>
                                        {item.text}
                                    </TextStyled>
                                </ButtonBase>
                            </Box>
                        )
                    }
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    )

}

export default NavMobile