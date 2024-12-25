import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { startAppListening } from "helpers/hooks";
import { RootState } from "rtk/store";
import { ThemeNames } from "types/theme";
import { Region } from "helpers/dates";

export type Width = "standard" | "wide";
export type SkillDisplay = "slider" | "table";

export interface SettingsState {
    theme: ThemeNames;
    width: Width;
    skillDisplay: SkillDisplay;
    server: Region;
}

const storedSettings = localStorage.getItem("settings") || "{}";
localStorage.removeItem("theme");
localStorage.removeItem("skillDisplay");
localStorage.removeItem("server");

const { theme, width, skillDisplay, server } = JSON.parse(storedSettings);

const initialState: SettingsState = {
    theme: theme || "Dark",
    width: width || "standard",
    skillDisplay: skillDisplay || "slider",
    server: server || "NA",
};

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<SettingsState>) => {
            Object.assign(state, action.payload);
        },
        setTheme: (state, action: PayloadAction<ThemeNames>) => {
            state.theme = action.payload;
        },
        setWidth: (state, action: PayloadAction<Width>) => {
            state.width = action.payload;
        },
        setSkillDisplay: (state, action: PayloadAction<SkillDisplay>) => {
            state.skillDisplay = action.payload;
        },
        setServer: (state, action: PayloadAction<Region>) => {
            state.server = action.payload;
        },
    },
});

export const { setSettings, setTheme, setWidth, setSkillDisplay, setServer } =
    settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState =>
    state.settings;
export const selectTheme = (state: RootState): ThemeNames =>
    state.settings.theme;
export const selectWidth = (state: RootState): Width => state.settings.width;
export const selectSkillDisplay = (state: RootState): SkillDisplay =>
    state.settings.skillDisplay;
export const selectServer = (state: RootState): Region => state.settings.server;

export default settingsSlice.reducer;

startAppListening({
    actionCreator: setSettings,
    effect: (action) => {
        localStorage.setItem("settings", JSON.stringify(action.payload));
        window.dispatchEvent(new Event("storage"));
    },
});

window.addEventListener("storage", (event) => {
    if (event.key === "settings") {
        window.location.reload();
    }
});
