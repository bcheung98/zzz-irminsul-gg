import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Region } from "helpers/dates";
import { startAppListening } from "helpers/hooks";
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

const storedSettings = localStorage.getItem("settings") || "null";
localStorage.removeItem("theme");
localStorage.removeItem("skillDisplay");
localStorage.removeItem("server");

const initialState: SettingsState =
    storedSettings !== "null"
        ? JSON.parse(storedSettings)
        : {
              theme: {
                  name: "Dark",
              },
              skillDisplay: {
                  mode: "slider",
              },
              server: {
                  region: "NA",
              },
          };

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<SettingsState>) => {
            state = action.payload;
        },
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

export const { setSettings, setTheme, setSkillDisplay, setServer } =
    settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState =>
    state.settings;
export const selectTheme = (state: RootState): ThemeSettings =>
    state.settings.theme;
export const selectSkillDisplay = (state: RootState): SkillDisplaySettings =>
    state.settings.skillDisplay;
export const selectServer = (state: RootState): ServerSettings =>
    state.settings.server;

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
