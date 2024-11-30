import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    SxProps,
    ToggleButton,
    ToggleButtonProps,
    ToggleButtonGroupProps,
    ToggleButtonGroup,
    toggleButtonGroupClasses,
} from "@mui/material";

// Interface for individual button
export interface CustomToggleButtonProps extends ToggleButtonProps {
    variant: "icon" | "text";
    label: React.ReactNode;
}

// Interface for button group
export interface ToggleButtonsProps extends ToggleButtonGroupProps {
    buttons: CustomToggleButtonProps[];
    spacing?: number;
    highlightOnHover?: boolean;
}

function ToggleButtons(props: ToggleButtonsProps) {
    const theme = useTheme();

    const { buttons, spacing, highlightOnHover = false } = props;

    const toggleButtonGroupStyle: SxProps = {
        [`& .${toggleButtonGroupClasses.grouped}`]: {
            mx: spacing ? `${spacing}px` : "none",
            border: `1px solid ${theme.border.color}`,
            borderRadius: spacing ? "5px" : "none",
        },
    };

    const toggleButtonStyle: SxProps = [
        {
            "&.MuiToggleButton-root": {
                backgroundColor: theme.menu.default,
                opacity: 0.5,
                "&:hover": {
                    backgroundColor: theme.menu.hover,
                },
                "&.Mui-selected": {
                    backgroundColor: theme.menu.selected,
                    opacity: 1,
                    "&:hover": {
                        backgroundColor: theme.menu.selectedHover,
                    },
                },
            },
        },
        highlightOnHover && {
            "&.MuiToggleButton-root": {
                "&:hover": {
                    border: `1px solid rgb(233, 194, 39)`,
                    boxShadow: `0 0 5px 1px rgb(233, 194, 39)`,
                },
            },
        },
    ];

    return (
        <ToggleButtonGroup {...props} sx={toggleButtonGroupStyle}>
            {buttons.map((button, index) => (
                <ToggleButton
                    key={index}
                    value={button.value}
                    size={button.size}
                    disableRipple
                    sx={toggleButtonStyle}
                >
                    {button.variant === "icon" ? (
                        button.label
                    ) : (
                        <TextStyled
                            variant="body2"
                            sx={{ textTransform: "none" }}
                        >
                            {button.label}
                        </TextStyled>
                    )}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    );
}

export default ToggleButtons;
