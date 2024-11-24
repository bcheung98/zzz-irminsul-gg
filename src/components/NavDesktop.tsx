import { Fragment, useState } from "react"

// Component imports
import Image from "custom/Image"
import { TextStyled } from "styled/StyledTypography"
import { StyledTooltip } from "styled/StyledTooltip"

// MUI imports
import { styled, useTheme, Theme, CSSObject, SxProps, Toolbar, Box, IconButton, ButtonBase, CardHeader, List, ListItem, ListItemButton, ListItemAvatar, ListItemText, ListItemIcon, Divider, Collapse } from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

// Type imports
import { NavProps } from "./Nav"

const drawerWidth = 240 //px
const buttonHoverWidth = drawerWidth * 0.9 // px
const iconSize = 32 //px

function NavDesktop({ onHomePage, navItems, linkItems }: NavProps) {

    const theme = useTheme()

    const [drawerOpen, setDrawerOpen] = useState(onHomePage)
    const toggleDrawerState = () => {
        setDrawerOpen(!drawerOpen)
    }

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const listItemButtonStyle: SxProps = [
        {
            px: "4px",
            py: 0,
            borderRadius: "5px",
            "&:hover": {
                backgroundColor: theme.table.body.hover
            }
        },
        drawerOpen ?
            {
                width: buttonHoverWidth,
                height: "50px",
                my: 0,
                justifyContent: "initial"
            }
            :
            {
                width: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                height: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                my: "5px",
                justifyContent: "center"
            }
    ]

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Box sx={{ display: "flex", flexGrow: 0.97 }}>
                        <IconButton
                            onClick={toggleDrawerState}
                            sx={{ ml: "-10px", mr: "15px" }}
                        >
                            {
                                drawerOpen ?
                                    <MenuOpenIcon />
                                    :
                                    <MenuOpenIcon sx={{ transform: "rotate(180deg)" }} />
                            }
                        </IconButton>
                        <ButtonBase disableRipple href={onHomePage ? "https://irminsul.gg/" : `${process.env.REACT_APP_BASENAME}/`}>
                            <CardHeader
                                avatar={<Image src="https://assets.irminsul.gg/main/icons/Irminsul.png" alt="irminsul.gg" style={{ width: "48px", height: "48px" }} />}
                                title={
                                    <TextStyled variant="sitename">
                                        IRMINSUL.GG
                                    </TextStyled>
                                }
                                sx={{ px: 0 }}
                            />
                        </ButtonBase>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{ [`& .MuiDrawer-paper`]: { borderRight: `1px solid ${theme.border.color}`, backgroundColor: theme.appbar.backgroundColor, pt: 2.5 } }}
            >
                {/* Empty toolbar necessary for content to be below app bar */}
                <Toolbar />
                <List>
                    {
                        navItems.map((item, index) =>
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ mx: "12px" }}
                            >
                                <ButtonBase disableRipple href={item.link}>
                                    <ListItemButton
                                        disableTouchRipple
                                        sx={listItemButtonStyle}
                                    >
                                        <StyledTooltip title={!drawerOpen ? item.text : null} arrow placement="right">
                                            <ListItemAvatar sx={{ minWidth: 0, justifyContent: "center", mr: drawerOpen ? 2.5 : "auto" }}>
                                                {item.icon}
                                            </ListItemAvatar>
                                        </StyledTooltip>
                                        <ListItemText
                                            primary={<TextStyled>{item.text}</TextStyled>}
                                            sx={{ opacity: drawerOpen ? 1 : 0 }}
                                        />
                                    </ListItemButton>
                                </ButtonBase>
                            </ListItem>
                        )
                    }
                </List>
                <Divider variant="middle" />
                <List>
                    <ListItem
                        disablePadding
                        sx={{ mx: "17px" }}
                    >
                        <ButtonBase disableRipple onClick={toggleDropdownState}>
                            <ListItemButton
                                disableTouchRipple
                                sx={[
                                    {
                                        px: "4px",
                                        py: 0,
                                        borderRadius: "5px",
                                        "&:hover": {
                                            backgroundColor: `${theme.table.body.hover}`
                                        }
                                    },
                                    drawerOpen ?
                                        {
                                            width: `${drawerWidth * 0.8}px`,
                                            height: "50px",
                                            my: 0,
                                            justifyContent: "center"
                                        }
                                        :
                                        {
                                            width: `${iconSize}px`,
                                            height: `calc(${iconSize}px + ${iconSize * 0.25}px)`,
                                            my: "5px",
                                            justifyContent: "center"
                                        }
                                ]}
                            >
                                <StyledTooltip title={!drawerOpen ? "Other Games" : null} arrow placement="right">
                                    <ListItemIcon sx={{ color: theme.text.main, minWidth: 0, justifyContent: "center", mr: drawerOpen ? 3 : "auto" }}>
                                        {dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemIcon>
                                </StyledTooltip>
                                <ListItemText
                                    primary={<TextStyled>Other Games</TextStyled>}
                                    sx={{ opacity: drawerOpen ? 1 : 0 }}
                                />
                            </ListItemButton>
                        </ButtonBase>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ mx: "13px" }}
                    >
                        <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                            <List disablePadding>
                                {
                                    linkItems.map((item, index) =>
                                        <ListItem
                                            key={index}
                                            disablePadding
                                        >
                                            <ButtonBase disableRipple href={item.link}>
                                                <ListItemButton
                                                    disableTouchRipple
                                                    sx={listItemButtonStyle}
                                                >
                                                    <StyledTooltip title={!drawerOpen ? item.text : null} arrow placement="right">
                                                        <ListItemAvatar sx={{ minWidth: 0, justifyContent: "center", mr: drawerOpen ? 2.5 : "auto" }}>
                                                            {item.icon}
                                                        </ListItemAvatar>
                                                    </StyledTooltip>
                                                    <ListItemText
                                                        primary={<TextStyled>{item.text}</TextStyled>}
                                                        sx={{ opacity: drawerOpen ? 1 : 0 }}
                                                    />
                                                </ListItemButton>
                                            </ButtonBase>
                                        </ListItem>
                                    )
                                }
                            </List>
                        </Collapse>
                    </ListItem>
                </List>
            </Drawer>
        </Fragment>
    )

}

export default NavDesktop

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `${iconSize * 2 + 1}px`,
})

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
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
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme }) => ({
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
    }),
)