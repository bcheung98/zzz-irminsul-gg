import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";

// Helper imports
import { pxToInt } from "helpers/utils";
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
    size = "64px",
    labelColor,
}: MaterialImageProps) {
    const theme = useTheme();

    size = useMediaQuery(theme.breakpoints.up("sm"))
        ? size
        : `${pxToInt(size) - 8}px`;

    const intSize = pxToInt(size) / 4;
    const fontSize =
        cost.toLocaleString().length < 8
            ? intSize - 4
            : intSize - (cost.toLocaleString().length - 4);

    const cardStyle: CSSProperties = {
        padding: "4px 4px 2px",
        marginBottom: "4px",
        backgroundColor: getRarityColor(rarity),
        borderRadius: "12px",
    };

    const imgStyle: CSSProperties = {
        width: `calc(${size} - 8px)`,
        height: "auto",
        padding: !imgSrc.endsWith(".gif") ? "4px" : "0px",
        backgroundColor: theme.appbar.backgroundColor,
        borderRadius: "12px",
    };

    const labelStyle: CSSProperties = {
        display: "block",
        fontSize: `${fontSize}px !important`,
        width: "100%",
        margin: "auto",
        borderRadius: "12px",
        padding: "2px",
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
