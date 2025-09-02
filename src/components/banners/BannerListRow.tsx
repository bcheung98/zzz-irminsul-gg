// Component imports
import InfoCard from "custom/InfoCard";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, getContrastRatio, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";

// Type imports
import { BannerData, BannerType } from "types/banner";

function BannerListRow({
    loading,
    type,
    row,
}: {
    loading: boolean;
    type: BannerType;
    row: BannerData;
}) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const { version, subVersion } = row;

    const start = createDateObject({ date: row.start, region: region });
    const end = createDateObject({ date: row.end, region: region });

    const backgroundColor = isCurrentBanner(start.obj, end.obj)
        ? theme.palette.info.dark
        : theme.palette.background.paper;

    return (
        <Box sx={{ backgroundColor: backgroundColor, p: "8px 16px" }}>
            <TextStyled
                sx={{
                    mb: "8px",
                    color:
                        getContrastRatio(backgroundColor, theme.text.primary) >
                        4.5
                            ? theme.text.primary
                            : theme.text.contrast,
                }}
            >
                {`${version} Phase ${subVersion.split(".")[2]}: ${
                    start.date
                } — ${end.date}`}
            </TextStyled>
            <Grid container spacing={1}>
                {row.fiveStars.map((item, index: number) => (
                    <InfoCard
                        key={index}
                        id={`${item.displayName}-${subVersion}-${index}`}
                        variant="icon"
                        type={type}
                        name={item.name}
                        displayName={item.displayName}
                        rarity={!isTBA(item.name) ? "S" : "B"}
                        disableLink={isTBA(item.name)}
                        disableZoomOnHover={isTBA(item.name)}
                        loading={loading}
                    />
                ))}
                {row.fourStars.map((item, index: number) => (
                    <InfoCard
                        key={index}
                        id={`${item.displayName}-${subVersion}-${index}`}
                        variant="icon"
                        type={type}
                        name={item.name}
                        displayName={item.displayName}
                        rarity={!isTBA(item.name) ? "A" : "B"}
                        disableLink={isTBA(item.name)}
                        disableZoomOnHover={isTBA(item.name)}
                        loading={loading}
                    />
                ))}
            </Grid>
        </Box>
    );
}

export default BannerListRow;
