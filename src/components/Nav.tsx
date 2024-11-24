import { Fragment } from "react"

// Component imports
import Image from "custom/Image"
import NavDesktop from "./NavDesktop"

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material"

const iconSize = 32

function Nav() {

    const theme = useTheme()
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"))

    const onHomePage = window.location.pathname === "/"

    return (
        <Fragment>
            {
                matches_up_sm ?
                    <NavDesktop onHomePage={onHomePage} iconSize={iconSize} navItems={navItems} linkItems={linkItems} />
                    :
                    // <NavMobile onHomePage={onHomePage} navItems={navItems} linkItems={linkItems} />
                    null
            }
        </Fragment>
    )

}

export default Nav

export interface NavProps {
    onHomePage: boolean,
    iconSize: number,
    navItems: NavItem[],
    linkItems: NavItem[]
}

export interface NavItem {
    icon: JSX.Element,
    text: string,
    link: string
}

const navItemsStyle = {
    width: iconSize,
    height: iconSize
}

const linkItemsStyle = {
    width: iconSize,
    height: iconSize,
    borderRadius: "5px"
}

const navItems: NavItem[] = [
    {
        icon: <Image src="icons/Home" alt="Home" style={navItemsStyle} />,
        text: "Home",
        link: "/"
    },
]

const linkItems: NavItem[] = [
    {
        icon: <Image src="https://assets.irminsul.gg/main/game-icons/Genshin.png" alt="genshin.irminsul.gg" style={linkItemsStyle} />,
        text: "Genshin Impact",
        link: "https://genshin.irminsul.gg/"
    },
    {
        icon: <Image src="https://assets.irminsul.gg/main/game-icons/HSR.png" alt="hsr.irminsul.gg" style={linkItemsStyle} />,
        text: "Honkai: Star Rail",
        link: "https://hsr.irminsul.gg/"
    },
    {
        icon: <Image src="https://assets.irminsul.gg/main/game-icons/WutheringWaves.png" alt="wuwa.irminsul.gg" style={linkItemsStyle} />,
        text: "Wuthering Waves",
        link: "https://wuwa.irminsul.gg/"
    }
]