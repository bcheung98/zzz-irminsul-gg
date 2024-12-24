// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { DriveDiscProps } from "types/driveDisc";

function DriveDiscImage({ disc }: DriveDiscProps) {
    const theme = useTheme();

    return (
        <Image
            src={`drive-discs/${disc.name}`}
            alt={disc.name}
            style={{
                width: "100%",
                maxWidth: "256px",
                height: "auto",
                padding: "8px",
                border: `2px solid ${getRarityColor(disc.rarity)}`,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
                boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                    disc.rarity
                )}`,
            }}
        />
    );
}

export default DriveDiscImage;
