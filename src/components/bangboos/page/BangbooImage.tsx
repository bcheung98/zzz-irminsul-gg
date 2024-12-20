// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooImage({ bangboo }: BangbooProps) {
    const theme = useTheme();

    return (
        <Image
            src={`bangboos/${bangboo.name}`}
            alt={bangboo.name}
            style={{
                width: "100%",
                maxWidth: "256px",
                height: "auto",
                padding: "8px",
                border: `2px solid ${getRarityColor(bangboo.rarity)}`,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(8),
                boxShadow: `inset 0 0 10px 5px ${getBackgroundColor(
                    bangboo.rarity
                )}`,
            }}
        />
    );
}

export default BangbooImage;
