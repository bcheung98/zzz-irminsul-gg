import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { fetchCharacters, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
    names: string[];
}

const storedCharacters = localStorage.getItem("data/characters") || "null";
localStorage.removeItem("characters");

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: CharacterState = {
    status: "idle",
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
    names: [],
};

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            let payload = action.payload;
            state.names = action.payload.map((item) => item.name.split(" ").join("_").toLowerCase());
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedCharacters) {
                state.characters = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectCharacters = (state: RootState): Character[] =>
    state.characters.characters;

export const selectCharacterNames = (state: RootState): string[] =>
    state.characters.names;

export default characterSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchCharacters.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedCharacters) {
            localStorage.setItem("data/characters", data);
        }
    },
});
