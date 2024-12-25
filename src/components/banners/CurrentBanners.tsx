import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import DisplayCard from "custom/DisplayCard";
import Countdown from "custom/Countdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacterBanners, selectWeaponBanners } from "reducers/banner";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { isTBA } from "helpers/utils";
import { createBannerItems } from "./BannerListRow";

function CurrentBanners() {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const characterBanners = useAppSelector(selectCharacterBanners);
    const weaponBanners = useAppSelector(selectWeaponBanners);

    const currentCharacterBanners = characterBanners.filter((banner) =>
        isCurrentBanner(
            createDateObject({ date: banner.start, region: region }).obj,
            createDateObject({ date: banner.end, region: region }).obj
        )
    );
    const currentWeaponBanners = weaponBanners.filter((banner) =>
        isCurrentBanner(
            createDateObject({ date: banner.start, region: region }).obj,
            createDateObject({ date: banner.end, region: region }).obj
        )
    );

    const activeBanners =
        [...currentCharacterBanners, ...currentWeaponBanners].length > 0;
    const [loading, setLoading] = React.useState(true);

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
                <>
                    <Grid container rowSpacing={2} columnSpacing={9}>
                        {currentCharacterBanners.length > 0 && (
                            <Grid size={{ xs: 12, lg: "auto" }}>
                                <TextStyled variant="h6" sx={{ mb: "8px" }}>
                                    Agent Banner
                                </TextStyled>
                                {currentCharacterBanners.map(
                                    (banner, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                mb:
                                                    index !==
                                                    currentCharacterBanners.length -
                                                        1
                                                        ? "20px"
                                                        : 0,
                                            }}
                                        >
                                            <Grid container spacing={0.75}>
                                                {createBannerItems(
                                                    banner.fiveStars,
                                                    "character"
                                                ).map((item, index) => (
                                                    <DisplayCard
                                                        key={index}
                                                        id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                        variant="icon"
                                                        type="character"
                                                        name={item.name}
                                                        displayName={
                                                            item.displayName
                                                        }
                                                        rarity={
                                                            !isTBA(item.name)
                                                                ? "S"
                                                                : "B"
                                                        }
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
                                                ).map((item, index) => (
                                                    <DisplayCard
                                                        key={index}
                                                        id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                        variant="icon"
                                                        type="character"
                                                        name={item.name}
                                                        displayName={
                                                            item.displayName
                                                        }
                                                        rarity={
                                                            !isTBA(item.name)
                                                                ? "A"
                                                                : "B"
                                                        }
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
                            </Grid>
                        )}
                        {currentWeaponBanners.length > 0 && (
                            <Grid size={{ xs: 12, lg: "auto" }}>
                                <TextStyled variant="h6" sx={{ mb: "8px" }}>
                                    W-Engine Banner
                                </TextStyled>
                                {currentWeaponBanners.map((banner, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            mb:
                                                index !==
                                                currentWeaponBanners.length - 1
                                                    ? "20px"
                                                    : 0,
                                        }}
                                    >
                                        <Grid container spacing={0.75}>
                                            {createBannerItems(
                                                banner.fiveStars,
                                                "weapon"
                                            ).map((item, index) => (
                                                <DisplayCard
                                                    key={index}
                                                    id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                    variant="icon"
                                                    type="weapon"
                                                    name={item.name}
                                                    displayName={
                                                        item.displayName
                                                    }
                                                    rarity={
                                                        !isTBA(item.name)
                                                            ? "S"
                                                            : "B"
                                                    }
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
                                            ).map((item, index) => (
                                                <DisplayCard
                                                    key={index}
                                                    id={`${item.displayName}-currentBanner`.toLowerCase()}
                                                    variant="icon"
                                                    type="weapon"
                                                    name={item.name}
                                                    displayName={
                                                        item.displayName
                                                    }
                                                    rarity={
                                                        !isTBA(item.name)
                                                            ? "A"
                                                            : "B"
                                                    }
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
                            </Grid>
                        )}
                    </Grid>
                </>
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
