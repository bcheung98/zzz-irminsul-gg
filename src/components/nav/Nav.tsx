import React from "react";

// Component imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

// MUI imports
import { useTheme, useMediaQuery, Theme, SxProps } from "@mui/material";

function Nav() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const onHomePage = window.location.pathname === "/";

    return (
        <React.Fragment>
            {matches_up_md ? (
                <NavDesktop
                    onHomePage={onHomePage}
                    navItems={navItems}
                    linkItems={linkItems}
                />
            ) : (
                <NavMobile
                    onHomePage={onHomePage}
                    navItems={navItems}
                    linkItems={linkItems}
                />
            )}
        </React.Fragment>
    );
}

export default Nav;

export interface NavProps {
    onHomePage: boolean;
    navItems: NavItem[];
    linkItems: NavItem[];
}

export interface NavItem {
    icon: string;
    text: string;
    link: string;
}

const navItems: NavItem[] = [
    {
        icon: "icons/Home",
        text: "Home",
        link: "/",
    },
    {
        icon: "icons/Agents",
        text: "Agents",
        link: "/agents/",
    },
    {
        icon: "icons/W-Engine",
        text: "W-Engines",
        link: "",
    },
    {
        icon: "icons/Drive_Disc",
        text: "Drive Discs",
        link: "",
    },
    {
        icon: "icons/Bangboo",
        text: "Bangboos",
        link: "",
    },
    {
        icon: "icons/Signal_Search",
        text: "Banner Archive",
        link: "",
    },
];

const linkItems: NavItem[] = [
    {
        icon: "https://assets.irminsul.gg/main/game-icons/Genshin.png",
        text: "Genshin Impact",
        link: "https://genshin.irminsul.gg/",
    },
    {
        icon: "https://assets.irminsul.gg/main/game-icons/HSR.png",
        text: "Honkai: Star Rail",
        link: "https://hsr.irminsul.gg/",
    },
    {
        icon: "https://assets.irminsul.gg/main/game-icons/WutheringWaves.png",
        text: "Wuthering Waves",
        link: "https://wuwa.irminsul.gg/",
    },
];

export const navStyles = (paramTheme: Theme) => ({
    navItem: (size = 32): React.CSSProperties => ({
        width: size,
        height: size,
        padding: "2px",
    }),
    linkItem: (size = 32): React.CSSProperties => ({
        width: size,
        height: size,
        borderRadius: "5px",
    }),
    listItem: (link: string, size = 32): SxProps => ({
        display: link !== "" ? "block" : "none",
        px: `${(size * 2) / 8}px`,
    }),
    listIcon: (open: boolean, size = 32): SxProps => ({
        minWidth: size,
        width: size,
        height: size,
        p: "4px",
        transform: open ? "rotateZ(-180deg)" : "rotateZ(0deg)",
        transition: "transform 0.25s",
    }),
    listItemButton: (theme = paramTheme, size = 32): SxProps => ({
        borderRadius: "5px",
        justifyContent: "left",
        px: `${(size * 2) / 8}px`,
        width: "100%",
        height: `${size * 1.5}px`,
        "&:hover": {
            backgroundColor: theme.table.body.hover,
        },
    }),
    listItemText: (open = true): SxProps => ({
        display: open ? "block" : "none",
        ml: "20px",
    }),
});
