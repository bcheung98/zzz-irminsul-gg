import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useScrollTrigger, Fab, Fade, Box } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

interface ActionFabProps {
    action?: (args: any) => void;
    hysteresis?: boolean;
    threshold?: number;
    icon?: React.ReactNode;
    label?: React.ReactNode;
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
                <Fab
                    size="small"
                    disableRipple
                    sx={{
                        width: "100%",
                        p: 1,
                        borderRadius: "5px",
                        backgroundColor: theme.menu.selectedHover,
                        color: theme.text.main,
                        "&:hover": {
                            backgroundColor: theme.menu.hover,
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
            </Box>
        </Fade>
    );
}

export default ActionFab;
