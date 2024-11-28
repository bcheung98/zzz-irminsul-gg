// MUI imports
import {
    useTheme,
    Card,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";

// Helper imports
import { createDateObject } from "helpers/dates";
import { TextStyled } from "styled/StyledTypography";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMisc({ character }: CharacterProps) {
    const theme = useTheme();

    const { birthday, faction, voiceActors, release } = { ...character };
    const releaseDate =
        release.date !== "" ? createDateObject(release.date).date : "";
    const releaseVersion = release.version;

    const rows = [
        { key: "Faction", value: faction },
        { key: "Birthday", value: birthday || "---" },
        { key: "Release", value: `${releaseDate} (${releaseVersion})` },
        { key: "Voice Actor (EN)", value: voiceActors["en"] || "---" },
        { key: "Voice Actor (JP)", value: voiceActors["jp"] || "---" },
    ];

    return (
        <TableContainer
            component={Card}
            sx={{
                width: "100%",
                py: "10px",
                backgroundColor: theme.background(8),
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        >
            <Table size="small">
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.key}>
                            <TableCell
                                align="left"
                                sx={{ border: "none", py: "1.5px" }}
                            >
                                <TextStyled variant="body2">
                                    {row.key}
                                </TextStyled>
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={{ border: "none", py: "1.5px" }}
                            >
                                <TextStyled variant="body2">
                                    {row.value}
                                </TextStyled>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CharacterInfoMisc;
