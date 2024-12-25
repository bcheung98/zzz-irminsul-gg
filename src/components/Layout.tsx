import { Outlet } from "react-router";

// Component imports
import RightHandDrawer from "custom/RightHandDrawer";
import Nav from "./nav/Nav";
import NavBottom from "./nav/NavBottom";

// MUI imports
import { Box } from "@mui/material";

function Layout() {
    return (
        <>
            <Box id="back-to-top-anchor" />
            <Box sx={{ display: "flex" }}>
                <Nav />
                <Box sx={{ minWidth: "50vw", width: "100vw" }}>
                    <Box
                        sx={{
                            px: "24px",
                            pt: "16px",
                            pb: "48px",
                            mt: "64px",
                            minHeight: "100vh",
                            width: "100%",
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
