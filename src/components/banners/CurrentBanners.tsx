// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
import Countdown from "custom/Countdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, LinearProgress, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectCharacterBanners, selectWeaponBanners } from "reducers/banner";
import { selectServer } from "reducers/settings";
import { createDateObject, isCurrentBanner } from "helpers/dates";
import { createBannerData } from "helpers/createBannerData";
import { isTBA } from "helpers/utils";

// Type imports
import { Rarity } from "types/_common";
import { Banner, BannerData, BannerType } from "types/banner";

function CurrentBanners() {
    const region = useAppSelector(selectServer);

    const characters = useAppSelector(selectCharacters);
    const weapons = useAppSelector(selectWeapons);
    const loading = [...characters, ...weapons].length === 0;

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

    const characterBannerData: BannerData[] = [];
    currentCharacterBanners.forEach((banner) => {
        const fiveStars = banner.fiveStars.map((item) =>
            createBannerData(item, "character", characters, weapons)
        );
        const fourStars = banner.fourStars.map((item) =>
            createBannerData(item, "character", characters, weapons)
        );
        characterBannerData.push({
            ...banner,
            fiveStars: fiveStars,
            fourStars: fourStars,
        });
    });

    const weaponBannerData: BannerData[] = [];
    currentWeaponBanners.forEach((banner) => {
        const fiveStars = banner.fiveStars.map((item) =>
            createBannerData(item, "weapon", characters, weapons)
        );
        const fourStars = banner.fourStars.map((item) =>
            createBannerData(item, "weapon", characters, weapons)
        );
        weaponBannerData.push({
            ...banner,
            fiveStars: fiveStars,
            fourStars: fourStars,
        });
    });

    const getRarity = (name: string, rarity: Rarity) =>
        !isTBA(name) ? rarity : "C";

    const renderBanner = (banner: BannerData, type: BannerType) => {
        return (
            <>
                <Grid container spacing={1}>
                    {banner.fiveStars.map((item, i) => (
                        <InfoCard
                            key={`${item.name}-${i}`}
                            id={`${item.displayName}-currentBanner`.toLowerCase()}
                            variant="icon"
                            type={type}
                            name={item.name}
                            displayName={item.displayName}
                            rarity={getRarity(item.name, "S")}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                            loading={loading}
                        />
                    ))}
                    {banner.fourStars.map((item, i) => (
                        <InfoCard
                            key={`${item.name}-${i}`}
                            id={`${item.displayName}-currentBanner`.toLowerCase()}
                            variant="icon"
                            type={type}
                            name={item.name}
                            displayName={item.displayName}
                            rarity={getRarity(item.name, "A")}
                            disableLink={isTBA(item.name)}
                            disableZoomOnHover={isTBA(item.name)}
                            loading={loading}
                        />
                    ))}
                </Grid>
                <Countdown
                    date={createDateObject({
                        date: banner.end,
                        region: region,
                    })}
                />
            </>
        );
    };

    return (
        <MainContentBox
            title="Current Banners"
            contentProps={{ padding: "16px" }}
        >
            {activeBanners ? (
                <FlexBox sx={{ flexWrap: "wrap", columnGap: 8, rowGap: 2 }}>
                    {characterBannerData.length > 0 && (
                        <Box>
                            <TextStyled variant="h6-styled" sx={{ mb: "8px" }}>
                                Agent Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {characterBannerData.map((banner, index) => (
                                    <Box key={index}>
                                        {renderBanner(banner, "character")}
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                    {weaponBannerData.length > 0 && (
                        <Box>
                            <TextStyled variant="h6-styled" sx={{ mb: "8px" }}>
                                W-Engine Banner
                            </TextStyled>
                            <Stack spacing={1}>
                                {weaponBannerData.map((banner, index) => (
                                    <Box key={index}>
                                        {renderBanner(banner, "weapon")}
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </FlexBox>
            ) : (
                <>
                    {loading ? (
                        <LinearProgress color="info" />
                    ) : (
                        <>
                            <TextStyled>
                                There are no active banners.
                            </TextStyled>
                            <Image
                                src="emotes/Error"
                                alt="No banners"
                                style={{
                                    height: "128px",
                                    marginTop: "24px",
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </MainContentBox>
    );
}

export default CurrentBanners;
