import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Weapon } from "types/weapon";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/zzz/characters.json
const charactersURL = "https://api.irminsul.gg/zzz/characters.json";

// https://api.irminsul.gg/zzz/weapons.json
const weaponsURL = "https://api.irminsul.gg/zzz/weapons.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);

export const fetchWeapons = createAsyncThunk(
    "GET/weapons",
    async (): Promise<Weapon[]> => {
        const response = await fetch(weaponsURL);
        return await response.json();
    }
);