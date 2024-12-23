// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <Image
            src={`characters/portraits/${character.name}`}
            alt={character.name}
            style={{
                width: "100%",
                height: "600px",
                padding: "8px 0",
                objectFit: "cover",
                overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
            }}
        />
    );
}

export default CharacterImage;
