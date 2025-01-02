// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme, Card } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();

    return (
        <Card sx={{ width: "100%", height: "600px" }}>
            <Image
                src={`characters/portraits/${character.name}`}
                alt={character.name}
                style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "cover",
                    overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                    border: theme.mainContentBox.border,
                    borderRadius: theme.mainContentBox.borderRadius,
                    backgroundColor: theme.background(2),
                }}
            />
        </Card>
    );
}

export default CharacterImage;
