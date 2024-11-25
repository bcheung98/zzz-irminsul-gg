import { createSlice } from "@reduxjs/toolkit"
import { fetchCharacters, LoadingStatus } from "helpers/fetch"
import { RootState } from "store"
import { Character } from "types/character"

export interface CharacterState {
    status: LoadingStatus,
    characters: Character[]
}

const initialState: CharacterState = {
    status: "idle",
    characters: []
}

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "pending"
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.status = "success"
            state.characters = action.payload.sort((a, b) => a.name.localeCompare(b.name))
            state.status = "idle"
        })
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error"
        })
    }
})

export const selectCharacters = (state: RootState) => state.characters.characters
export default characterSlice.reducer