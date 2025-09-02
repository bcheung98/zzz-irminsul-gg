import { Rarity } from "./_common";

export interface Banner {
    version: string;
    subVersion: string;
    start: string;
    end: string;
    fiveStars: string[];
    fourStars: string[];
}

export type BannerType = "character" | "weapon";

export interface BannerOption {
    id: number;
    name: string;
    displayName: string;
    rarity: Rarity;
    element?: string;
    specialty: string;
}

export interface BannerData extends Omit<Banner, "fiveStars" | "fourStars"> {
    fiveStars: BannerOption[];
    fourStars: BannerOption[];
}
