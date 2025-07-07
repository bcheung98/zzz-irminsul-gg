import { useParams } from "react-router";

// Component imports
import WeaponImage from "./WeaponImage";
import WeaponInfo from "./WeaponInfo";
import WeaponPassive from "./WeaponPassive";
import WeaponStats from "./WeaponStats";
import WeaponAscension from "./WeaponAscension";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI Imports
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWeapons } from "reducers/weapon";

function WeaponPage() {
    const params = useParams<{ name: string }>();
    const weapon = useAppSelector(selectWeapons).find(
        (wep) => wep.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (weapon) {
        const documentTitle = `${weapon.displayName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `${weapon.displayName} - ${weapon.rarity}-Rank ${weapon.specialty} W-Engine | ${weapon.shortDescription}`;
        document.title = documentTitle;
        document
            .querySelector('meta[property="og:title"]')
            ?.setAttribute("content", documentTitle);
        document
            .querySelector('meta[property="description"]')
            ?.setAttribute("content", documentDesc);
        document
            .querySelector('meta[property="og:description"]')
            ?.setAttribute("content", documentDesc);

        return (
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <WeaponImage weapon={weapon} />
                </Grid>
                <Grid size="grow">
                    <Stack spacing={2}>
                        <BetaTag version={weapon.release.version} />
                        <WeaponInfo weapon={weapon} />
                        <Grid container columnSpacing={3} rowSpacing={2}>
                            <Grid size={{ xs: 12, md: 7 }}>
                                <WeaponPassive weapon={weapon} />
                                <WeaponAscension weapon={weapon} />
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <WeaponStats weapon={weapon} />
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        );
    } else {
        return <PageNotFound params={params.name} />;
    }
}

export default WeaponPage;
