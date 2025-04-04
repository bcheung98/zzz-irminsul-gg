import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, Box, Card, Stack, Skeleton } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Element, Rarity, Specialty } from "types/_common";

interface InfoCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "drivedisc" | "bangboo";
    rarity?: Rarity;
    variant?: "icon" | "card";
    size?: string;
    showName?: boolean;
    info?: {
        element?: Element;
        specialty?: Specialty;
    };
    disableTooltip?: boolean;
    disableLink?: boolean;
    disableZoomOnHover?: boolean;
    loading?: boolean;
}

function InfoCard2({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = "C",
    variant = "card",
    size = variant === "card" ? "160px" : "64px",
    showName = variant === "card",
    info,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = false,
    loading = false,
}: InfoCardProps) {
    const theme = useTheme();

    id = `${id.split(" ").join("")}-${variant}-displayCard`;

    const aspectRatio = () => {
        if (variant === "icon") {
            return "1 / 1";
        } else {
            if (type === "character") {
                return "752 / 1024";
            } else {
                return "1 / 1";
            }
        }
    };

    const backgroundColor = () => {
        const baseBG = theme.displayCard.backgroundColor;
        if (variant === "icon") {
            return baseBG;
        } else {
            let gradient;
            type === "character" ? (gradient = "50%") : (gradient = "75%");
            return `linear-gradient(${baseBG} ${gradient}, ${getBackgroundColor(
                rarity,
                0.6
            )} 100%)`;
        }
    };

    const borderWidth = variant === "card" ? theme.displayCard.borderWidth : 2;
    const imgSize = `calc(${size} - ${borderWidth * 2}px)`;

    let imgSrc = "";
    let route;
    switch (type) {
        case "character":
            imgSrc = `characters/${variant}s/${name}`;
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
            zoomImageOnHover({ direction, id: `${id}-img`, zoom: 1.05 });
    };

    const rootStyle: SxProps = {
        position: "relative",
        width: size,
        height: variant === "card" ? "auto" : size,
        background: theme.displayCard.backgroundColor,
        border: "solid",
        borderWidth: borderWidth,
        borderColor:
            variant === "card"
                ? theme.border.color.primary
                : getRarityColor(rarity),
        borderRadius: "4px",
    };

    const mainImageStyle: CSSProperties = {
        width: imgSize,
        height: variant === "card" ? "auto" : imgSize,
        padding: variant === "card" && type !== "character" ? "16px" : "0px",
        aspectRatio: aspectRatio(),
        boxShadow:
            variant === "icon"
                ? `inset 0 0 32px 4px ${getBackgroundColor(rarity)}`
                : "none",
    };

    const smallIconStyle: CSSProperties = {
        boxSizing: "border-box",
        width: `calc(${size} / 10 + 14px)`,
        height: `calc(${size} / 10 + 14px)`,
        minWidth: "16px",
        minHeight: "16px",
        backgroundColor: theme.icon.backgroundColor,
        border: `2px solid ${theme.border.color.primary}`,
        borderRadius: "16px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle}>
            {!loading ? (
                <StyledTooltip
                    title={!disableTooltip ? displayName : ""}
                    arrow
                    placement="top"
                >
                    <Box
                        sx={{ background: backgroundColor() }}
                        onMouseEnter={() => handleHover("enter")}
                        onMouseLeave={() => handleHover("leave")}
                    >
                        {info && (
                            <Stack
                                spacing={1}
                                sx={{
                                    position: "absolute",
                                    zIndex: 5,
                                    top: "8px",
                                    left: "8px",
                                }}
                            >
                                {info.element !== undefined && (
                                    <Image
                                        src={`elements/${info.element}`}
                                        alt={info.element}
                                        style={smallIconStyle}
                                        tooltip={info.element}
                                    />
                                )}
                                {info.specialty !== undefined && (
                                    <Image
                                        src={`specialties/${info.specialty}`}
                                        alt={info.specialty}
                                        style={smallIconStyle}
                                        tooltip={info.specialty}
                                    />
                                )}
                            </Stack>
                        )}
                        <RouterLink to={href}>
                            <Image
                                src={imgSrc}
                                alt={name}
                                id={`${id}-img`}
                                style={mainImageStyle}
                            />
                        </RouterLink>
                        <Box
                            sx={{
                                position: "relative",
                                mt:
                                    variant === "icon"
                                        ? "0px"
                                        : type === "character"
                                        ? "0px"
                                        : "24px",
                                borderBottom:
                                    variant === "icon"
                                        ? "none"
                                        : `calc(${size} / 25) solid ${getRarityColor(
                                              rarity
                                          )}`,
                            }}
                        >
                            <RouterLink
                                to={href}
                                sx={{
                                    position: "absolute",
                                    bottom: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, 0%)",
                                    width: "90%",
                                }}
                            >
                                <TextStyled
                                    sx={{
                                        textShadow:
                                            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                        textAlign: "center",
                                        mb: "4px",
                                        color: "white",
                                    }}
                                >
                                    {showName && displayName}
                                </TextStyled>
                            </RouterLink>
                        </Box>
                    </Box>
                </StyledTooltip>
            ) : (
                <Skeleton variant="rounded" width={size} height={size} />
            )}
        </Card>
    );
}

export default InfoCard2;
