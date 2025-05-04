import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";
import { RarityMap } from "data/common";
import { zoomImageOnHover } from "helpers/utils";
import { formatMaterialName } from "helpers/materials";
import {
    getExpertChallengeMaterial,
    getNotoriousHuntMaterial,
} from "data/materials/characterCoreSkillMaterials";

// Type imports
import { Rarity, Specialty } from "types/_common";
import { CharacterMaterials } from "types/materials";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "drivedisc" | "bangboo";
    rarity?: Rarity;
    variant?: "icon" | "avatar" | "material-card";
    size?: string;
    showName?: boolean;
    info?: {
        element?: string;
        specialty?: Specialty;
    };
    materials?: CharacterMaterials;
    backgroundColor?: string;
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
}

function InfoCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = "C",
    variant = "avatar",
    size,
    showName = variant !== "icon",
    info,
    materials,
    backgroundColor,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = variant === "material-card",
    loading = false,
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-displayCard`;

    const borderWidth = variant !== "icon" ? theme.displayCard.borderWidth : 2;
    const borderRadius = variant === "icon" ? "4px" : "16px";
    const borderColor =
        variant === "icon"
            ? getRarityColor(rarity)
            : theme.border.color.primary;

    size =
        variant === "icon" ? "64px" : variant === "avatar" ? "128px" : "96px";
    const imgSize =
        variant === "icon" ? `calc(${size} - ${borderWidth * 2}px)` : size;

    let scale = 1;
    let imgSrc = "";
    let route;
    switch (type) {
        case "character":
            imgSrc = `characters/icons/${name}`;
            route = "agents";
            break;
        case "weapon":
            imgSrc = `w-engines/${name}`;
            route = "w-engines";
            break;
        case "drivedisc":
            imgSrc = `drive-discs/${name}`;
            route = "drive-discs";
            break;
        case "bangboo":
            imgSrc = `bangboos/${name}`;
            route = "bangboos";
            break;
    }

    const href = !disableLink
        ? `/${route}/${name.split(" ").join("_").toLowerCase()}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: scale + 0.05,
            });
    };

    function imgPadding() {
        if (variant === "icon") {
            return "0px";
        } else if (type === "weapon" || type === "bangboo") {
            return "4px";
        } else if (type === "drivedisc") {
            return "8px";
        } else {
            return "0px";
        }
    }

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: variant !== "material-card" ? size : "auto",
        height: variant !== "icon" ? "auto" : size,
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${
            backgroundColor || theme.appbar.backgroundColor
        })`,
    };

    const cardStyle: SxProps = {
        borderStyle: "solid",
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width:
            variant === "material-card"
                ? `calc(${imgSize} * 8 / 3.25)`
                : "auto",
        backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${RarityMap[rarity]}_Star.png)`,
        backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
    };

    const imageStyle: CSSProperties = {
        width: imgSize,
        height: variant === "icon" || type === "bangboo" ? imgSize : "auto",
        transform: `scale(${scale})`,
        padding: imgPadding(),
    };

    const infoIconStyle: CSSProperties = {
        width: `calc(${imgSize} / 8 + 12px)`,
        height: `calc(${imgSize} / 8 + 12px)`,
        minWidth: "28px",
        minHeight: "28px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <StyledTooltip
                            title={!disableTooltip ? displayName : ""}
                            arrow
                            placement="top"
                        >
                            <Box
                                onMouseEnter={() => handleHover("enter")}
                                onMouseLeave={() => handleHover("leave")}
                                sx={imageContainerStyle}
                            >
                                <RouterLink to={href}>
                                    <Image
                                        src={imgSrc}
                                        alt={name}
                                        id={`${id}-img`}
                                        style={imageStyle}
                                    />
                                </RouterLink>
                                {variant === "material-card" && materials && (
                                    <MaterialGrid
                                        materials={materials}
                                        type={type}
                                        size={imgSize}
                                    />
                                )}
                            </Box>
                        </StyledTooltip>
                        {showName && (
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px",
                                    borderTop:
                                        variant === "icon"
                                            ? "none"
                                            : `calc(${imgSize} / 20) solid ${getRarityColor(
                                                  rarity
                                              )}`,
                                }}
                            >
                                <RouterLink to={href} sx={{ mx: "auto" }}>
                                    <TextStyled
                                        onMouseEnter={() =>
                                            handleHover("enter")
                                        }
                                        onMouseLeave={() =>
                                            handleHover("leave")
                                        }
                                        sx={{
                                            color: theme.appbar.color,
                                            textAlign: "center",
                                        }}
                                        variant={
                                            variant === "material-card"
                                                ? "body1-styled"
                                                : "body2-styled"
                                        }
                                    >
                                        {showName && displayName}
                                    </TextStyled>
                                </RouterLink>
                            </Box>
                        )}
                    </Card>
                    {info && (
                        <Stack
                            sx={{
                                position: "absolute",
                                zIndex: 5,
                                top: "-4px",
                                left: "-12px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "16px",
                            }}
                        >
                            {info.element !== undefined && (
                                <Image
                                    src={`elements/${info.element}`}
                                    alt={info.element}
                                    style={infoIconStyle}
                                    tooltip={info.element}
                                />
                            )}
                            {info.specialty !== undefined && (
                                <Image
                                    src={`specialties/${info.specialty}`}
                                    alt={info.specialty}
                                    style={infoIconStyle}
                                    tooltip={info.specialty}
                                />
                            )}
                        </Stack>
                    )}
                </>
            ) : (
                <Skeleton
                    variant="rounded"
                    width={size}
                    height={size}
                    sx={{ borderRadius: borderRadius }}
                />
            )}
        </Card>
    );
}

export default InfoCard;

function MaterialGrid({
    materials,
    type,
    size,
}: {
    materials: CharacterMaterials;
    type: "character" | "weapon" | "drivedisc" | "bangboo";
    size: string;
}) {
    const theme = useTheme();

    const { skillMat, ascensionMat, bossMat, weeklyBossMat } = materials;

    const images = [
        {
            src: skillMat ? `materials/agent/skill/${skillMat}3` : "",
            tag: skillMat ? `${skillMat} Chip` : "",
        },
        {
            src:
                ascensionMat && type === "character"
                    ? `materials/agent/ascension/${ascensionMat}3`
                    : ascensionMat && type === "weapon"
                    ? `materials/weapon/${ascensionMat}3`
                    : "",
            tag:
                ascensionMat && type === "character"
                    ? `${ascensionMat} Seal`
                    : ascensionMat && type === "weapon"
                    ? `${ascensionMat} Component`
                    : "",
        },
        {
            src: `materials/boss/${bossMat}.gif`,
            tag: formatMaterialName(
                getExpertChallengeMaterial({ tag: bossMat })
            ),
        },
        {
            src: `materials/weekly/${weeklyBossMat}.gif`,
            tag: formatMaterialName(
                getNotoriousHuntMaterial({ tag: weeklyBossMat })
            ),
        },
    ];

    return (
        <Box sx={{ px: "16px", py: "8px", height: size }}>
            <Grid container spacing={1}>
                {images.map((img) => (
                    <Image
                        key={img.tag}
                        src={img.src}
                        alt={img.tag}
                        style={{
                            width: `calc(${size} / (8 / 3.25))`,
                            border: `1px solid ${theme.border.color.primary}`,
                            borderRadius: "4px",
                            backgroundColor: theme.icon.backgroundColor,
                            padding: img.src.endsWith("gif") ? "2px" : "4px",
                        }}
                        tooltip={img.tag}
                    />
                ))}
            </Grid>
        </Box>
    );
}
