import { CSSProperties, SyntheticEvent } from "react"

// Component imports
import { StyledTooltip } from "styled/StyledTooltip"

// MUI imports
import { TooltipProps } from "@mui/material"

interface ImageProps {
    src: string,
    fallbackSrc?: string,
    ext?: string,
    alt?: string,
    id?: string,
    loading?: "lazy" | "eager",
    style?: CSSProperties,
    tooltip?: React.ReactNode,
    tooltipArrow?: TooltipProps["placement"]
    onClick?: () => void
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
    onClick
}: ImageProps) {

    const defaultImageStyle: CSSProperties = {
        width: "auto",
        height: "auto",
        boxSizing: "border-box"
    }

    if (!src.startsWith("https")) {
        src = `https://assets.irminsul.gg/zzz/${src.split(" ").join("_")}.${ext}`
    }

    const imgStyle = Object.assign({ ...defaultImageStyle }, style)

    return (
        <StyledTooltip title={tooltip} arrow placement={tooltipArrow}>
            <img
                src={src}
                alt={alt}
                id={id}
                loading={loading}
                style={imgStyle}
                onError={(event: SyntheticEvent<HTMLImageElement, Event>) => {
                    event.currentTarget.src = `https://assets.irminsul.gg/zzz/${fallbackSrc}.png`
                    onerror = null
                }}
                onClick={onClick}
            />
        </StyledTooltip>
    )

}

export default Image