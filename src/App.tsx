import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import "App.css"

// Component imports
import Nav from "components/nav/Nav"
import NavBottom from "components/nav/NavBottom"
import Home from "components/home/Home"

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material"

// Helper imports
import { fetchCharacters } from "rtk/fetch"
import { useAppDispatch } from "helpers/hooks"
import theme from "themes/theme"


function App() {

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchCharacters())
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box id="back-to-top-anchor" />
                <Box sx={{ display: "flex" }}>
                    <Nav />
                    <Box sx={{ minWidth: "50vw", width: "100vw" }}>
                        <Box sx={{ px: "20px", pt: "100px", pb: "50px", minHeight: "100vh" }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </Box>
                        <NavBottom />
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    )
}

export default App