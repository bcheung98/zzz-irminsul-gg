import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { ThemeNames } from "types/theme";

interface ThemeSettings {
    name: ThemeNames;
}

export interface SettingsState {
    theme: ThemeSettings;
}

const storedThemeName = localStorage.getItem("theme") || "null";

const initialState: SettingsState = {
    theme: {
        name:
            storedThemeName !== "null"
                ? (storedThemeName as ThemeNames)
                : "Dark",
    },
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<ThemeNames | null>) => {
            state.theme.name = action.payload || "Dark";
        },
    },
});

export const { setTheme } = settingsSlice.actions;

export const selectTheme = (state: RootState): ThemeSettings =>
    state.settings.theme;

export default settingsSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: setTheme,
    effect: (action) => {
        if (action.payload !== storedThemeName) {
            localStorage.setItem("theme", action.payload || "Dark");
        }
    },
});
