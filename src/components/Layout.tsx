import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";

// Component imports
import RightHandDrawer from "custom/RightHandDrawer";
import Nav from "./nav/Nav";
import NavBottom from "./nav/NavBottom";

// MUI imports
import { useTheme, alpha, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWidth } from "reducers/settings";

function Layout() {
    const theme = useTheme();

    const width = useAppSelector(selectWidth);

    const location = useLocation().pathname;
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Box id="back-to-top-anchor" />
            <Box
                sx={{
                    display: "flex",
                    backgroundColor: theme.background(0),
                    backgroundImage: {
                        xs: `linear-gradient(to bottom, ${theme.backgroundImageColors[0]} 10%, ${theme.backgroundImageColors[1]} 50%, ${theme.backgroundImageColors[0]} 100%)`,
                        sm: `linear-gradient(to bottom, ${theme.backgroundImageColors[0]} 10%, ${theme.backgroundImageColors[1]} 50%, ${theme.backgroundImageColors[0]} 100%), url(${theme.backgroundImageURL})`,
                    },
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 25%",
                    backgroundAttachment: "fixed",
                }}
            >
                <Nav />
                <Box
                    sx={{
                        minWidth: "0vw",
                        width: "100vw",
                        backgroundColor: alpha(
                            theme.background(0),
                            theme.backgroundImageAlpha
                        ),
                    }}
                >
                    <Box
                        sx={{
                            px: "24px",
                            pt: "16px",
                            pb: "48px",
                            mt: "64px",
                            minHeight: "100vh",
                            width: {
                                xs: "100%",
                                lg: width === "standard" ? "75%" : "100%",
                            },
                            mx: "auto",
                        }}
                    >
                        <Outlet />
                    </Box>
                    <NavBottom />
                </Box>
                <RightHandDrawer />
            </Box>
        </>
    );
}

export default Layout;
