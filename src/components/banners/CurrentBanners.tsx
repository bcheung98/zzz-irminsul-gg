import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import Countdown from "custom/Countdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacterBanners, selectWeaponBanners } from "reducers/banner";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";
import { createBannerItems } from "./BannerListRow";

// Type imports
import { Rarity } from "types/_common";
import { Banner } from "types/banner";

function CurrentBanners() {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const characterBanners = useAppSelector(selectCharacterBanners);
    const weaponBanners = useAppSelector(selectWeaponBanners);

    const filterCurrentBanner = (banner: Banner) =>
        isCurrentBanner(
            createDateObject({ date: banner.start, region: region }).obj,
            createDateObject({ date: banner.end, region: region }).obj
        );

    const currentCharacterBanners =
        characterBanners.filter(filterCurrentBanner);
    const currentWeaponBanners = weaponBanners.filter(filterCurrentBanner);

    const activeBanners =
        [...currentCharacterBanners, ...currentWeaponBanners].length > 0;
    const [loading, setLoading] = React.useState(true);

    const getRarity = (name: string, rarity: Rarity) =>
        !isTBA(name) ? rarity : "C";

    React.useEffect(() => {
        if (!activeBanners) {
            const timer = setTimeout(() => {
                setLoading(false);
                clearTimeout(timer);
            }, 5000);
        } else {
            setLoading(false);
        }
    }, [activeBanners, setLoading]);

    return (
        <MainContentBox
            title="Current Banners"
            contentProps={{ padding: "16px" }}
        >
            {activeBanners ? (
                <FlexBox sx={{ flexWrap: "wrap", columnGap: 8, rowGap: 2 }}>
                    {currentCharacterBanners.length > 0 && (
                        <Box>
                            <TextStyled variant="h6" sx={{ mb: "8px" }}>
                                Agent Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {currentCharacterBanners.map(
                                    (banner, index) => (
                                        <Box key={index}>
                                            <Grid container spacing={0.75}>
                                                {createBannerItems(
                                                    banner.fiveStars,
                                                    "character"
                                                ).map((item) => (
                                                    <InfoCard
                                                        key={item.name}
                                                        id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                        variant="icon"
                                                        type="character"
                                                        name={item.name}
                                                        displayName={
                                                            item.displayName
                                                        }
                                                        rarity={getRarity(
                                                            item.name,
                                                            "S"
                                                        )}
                                                        disableLink={isTBA(
                                                            item.name
                                                        )}
                                                        disableZoomOnHover={isTBA(
                                                            item.name
                                                        )}
                                                    />
                                                ))}
                                                {createBannerItems(
                                                    banner.fourStars,
                                                    "character"
                                                ).map((item) => (
                                                    <InfoCard
                                                        key={item.name}
                                                        id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                        variant="icon"
                                                        type="character"
                                                        name={item.name}
                                                        displayName={
                                                            item.displayName
                                                        }
                                                        rarity={getRarity(
                                                            item.name,
                                                            "A"
                                                        )}
                                                        disableLink={isTBA(
                                                            item.name
                                                        )}
                                                        disableZoomOnHover={isTBA(
                                                            item.name
                                                        )}
                                                    />
                                                ))}
                                            </Grid>
                                            <Countdown
                                                date={createDateObject({
                                                    date: banner.end,
                                                    region: region,
                                                })}
                                            />
                                        </Box>
                                    )
                                )}
                            </Stack>
                        </Box>
                    )}
                    {currentWeaponBanners.length > 0 && (
                        <Box>
                            <TextStyled variant="h6" sx={{ mb: "8px" }}>
                                W-Engine Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {currentWeaponBanners.map((banner, index) => (
                                    <Box key={index}>
                                        <Grid container spacing={0.75}>
                                            {createBannerItems(
                                                banner.fiveStars,
                                                "weapon"
                                            ).map((item) => (
                                                <InfoCard
                                                    key={item.name}
                                                    id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                    variant="icon"
                                                    type="weapon"
                                                    name={item.name}
                                                    displayName={
                                                        item.displayName
                                                    }
                                                    rarity={getRarity(
                                                        item.name,
                                                        "S"
                                                    )}
                                                    disableLink={isTBA(
                                                        item.name
                                                    )}
                                                    disableZoomOnHover={isTBA(
                                                        item.name
                                                    )}
                                                />
                                            ))}
                                            {createBannerItems(
                                                banner.fourStars,
                                                "weapon"
                                            ).map((item) => (
                                                <InfoCard
                                                    key={item.name}
                                                    id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                    variant="icon"
                                                    type="weapon"
                                                    name={item.name}
                                                    displayName={
                                                        item.displayName
                                                    }
                                                    rarity={getRarity(
                                                        item.name,
                                                        "A"
                                                    )}
                                                    disableLink={isTBA(
                                                        item.name
                                                    )}
                                                    disableZoomOnHover={isTBA(
                                                        item.name
                                                    )}
                                                />
                                            ))}
                                        </Grid>
                                        <Countdown
                                            date={createDateObject({
                                                date: banner.end,
                                                region: region,
                                            })}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </FlexBox>
            ) : (
                <>
                    <FlexBox>
                        <Box
                            sx={{
                                display: loading ? "block" : "none",
                                width: "100%",
                                color: theme.text.selected,
                            }}
                        >
                            <LinearProgress color="inherit" />
                        </Box>
                        <TextStyled
                            sx={{
                                display:
                                    !loading && !activeBanners
                                        ? "block"
                                        : "none",
                            }}
                        >
                            There are no active banners.
                        </TextStyled>
                    </FlexBox>
                    <Image
                        src="emotes/Error"
                        alt="No banners"
                        style={{
                            display:
                                !loading && !activeBanners ? "block" : "none",
                            height: "128px",
                            marginTop: "20px",
                        }}
                    />
                </>
            )}
        </MainContentBox>
    );
}

export default CurrentBanners;
