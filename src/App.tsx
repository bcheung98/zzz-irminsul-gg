import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "App.css";

// Component imports
import Nav from "components/nav/Nav";
import NavBottom from "components/nav/NavBottom";
import PageNotFound from "components/PageNotFound";
import Home from "components/home/Home";
import CharacterBrowser from "components/characters/browser/CharacterBrowser";
import CharacterPage from "components/characters/page/_CharacterPage";

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import { fetchCharacters } from "helpers/fetchData";
import { useAppDispatch } from "helpers/hooks";
import theme from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchCharacters());
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box id="back-to-top-anchor" />
                <Box sx={{ display: "flex" }}>
                    <Nav />
                    <Box sx={{ minWidth: "50vw", width: "100vw" }}>
                        <Box
                            sx={{
                                px: "20px",
                                pt: "20px",
                                pb: "50px",
                                mt: "80px",
                                minHeight: "100vh",
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/agents"
                                    element={<CharacterBrowser />}
                                />{" "}
                                <Route
                                    path="/agents/:name"
                                    element={<CharacterPage />}
                                />
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </Box>
                        <NavBottom />
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
