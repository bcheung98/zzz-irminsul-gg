import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, IconButton, Collapse, Box } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface DropdownProps {
    children?: React.ReactNode;
    title?: string;
    titleColor?: string;
    iconColor?: string;
    contentPadding?: string | number;
    unmountOnExit?: boolean;
}

function Dropdown({
    children,
    title = "",
    titleColor,
    iconColor,
    contentPadding = "4px 24px",
    unmountOnExit = false,
}: DropdownProps) {
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <IconButton
                onClick={toggleDropdownState}
                disableRipple
                disableTouchRipple
                sx={{ pl: 0 }}
            >
                <ExpandMore
                    sx={{
                        mr: "4px",
                        color: iconColor || theme.border.color.primary,
                        transform: open ? "rotateZ(0deg)" : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                <TextStyled sx={{ color: titleColor || theme.text.primary }}>
                    {title}
                </TextStyled>
            </IconButton>
            <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
                <Box sx={{ p: { xs: "4px 0", md: contentPadding } }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
}

export default Dropdown;
