import { darkThemeData } from "themes/darkTheme";
import { lightThemeData } from "themes/lightTheme";
import { themeNames } from "themes/theme";

export type ThemeNames = (typeof themeNames)[number];

type DarkTheme = typeof darkThemeData;
type LightTheme = typeof lightThemeData;
type ThemeData = DarkTheme & LightTheme;

export type CustomTheme = {
    [Key in keyof ThemeData]: ThemeData[Key];
};

declare module "@mui/material/styles" {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends Partial<CustomTheme> {}
    interface Palette {
        default: Palette["primary"];
        tertiary: Palette["primary"];
    }
    interface PaletteOptions {
        default?: PaletteOptions["primary"];
        tertiary?: PaletteOptions["primary"];
    }
    interface TypographyVariants extends TypographyVariantsType {}
    interface TypographyVariantsOptions extends TypographyVariantsOptionsType {}
}

type TypographyOverrides = {
    sitename: true;
    "h4-styled": true;
    "h5-styled": true;
    "h6-styled": true;
    "body1-styled": true;
    "body2-styled": true;
};

type TypographyVariantsType = {
    [Property in keyof TypographyOverrides]: React.CSSProperties;
};

type TypographyVariantsOptionsType = {
    [Property in keyof TypographyOverrides]?: React.CSSProperties;
};

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides extends TypographyOverrides {}
}

declare module "@mui/material/Chip" {
    interface ChipPropsColorOverrides {
        tertiary: true;
    }
}

export type Shade = "main" | "light" | "dark";
export type ColorVariants =
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "warning"
    | "info"
    | "success";
