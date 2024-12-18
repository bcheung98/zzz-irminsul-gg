import React from "react";

// Component imports
import Image from "./Image";
import { StyledTooltip } from "styled/StyledTooltip";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, SxProps, ButtonBase, Box, Card } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Element, Rarity, Specialty } from "types/_common";

interface DisplayCardProps {
    name: string;
    displayName?: string;
    id?: string;
    type: "character" | "weapon" | "drivedisc";
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
}

function DisplayCard({
    name,
    displayName = name,
    id = displayName,
    type,
    rarity = "C",
    variant = "card",
    size = variant === "card" ? "180px" : "64px",
    showName = variant === "card",
    info,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = false,
}: DisplayCardProps) {
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
        const baseBG = theme.background(8);
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
    if (type === "character") {
        imgSrc = `characters/${variant}s/${name}`;
    }
    if (type === "weapon") {
        imgSrc = `w-engines/${name}`;
    }
    if (type === "drivedisc") {
        imgSrc = `drive-discs/${name}`;
    }

    let route;
    if (type === "character") {
        route = "agents";
    } else if (type === "weapon") {
        route = "w-engines";
    } else {
        route = "drive-discs";
    }
    const href = !disableLink
        ? `/${route}/${name.split(" ").join("_").toLowerCase()}`
        : "";

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover && zoomImageOnHover(direction, `${id}-img`, 1.05);
    };

    const rootStyle: SxProps = {
        position: "relative",
        width: size,
        height: variant === "card" ? "auto" : size,
        background: theme.background(8),
        border: "solid",
        borderWidth: borderWidth,
        borderColor:
            variant === "card" ? theme.border.color : getRarityColor(rarity),
        borderRadius: "5px",
    };

    const mainImageStyle: React.CSSProperties = {
        width: imgSize,
        height: variant === "card" ? "auto" : imgSize,
        padding: variant === "card" && type !== "character" ? "16px" : "0px",
        aspectRatio: aspectRatio(),
        boxShadow:
            variant === "icon"
                ? `inset 0 0 30px 5px ${getBackgroundColor(rarity)}`
                : "none",
    };

    const smallIconStyle: React.CSSProperties = {
        width: `calc(${size} / 10 + 14px)`,
        height: `calc(${size} / 10 + 14px)`,
        minWidth: "16px",
        minHeight: "16px",
        backgroundColor: theme.background(1),
        border: `2px solid ${theme.border.color}`,
        borderRadius: "16px",
        padding: "4px",
    };

    return (
        <Card sx={rootStyle}>
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
                        <Box
                            sx={{
                                display: "grid",
                                position: "absolute",
                                zIndex: 5,
                                top: "10px",
                                left: "10px",
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
                            {info.element && info.specialty && (
                                <Box sx={{ my: "5px" }} />
                            )}
                            {info.specialty !== undefined && (
                                <Image
                                    src={`specialties/${info.specialty}`}
                                    alt={info.specialty}
                                    style={smallIconStyle}
                                    tooltip={info.specialty}
                                />
                            )}
                        </Box>
                    )}
                    <ButtonBase disableRipple href={href} target="_blank">
                        <Image
                            src={imgSrc}
                            alt={name}
                            id={`${id}-img`}
                            style={mainImageStyle}
                        />
                    </ButtonBase>
                    <Box
                        sx={{
                            position: "relative",
                            mt:
                                variant === "icon"
                                    ? "0px"
                                    : type === "character"
                                    ? "0px"
                                    : "25px",
                            borderBottom:
                                variant === "icon"
                                    ? "none"
                                    : `calc(${size} / 25) solid ${getRarityColor(
                                          rarity
                                      )}`,
                        }}
                    >
                        <ButtonBase
                            disableRipple
                            href={href}
                            target="_blank"
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
                                    fontSize: `calc(${size} / 10) !important`,
                                    textShadow:
                                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                    textAlign: "center",
                                    mb: "5px",
                                }}
                            >
                                {showName && displayName}
                            </TextStyled>
                        </ButtonBase>
                    </Box>
                </Box>
            </StyledTooltip>
        </Card>
    );
}

export default DisplayCard;
