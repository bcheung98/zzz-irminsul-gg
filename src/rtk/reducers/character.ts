import { createSlice } from "@reduxjs/toolkit";
import { fetchCharacters, LoadingStatus } from "rtk/fetchData";
import { listenerMiddleware } from "rtk/middleware";
import { RootState } from "rtk/store";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
}

const storedCharacters = localStorage.getItem("data/characters") || "null";
localStorage.removeItem("characters");

const initialState: CharacterState = {
    status: "idle",
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
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
            if (JSON.stringify(action.payload) !== storedCharacters) {
                state.characters = action.payload;
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

export default characterSlice.reducer;

listenerMiddleware.startListening({
    actionCreator: fetchCharacters.fulfilled,
    effect: (action) => {
        const data = JSON.stringify(action.payload);
        if (data !== storedCharacters) {
            localStorage.setItem("data/characters", data);
        }
    },
});
