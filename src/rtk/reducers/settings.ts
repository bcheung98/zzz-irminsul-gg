import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export interface SettingsState {
    theme: ThemeSettings;
    skillDisplay: SkillDisplaySettings;
}

const storedThemeName = localStorage.getItem("theme") || "null";
const storedSkillDisplay = localStorage.getItem("skillDisplay") || "null";

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
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeNames | null>) => {
            state.theme.name = action.payload || "Dark";
        },
        setSkillDisplay: (
            state,
            action: PayloadAction<SkillDisplay | null>
        ) => {
            state.skillDisplay.mode = action.payload || "slider";
        },
    },
});

export const { setTheme, setSkillDisplay } = settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState =>
    state.settings;

export const selectTheme = (state: RootState): ThemeSettings =>
    state.settings.theme;

export const selectSkillDisplay = (state: RootState): SkillDisplaySettings =>
    state.settings.skillDisplay;

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
