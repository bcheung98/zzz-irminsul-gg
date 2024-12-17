// Component imports
import DisplayCard from "custom/DisplayCard";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";

// Type imports
import { BannerRow } from "./BannerList";

function BannerListRow({
    type,
    row,
}: {
    type: "character" | "weapon";
    row: BannerRow;
}) {
    const theme = useTheme();

    const { version, subVersion } = row;
    const fiveStars = createBannerItems(JSON.parse(row.fiveStars), type);
    const fourStars = createBannerItems(JSON.parse(row.fourStars), type);
    const start = createDateObject(row.start);
    const end = createDateObject(row.end);

    return (
        <StyledTableRow
            sx={{
                backgroundColor: isCurrentBanner(start.obj, end.obj)
                    ? theme.menu.selected
                    : theme.menu.hover,
            }}
        >
            <StyledTableCell>
                <TextStyled sx={{ mb: "10px" }}>
                    {`${version} Phase ${subVersion.split(".")[2]}: ${
                        start.date
                    } — ${end.date}`}
                </TextStyled>
                <Grid container spacing={0.75}>
                    {fiveStars.map((item, index: number) => (
                        <DisplayCard
                            key={index}
                            id={`${item.displayName}-${subVersion}`.toLowerCase()}
                            variant="icon"
                            type={type}
                            name={item.name}
                            displayName={item.displayName}
                            rarity={!isTBA(item.name) ? "S" : "B"}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                        />
                    ))}
                    {fourStars.map((item, index: number) => (
                        <DisplayCard
                            key={index}
                            id={`${item.displayName}-${subVersion}`.toLowerCase()}
                            variant="icon"
                            type={type}
                            name={item.name}
                            displayName={item.displayName}
                            rarity={!isTBA(item.name) ? "A" : "B"}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                        />
                    ))}
                </Grid>
            </StyledTableCell>
        </StyledTableRow>
    );
}

export default BannerListRow;

interface BannerItem {
    name: string;
    displayName: string;
}

export function createBannerItems(
    items: string[],
    type: "character" | "weapon"
): BannerItem[] {
    return items.map((item: string) => {
        if (isTBA(item)) {
            return {
                name: "",
                displayName: "",
            };
        } else {
            if (type === "character") {
                const character = useAppSelector(selectCharacters).find(
                    (char) => char.name === item
                );
                return {
                    name: character?.name || "TBA",
                    displayName: character?.fullName || "TBA",
                };
            } else {
                const weapon = useAppSelector(selectWeapons).find(
                    (wep) => wep.name === item
                );
                return {
                    name: weapon?.name || "TBA",
                    displayName: weapon?.displayName || "TBA",
                };
            }
        }
    });
}
