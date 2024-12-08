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
}

function Dropdown({
    children,
    title = "",
    titleColor,
    iconColor,
    contentPadding = "5px 25px",
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
                        mr: "5px",
                        color: iconColor || theme.border.color,
                        transform: open ? "rotateZ(0deg)" : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                <TextStyled sx={{ color: titleColor || theme.text.main }}>
                    {title}
                </TextStyled>
            </IconButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ p: { xs: "5px 0", md: contentPadding } }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
}

export default Dropdown;
