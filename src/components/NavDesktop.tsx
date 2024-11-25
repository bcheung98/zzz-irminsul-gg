import { CSSProperties, Fragment, useState } from "react"

// Component imports
import Image from "custom/Image"
import { TextStyled } from "styled/StyledTypography"
import { StyledTooltip } from "styled/StyledTooltip"

// MUI imports
import { styled, useTheme, Theme, CSSObject, SxProps, Toolbar, Box, IconButton, ButtonBase, CardHeader, List, Divider, Collapse } from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import ExpandMore from "@mui/icons-material/ExpandMore"

// Helper imports
import { NavProps } from "./Nav"

const drawerWidth = 240 // px
const iconSize = 32 // px

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

    const navItemsStyle: CSSProperties = {
        width: iconSize,
        height: iconSize,
        padding: "2px"
    }

    const linkItemsStyle: CSSProperties = {
        width: iconSize,
        height: iconSize,
        borderRadius: "5px"
    }

    const listItemStyle: SxProps = {
        px: `${(iconSize * 2) / 8}px`,
    }

    const listIconStyle: SxProps = {
        minWidth: iconSize,
        width: iconSize,
        height: iconSize,
        padding: "4px",
        transform: dropdownOpen ? "rotateZ(-90deg)" : "rotateZ(0deg)",
        transition: "transform 0.25s"
    }

    const listItemButtonStyle: SxProps = {
        borderRadius: "5px",
        justifyContent: "left",
        px: `${(iconSize * 2) / 8}px`,
        width: "100%",
        height: `${iconSize * 1.5}px`,
        "&:hover": {
            backgroundColor: theme.table.body.hover
        }
    }

    const listItemTextStyle: SxProps = {
        display: drawerOpen ? "block" : "none",
        ml: "20px"
    }

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar disableGutters>
                    <Box sx={{ width: "64px", px: "14px" }}>
                        <IconButton
                            onClick={toggleDrawerState}
                            disableRipple
                            disableTouchRipple
                            sx={[{ ...listItemButtonStyle }, { px: "2px", width: "36px", height: "36px" }]}
                        >
                            <MenuOpenIcon sx={[{ ...listIconStyle }, { transform: drawerOpen ? "rotateY(0deg)" : "rotateY(180deg)", transition: "transform 0.25s" }]} />
                        </IconButton>
                    </Box>
                    <ButtonBase disableRipple href={onHomePage ? "https://irminsul.gg/" : "/"}>
                        <CardHeader
                            avatar={<Image src="https://assets.irminsul.gg/main/icons/Irminsul.png" alt="IRMINSUL.GG" style={{ width: "48px", height: "48px" }} />}
                            title={<TextStyled variant="sitename">IRMINSUL.GG</TextStyled>}
                            sx={{ px: 0 }}
                        />
                    </ButtonBase>
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
                        pt: 2.5
                    }
                }}
            >
                {/* Empty toolbar necessary for content to be below app bar */}
                <Toolbar />
                <List>
                    {
                        navItems.map((item, index) =>
                            <Box key={index} sx={listItemStyle}>
                                <ButtonBase
                                    href={item.link}
                                    disableRipple
                                    disableTouchRipple
                                    sx={listItemButtonStyle}
                                >
                                    <Image src={item.icon} alt={item.text} style={navItemsStyle} tooltip={!drawerOpen ? item.text : null} tooltipArrow="right" />
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
                    <Box sx={listItemStyle}>
                        <IconButton
                            onClick={toggleDropdownState}
                            disableRipple
                            disableTouchRipple
                            sx={listItemButtonStyle}
                        >
                            <StyledTooltip title={!drawerOpen ? "Other Games" : null} arrow placement="right">
                                <ExpandMore sx={listIconStyle} />
                            </StyledTooltip>
                            <TextStyled sx={[{ ...listItemTextStyle }, { ml: "5px" }]}>
                                Other Games
                            </TextStyled>
                        </IconButton>
                    </Box>
                    <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
                        {
                            linkItems.map((item, index) =>
                                <Box key={index} sx={listItemStyle}>
                                    <ButtonBase
                                        href={item.link}
                                        disableRipple
                                        disableTouchRipple
                                        sx={listItemButtonStyle}
                                    >
                                        <Image src={item.icon} alt={item.text} style={linkItemsStyle} tooltip={!drawerOpen ? item.text : null} tooltipArrow="right" />
                                        <TextStyled sx={listItemTextStyle}>
                                            {item.text}
                                        </TextStyled>
                                    </ButtonBase>
                                </Box>
                            )
                        }
                    </Collapse>
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
    width: `${iconSize * 2}px`,
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