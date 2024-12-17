import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "App.css";

// Component imports
import Nav from "components/nav/Nav";
import NavBottom from "components/nav/NavBottom";
import PageNotFound from "components/PageNotFound";
import Home from "components/home/Home";
import CharacterBrowser from "components/characters/browser/_CharacterBrowser";
import CharacterPage from "components/characters/page/_CharacterPage";
import WeaponBrowser from "components/weapons/browser/_WeaponBrowser";
import WeaponPage from "components/weapons/page/_WeaponPage";
import Planner from "components/planner/_Planner";
import BannerArchive from "components/banners/_BannerArchive";

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import {
    fetchCharacters,
    fetchWeapons,
    fetchCharacterBanners,
    fetchWeaponBanners,
} from "rtk/fetchData";
import { useAppDispatch } from "helpers/hooks";
import theme from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchCharacters());
        dispatch(fetchWeapons());
        dispatch(fetchCharacterBanners());
        dispatch(fetchWeaponBanners());
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
                                />
                                <Route
                                    path="/agents/:name"
                                    element={<CharacterPage />}
                                />
                                <Route
                                    path="/w-engines"
                                    element={<WeaponBrowser />}
                                />
                                <Route
                                    path="/w-engines/:name"
                                    element={<WeaponPage />}
                                />
                                <Route path="/planner" element={<Planner />} />
                                <Route
                                    path="/banners"
                                    element={<BannerArchive />}
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
