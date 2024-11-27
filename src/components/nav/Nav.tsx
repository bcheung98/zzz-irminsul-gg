import React from "react";

// Component imports
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

function Nav() {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const onHomePage = window.location.pathname === "/";

    return (
        <React.Fragment>
            {matches_up_sm ? (
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
