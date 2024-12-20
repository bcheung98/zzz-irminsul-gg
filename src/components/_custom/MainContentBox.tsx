import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, AppBar, Toolbar, Box } from "@mui/material";

interface HeaderProps {
    padding?: string | number;
}

interface ContentProps {
    padding?: string | number;
}

interface MainContentBoxProps {
    component?: React.ElementType;
    children?: React.ReactNode;
    title?: string | React.ReactNode;
    actions?: React.ReactNode;
    headerProps?: HeaderProps;
    contentProps?: ContentProps;
}

function MainContentBox({
    component = "div",
    children,
    title,
    actions,
    headerProps = {
        padding: "10px 20px",
    },
    contentProps = {
        padding: "25px",
    },
}: MainContentBoxProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: theme.background(3),
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        >
            <AppBar position="static">
                <Toolbar
                    disableGutters
                    sx={{
                        p: headerProps.padding,
                        flexGrow: 1,
                        justifyContent: "space-between",
                    }}
                >
                    {typeof title === "string" ? (
                        <TextStyled variant="h6">{title && title}</TextStyled>
                    ) : (
                        <>{title}</>
                    )}
                    {actions && actions}
                </Toolbar>
            </AppBar>
            <Box sx={{ p: contentProps.padding }} component={component}>
                {children && children}
            </Box>
        </Card>
    );
}

export default MainContentBox;
