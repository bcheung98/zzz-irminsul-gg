import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Region } from "helpers/dates";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { ThemeNames } from "types/theme";

interface ThemeSettings {
    name: ThemeNames;
}

export type SkillDisplay = "slider" | "table";
interface SkillDisplaySettings {
    mode: SkillDisplay;
}

interface ServerSettings {
    region: Region;
}

export interface SettingsState {
    theme: ThemeSettings;
    skillDisplay: SkillDisplaySettings;
    server: ServerSettings;
}

const storedThemeName = localStorage.getItem("theme") || "null";
const storedSkillDisplay = localStorage.getItem("skillDisplay") || "null";
const storedServer = localStorage.getItem("server") || "null";

const initialState: SettingsState = {
    theme: {
        name:
            storedThemeName !== "null"
                ? (storedThemeName as ThemeNames)
                : "Dark",
    },
    skillDisplay: {
        mode:
            storedSkillDisplay !== "null"
                ? (storedSkillDisplay as SkillDisplay)
                : "slider",
    },
    server: {
        region: storedServer !== "null" ? (storedServer as Region) : "NA",
    },
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeNames>) => {
            state.theme.name = action.payload;
        },
        setSkillDisplay: (state, action: PayloadAction<SkillDisplay>) => {
            state.skillDisplay.mode = action.payload;
        },
        setServer: (state, action: PayloadAction<Region>) => {
            state.server.region = action.payload;
        },
    },
});

export const { setTheme, setSkillDisplay, setServer } = settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState =>
    state.settings;
export const selectTheme = (state: RootState): ThemeSettings =>
    state.settings.theme;
export const selectSkillDisplay = (state: RootState): SkillDisplaySettings =>
    state.settings.skillDisplay;
export const selectServer = (state: RootState): ServerSettings =>
    state.settings.server;

export default settingsSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: setTheme,
    effect: (action) => {
        if (action.payload !== storedThemeName) {
            localStorage.setItem("theme", action.payload || "Dark");
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: setSkillDisplay,
    effect: (action) => {
        if (action.payload !== storedSkillDisplay) {
            localStorage.setItem("skillDisplay", action.payload || "slider");
        }
    },
});

listenerMiddleware.startListening({
    actionCreator: setServer,
    effect: (action) => {
        if (action.payload !== storedServer) {
            localStorage.setItem("server", action.payload || "NA");
        }
    },
});
