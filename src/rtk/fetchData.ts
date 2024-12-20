import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Weapon } from "types/weapon";
import { Bangboo } from "types/bangboo";
import { DriveDisc } from "types/driveDisc";
import { Banner } from "types/banner";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/zzz/characters.json
const charactersURL = "https://api.irminsul.gg/zzz/characters.json";

// https://api.irminsul.gg/zzz/weapons.json
const weaponsURL = "https://api.irminsul.gg/zzz/weapons.json";

// https://api.irminsul.gg/zzz/bangboos.json
const bangboosURL = "https://api.irminsul.gg/zzz/bangboos.json";

const driveDiscsURL = "https://api.irminsul.gg/zzz/drive-discs.json";

const characterBannersURL =
    "https://api.irminsul.gg/zzz/character-banners.json";
const weaponBannersURL = "https://api.irminsul.gg/zzz/weapon-banners.json";

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

export const fetchBangboos = createAsyncThunk(
    "GET/bangboos",
    async (): Promise<Bangboo[]> => {
        const response = await fetch(bangboosURL);
        return await response.json();
    }
);

export const fetchDriveDiscs = createAsyncThunk(
    "GET/driveDiscs",
    async (): Promise<DriveDisc[]> => {
        const response = await fetch(driveDiscsURL);
        return await response.json();
    }
);

export const fetchCharacterBanners = createAsyncThunk(
    "GET/characterBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(characterBannersURL);
        return await response.json();
    }
);

export const fetchWeaponBanners = createAsyncThunk(
    "GET/weaponBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(weaponBannersURL);
        return await response.json();
    }
);
