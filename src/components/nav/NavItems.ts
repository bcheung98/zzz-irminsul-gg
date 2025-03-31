export interface NavItem {
    icon: string;
    text: string;
    link: string;
    tag?: string;
}

export const navItems: NavItem[] = [
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
        link: "/w-engines/",
    },
    {
        icon: "icons/Drive_Disc",
        text: "Drive Discs",
        link: "/drive-discs/",
    },
    {
        icon: "icons/Bangboo",
        text: "Bangboos",
        link: "/bangboos/",
    },
    {
        icon: "icons/Check",
        text: "Ascension Planner",
        link: "/planner/",
    },
    {
        icon: "icons/Signal_Search",
        text: "Banner Archive",
        link: "/banners/",
    },
];

export const otherItems: NavItem[] = [
    {
        text: "Calendar",
        link: "https://irminsul.gg/calendar",
        icon: "",
    },
    {
        text: "Blog",
        link: "https://irminsul.gg/blog",
        icon: "",
    },
];
