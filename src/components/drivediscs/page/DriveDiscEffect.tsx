// MUI imports
import { useTheme, Card } from "@mui/material";

// Type imports
import { DriveDiscProps } from "types/driveDisc";
import DriveDiscText from "./DriveDiscText";

function DriveDiscEffect({ disc }: DriveDiscProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 2,
                backgroundColor: theme.background(2),
            }}
        >
            <DriveDiscText disc={disc} />
        </Card>
    );
}

export default DriveDiscEffect;
