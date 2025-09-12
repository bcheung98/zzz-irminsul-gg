// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { DriveDisc } from "types/driveDisc";
import DriveDiscText from "../page/DriveDiscText";

function DriveDiscListRow({ disc, index }: { disc: DriveDisc; index: number }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { name, displayName } = disc;

    const href = `/drive-discs/${name.split(" ").join("_").toLowerCase()}`;

    return (
        <Grid
            container
            spacing={{ xs: 1, md: 4 }}
            key={displayName}
            sx={{
                p: "8px 16px",
                flexWrap: "wrap",
                alignItems: "center",
                backgroundColor:
                    index % 2 === 0
                        ? theme.background(1)
                        : theme.background(0, "dark"),
            }}
        >
            <Grid size={{ xs: 12, md: 3 }}>
                <Stack
                    spacing={{ xs: 1, md: 2 }}
                    direction="row"
                    alignItems="center"
                >
                    <RouterLink to={href}>
                        <Image
                            src={`drive-discs/icon/${name
                                .split(" ")
                                .join("_")}`}
                            alt={name}
                            style={{
                                width: matches_md_up ? "48px" : "32px",
                                height: matches_md_up ? "48px" : "32px",
                                border: `2px solid ${theme.border.color.primary}`,
                                borderRadius: "64px",
                            }}
                        />
                    </RouterLink>
                    <RouterLink to={href}>
                        <TextStyled
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    color: theme.text.selected,
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {displayName}
                        </TextStyled>
                    </RouterLink>
                </Stack>
            </Grid>
            <Grid size="grow">
                <DriveDiscText disc={disc} textVariant="body2" />
            </Grid>
        </Grid>
    );
}

export default DriveDiscListRow;
