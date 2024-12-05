import { CSSProperties, SyntheticEvent } from "react";

// Component imports
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import { TooltipProps } from "@mui/material";
import { zoomImageOnHover } from "helpers/utils";

interface ImageProps {
    src: string;
    fallbackSrc?: string;
    ext?: string;
    alt?: string;
    id?: string;
    loading?: "lazy" | "eager";
    style?: CSSProperties;
    tooltip?: React.ReactNode;
    tooltipArrow?: TooltipProps["placement"];
    zoomOnHover?: boolean;
    onClick?: () => void;
}

function Image({
    src,
    fallbackSrc = "images/Unknown",
    ext = "png",
    alt = "",
    id = src,
    loading = "lazy",
    style,
    tooltip = "",
    tooltipArrow = "top",
    zoomOnHover = false,
    onClick,
}: ImageProps) {
    const defaultImageStyle: CSSProperties = {
        width: "auto",
        height: "auto",
    };

    if (!src.startsWith("https")) {
        src = `https://assets.irminsul.gg/zzz/${src
            .split(" ")
            .join("_")}.${ext}`;
    }

    const imgStyle = Object.assign({ ...defaultImageStyle }, style);

    const handleHover = (direction: "enter" | "leave") => {
        zoomOnHover && zoomImageOnHover(direction, id);
    };

    return (
        <StyledTooltip title={tooltip} arrow placement={tooltipArrow}>
            <img
                src={src}
                alt={alt}
                id={id}
                loading={loading}
                style={imgStyle}
                onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
                    event.currentTarget.src = `https://assets.irminsul.gg/zzz/${fallbackSrc}.png`;
                    onerror = null;
                }}
                onClick={onClick}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            />
        </StyledTooltip>
    );
}

export default Image;
