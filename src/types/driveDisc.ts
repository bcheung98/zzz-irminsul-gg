import { Rarity } from "./_common";
import { Version } from "./version";

export interface DriveDiscProps {
    disc: DriveDisc;
}

export interface DriveDisc {
    name: string;
    displayName: string;
    rarity: Rarity;
    setEffect: {
        twoPiece: string;
        fourPiece: string;
    };
    description: string;
    release: Version;
}
