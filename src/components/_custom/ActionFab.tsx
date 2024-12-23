import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useScrollTrigger, Fab, Fade, Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { StyledTooltip } from "styled/StyledTooltip";

interface ActionFabProps {
    action?: (args: any) => void;
    hysteresis?: boolean;
    threshold?: number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    tooltip?: string;
    color?: {
        primary?: string;
        hover?: string;
    };
    position?: {
        top?: string | number;
        right?: string | number;
        bottom?: string | number;
        left?: string | number;
    };
}

function ActionFab({
    action,
    hysteresis = false,
    threshold = 100,
    icon,
    label,
    tooltip = "",
    color,
    position = {
        top: 90,
        right: 20,
    },
}: ActionFabProps) {
    const theme = useTheme();

    const trigger = useScrollTrigger({
        disableHysteresis: !hysteresis,
        threshold: threshold,
    });

    return (
        <Fade in={trigger}>
            <Box onClick={action} sx={[{ position: "fixed" }, { ...position }]}>
                <StyledTooltip title={tooltip}>
                    <Fab
                        size="small"
                        disableRipple
                        sx={{
                            width: "100%",
                            p: 1,
                            borderRadius: "5px",
                            backgroundColor:
                                color?.primary || theme.button.primary,
                            color: "white",
                            "&:hover": {
                                backgroundColor:
                                    color?.hover || theme.button.hover,
                            },
                        }}
                    >
                        {icon || <KeyboardArrowLeftIcon />}
                        {label && (
                            <TextStyled variant="body2" sx={{ ml: "5px" }}>
                                {label}
                            </TextStyled>
                        )}
                    </Fab>
                </StyledTooltip>
            </Box>
        </Fade>
    );
}

export default ActionFab;
