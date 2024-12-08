// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponImage({ weapon }: WeaponProps) {
    const theme = useTheme();

    return (
        <Image
            src={`w-engines/${weapon.name}`}
            alt={weapon.name}
            style={{
                width: "100%",
                maxWidth: "256px",
                height: "auto",
                padding: "8px",
                border: `2px solid ${getRarityColor(weapon.rarity)}`,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(8),
                boxShadow: `inset 0 0 25px 15px ${getBackgroundColor(
                    weapon.rarity
                )}`,
            }}
        />
    );
}

export default WeaponImage;
