import React from "react";
import { BrowserRouter } from "react-router";
import "App.css";

// Component imports
import Nav from "components/nav/Nav";
import NavBottom from "components/nav/NavBottom";
import RouteConfig from "components/nav/RouteConfig";
import Layout from "components/Layout";

// MUI imports
import { Box, CssBaseline, ThemeProvider } from "@mui/material";

// Helper imports
import {
    fetchCharacters,
    fetchWeapons,
    fetchBangboos,
    fetchDriveDiscs,
    fetchCharacterBanners,
    fetchWeaponBanners,
} from "rtk/fetchData";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectTheme, setTheme } from "reducers/settings";
import { getTheme } from "themes/theme";

function App() {
    const dispatch = useAppDispatch();

    const theme = useAppSelector(selectTheme).name;

    React.useEffect(() => {
        dispatch(setTheme(theme));
        dispatch(fetchCharacters());
        dispatch(fetchWeapons());
        dispatch(fetchBangboos());
        dispatch(fetchDriveDiscs());
        dispatch(fetchCharacterBanners());
        dispatch(fetchWeaponBanners());
    });

    return (
        <BrowserRouter>
            <ThemeProvider theme={getTheme(theme)}>
                <CssBaseline />
                <Box id="back-to-top-anchor" />
                <Box sx={{ display: "flex" }}>
                    <Nav />
                    <Box sx={{ minWidth: "50vw", width: "100vw" }}>
                        <Layout>
                            <RouteConfig />
                        </Layout>
                        <NavBottom />
                    </Box>
                </Box>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
