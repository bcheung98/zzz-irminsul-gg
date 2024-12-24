import React from "react";

// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";

// Type imports
import { Rarity } from "types/_common";

interface MaterialImageProps {
    name: string;
    rarity: Rarity;
    cost: number;
    imgSrc: string;
    size?: string;
    labelColor?: string;
}

function MaterialImage({
    name,
    rarity,
    cost,
    imgSrc,
    size = "72px",
    labelColor,
}: MaterialImageProps) {
    const theme = useTheme();

    const cardStyle: React.CSSProperties = {
        padding: "3px 3px 1.5px",
        marginBottom: "5px",
        backgroundColor: getRarityColor(rarity),
        borderRadius: "10px",
    };

    const imgStyle: React.CSSProperties = {
        width: `calc(${size} - 6px)`,
        height: "auto",
        padding: !imgSrc.endsWith(".gif") ? "6px" : "0px",
        backgroundColor: theme.appbar.backgroundColor,
        borderRadius: "10px",
    };

    const labelStyle: React.CSSProperties = {
        display: "block",
        fontSize:
            cost.toLocaleString().length < 10
                ? `calc(${size} / 6) !important`
                : `calc(${size} / 7) !important`,
        width: "100%",
        margin: "auto",
        borderRadius: "10px",
        padding: "2.5px",
        textAlign: "center",
        backgroundColor: labelColor || theme.appbar.backgroundColor,
        color: theme.appbar.color,
    };

    return (
        <Box sx={{ width: size }}>
            <Box sx={cardStyle}>
                <Image
                    src={`materials/${imgSrc}`}
                    alt={name}
                    style={imgStyle}
                    tooltip={name}
                />
            </Box>
            <TextStyled sx={labelStyle}>{cost.toLocaleString()}</TextStyled>
        </Box>
    );
}

export default MaterialImage;
