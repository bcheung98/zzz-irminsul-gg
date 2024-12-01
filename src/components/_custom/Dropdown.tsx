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
}

function Dropdown({ children, title = "", titleColor }: DropdownProps) {
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
                        color: theme.border.color,
                        transform: open ? "rotateZ(0deg)" : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                <TextStyled sx={{ color: titleColor || theme.text.main }}>
                    {title}
                </TextStyled>
            </IconButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ px: { xs: 0, md: "25px" }, py: "5px" }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
}

export default Dropdown;
