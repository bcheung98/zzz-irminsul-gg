import { createAsyncThunk } from "@reduxjs/toolkit"
import { Character } from "types/character"

export type LoadingStatus = "idle" | "pending" | "success" | "error"

// https://api.irminsul.gg/zzz/characters.json
const charactersURL = "https://api.irminsul.gg/zzz/characters.json"

export const fetchCharacters = createAsyncThunk("GET/characters", async (): Promise<Character[]> => {
    const response = await fetch(charactersURL)
    return await response.json()
})