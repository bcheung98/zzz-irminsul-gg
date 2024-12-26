// Component imports
import InfoCard from "custom/InfoCard";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { getContrastRatio, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import store from "rtk/store";
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";

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

    const region = useAppSelector(selectServer);

    const { version, subVersion } = row;
    const fiveStars = createBannerItems(JSON.parse(row.fiveStars), type);
    const fourStars = createBannerItems(JSON.parse(row.fourStars), type);
    const start = createDateObject({ date: row.start, region: region });
    const end = createDateObject({ date: row.end, region: region });

    const backgroundColor = isCurrentBanner(start.obj, end.obj)
        ? theme.palette.info.dark
        : theme.palette.background.paper;

    return (
        <StyledTableRow sx={{ backgroundColor: backgroundColor }}>
            <StyledTableCell>
                <TextStyled
                    sx={{
                        mb: "8px",
                        color:
                            getContrastRatio(
                                backgroundColor,
                                theme.text.primary
                            ) > 4.5
                                ? theme.text.primary
                                : theme.text.contrast,
                    }}
                >
                    {`${version} Phase ${subVersion.split(".")[2]}: ${
                        start.date
                    } — ${end.date}`}
                </TextStyled>
                <Grid container spacing={1}>
                    {fiveStars.map((item, index: number) => (
                        <InfoCard
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
                        <InfoCard
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
    const characters = store.getState().characters.characters;
    const weapons = store.getState().weapons.weapons;
    return items.map((item: string) => {
        if (isTBA(item)) {
            return {
                name: "",
                displayName: "",
            };
        } else {
            if (type === "character") {
                const character = characters.find((char) => char.name === item);
                return {
                    name: character?.name || "TBA",
                    displayName: character?.fullName || "TBA",
                };
            } else {
                const weapon = weapons.find((wep) => wep.name === item);
                return {
                    name: weapon?.name || "TBA",
                    displayName: weapon?.displayName || "TBA",
                };
            }
        }
    });
}
