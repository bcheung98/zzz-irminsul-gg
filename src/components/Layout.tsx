import { Outlet } from "react-router";

// Component imports
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
                            px: "20px",
                            pb: "50px",
                            mt: "80px",
                            minHeight: "100vh",
                            width: "100%",
                            mx: "auto",
                        }}
                    >
                        <Outlet />
                    </Box>
                    <NavBottom />
                </Box>
            </Box>
        </>
    );
}

export default Layout;
