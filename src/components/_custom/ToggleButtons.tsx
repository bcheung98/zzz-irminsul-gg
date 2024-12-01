import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    SxProps,
    ToggleButton as MuiToggleButton,
    ToggleButtonProps,
    ToggleButtonGroupProps,
    ToggleButtonGroup,
} from "@mui/material";

export interface CustomToggleButtonProps extends ToggleButtonProps {
    variant?: "icon" | "text";
    icon?: React.ReactNode;
    label?: React.ReactNode;
    highlightonhover?: boolean;
}

export function ToggleButton(props: CustomToggleButtonProps) {
    const theme = useTheme();

    const { value, size, icon, label, highlightonhover = true } = props;

    const toggleButtonStyle: SxProps = [
        {
            "&.MuiToggleButton-root": {
                p: label ? "10px" : "0px",
                backgroundColor: theme.menu.default,
                opacity: 0.5,
                "&:hover": {
                    backgroundColor: theme.menu.hover,
                },
            },
        },
        highlightonhover && {
            "&.MuiToggleButton-root": {
                "&:hover": {
                    borderColor: theme.border.highlight,
                    boxShadow: `0 0 4px 1px ${theme.border.highlight}`,
                },
            },
        },
    ];

    return (
        <MuiToggleButton
            value={value}
            size={size}
            disableRipple
            sx={toggleButtonStyle}
        >
            {icon}
            <TextStyled variant="body2" sx={{ textTransform: "none" }}>
                {label}
            </TextStyled>
        </MuiToggleButton>
    );
}

export interface ToggleButtonsProps extends ToggleButtonGroupProps {
    buttons: CustomToggleButtonProps[];
    spacing?: number;
    highlightonhover?: boolean;
}

function ToggleButtons(props: ToggleButtonsProps) {
    const theme = useTheme();

    const { buttons, spacing = false, highlightonhover = true } = props;

    const toggleButtonGroupStyle: SxProps = {
        flexWrap: "wrap",
        "& .MuiToggleButtonGroup-grouped": {
            m: spacing ? `${spacing}px !important` : "0px",
            border: spacing
                ? `1px solid ${theme.border.color} !important`
                : `1px solid ${theme.border.color}`,
            borderRadius: spacing ? "5px" : "none",
            "&.Mui-selected": {
                backgroundColor: theme.menu.selected,
                opacity: 1,
                "&:hover": {
                    backgroundColor: theme.menu.selectedHover,
                },
            },
        },
    };

    return (
        <ToggleButtonGroup {...props} sx={toggleButtonGroupStyle}>
            {buttons.map((button, index) => (
                <ToggleButton
                    key={index}
                    {...button}
                    highlightonhover={highlightonhover}
                />
            ))}
        </ToggleButtonGroup>
    );
}

export default ToggleButtons;
