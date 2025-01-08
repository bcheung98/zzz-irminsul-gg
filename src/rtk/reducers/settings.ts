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
    unreleasedContent: boolean;
}

const storedSettings = localStorage.getItem("settings") || "{}";

const { theme, width, skillDisplay, server, unreleasedContent } =
    JSON.parse(storedSettings);

const initialState: SettingsState = {
    theme: theme || "Dark",
    width: width || "standard",
    skillDisplay: skillDisplay || "slider",
    server: server || "NA",
    unreleasedContent: unreleasedContent || false,
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
        toggleUnreleasedContent: (state) => {
            state.unreleasedContent = !state.unreleasedContent;
        },
    },
});

export const {
    setSettings,
    setTheme,
    setWidth,
    setSkillDisplay,
    setServer,
    toggleUnreleasedContent,
} = settingsSlice.actions;

export const selectSettings = (state: RootState): SettingsState =>
    state.settings;
export const selectTheme = (state: RootState): ThemeNames =>
    state.settings.theme;
export const selectWidth = (state: RootState): Width => state.settings.width;
export const selectSkillDisplay = (state: RootState): SkillDisplay =>
    state.settings.skillDisplay;
export const selectServer = (state: RootState): Region => state.settings.server;
export const selectUnreleasedContent = (state: RootState): boolean =>
    state.settings.unreleasedContent;

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
