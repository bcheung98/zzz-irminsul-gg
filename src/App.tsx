import "App.css"

// Component imports
import Nav from "components/nav/Nav"
import NavBottom from "components/nav/NavBottom"

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material"

// Helper imports
import theme from "themes/theme"

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box id="back-to-top-anchor" />
            <Box sx={{ display: "flex" }}>
                <Nav />
                <Box sx={{ minWidth: "50vw", width: "100vw" }}>
                    <Box sx={{ px: "20px", pt: "100px", pb: "50px", minHeight: "100vh" }}>
                    </Box>
                    <NavBottom />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App