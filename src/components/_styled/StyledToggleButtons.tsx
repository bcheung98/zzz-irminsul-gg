import {
    CustomToggleButtonProps,
    ToggleButtonsProps,
} from "custom/ToggleButtons";

// MUI imports
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

// Helper imports
import { getHoverColor } from "helpers/utils";

export const StyledToggleButton = styled(
    (props: CustomToggleButtonProps) => (
        <ToggleButton disableRipple {...props} />
    ),
    {
        shouldForwardProp: (prop) =>
            !["highlightOnHover", "backgroundColor"].includes(prop.toString()),
    }
)(({ theme, highlightOnHover, backgroundColor }) => ({
    "&.MuiToggleButton-root": {
        opacity: 0.4,
        color: theme.text.primary,
        "&:hover": {
            backgroundColor: backgroundColor
                ? getHoverColor(backgroundColor, -10)
                : theme.menu.hover,
            borderColor: highlightOnHover
                ? theme.border.color.highlight
                : theme.border.color.primary,
            boxShadow: highlightOnHover
                ? `0 0 4px 1px ${theme.border.color.highlight}`
                : "none",
        },
    },
}));

export const StyledToggleButtonGroup = styled(
    (props: ToggleButtonsProps) => <ToggleButtonGroup {...props} />,
    {
        shouldForwardProp: (prop) =>
            !["highlightOnHover", "backgroundColor"].includes(prop.toString()),
    }
)(({ theme, spacing, padding = 4, backgroundColor }) => ({
    flexWrap: "wrap",
    "& .MuiToggleButtonGroup-grouped": {
        padding: getPadding(padding),
        margin: spacing ? `${spacing}px !important` : "0px",
        border: spacing
            ? `1px solid ${theme.border.color.primary} !important`
            : `1px solid ${theme.border.color.primary}`,
        borderRadius: spacing ? "4px" : "none",
        backgroundColor: backgroundColor || theme.menu.primary,
        "&.Mui-selected": {
            backgroundColor: backgroundColor || theme.menu.selected,
            opacity: 1,
            "&:hover": {
                backgroundColor: backgroundColor
                    ? getHoverColor(backgroundColor, -10)
                    : theme.menu.selectedHover,
            },
        },
    },
}));

function getPadding(padding: string | number) {
    if (typeof padding === "number") {
        return `${padding}px`;
    } else {
        return padding;
    }
}
