import { darkThemeData } from "themes/darkTheme";

export type CustomTheme = {
    [Key in keyof typeof darkThemeData]: (typeof darkThemeData)[Key];
};

declare module "@mui/material/styles" {
    interface Theme extends CustomTheme {}
    interface ThemeOptions extends CustomTheme {}
    interface TypographyVariants {
        sitename: React.CSSProperties;
    }
    interface TypographyVariantsOptions {
        sitename?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        sitename: true;
    }
}
