export function combineStyles(
    style1: React.CSSProperties,
    style2: React.CSSProperties | undefined
) {
    return style2 ? { ...style1, ...style2 } : style1;
}

export function zoomImageOnHover(
    direction: "enter" | "leave",
    id: string,
    zoom = 1.1,
    translate = "translate(0px, 0px)"
) {
    const image = document.getElementById(id);
    if (image !== null) {
        if (direction === "enter") {
            image.style.transition = "all 125ms ease-in";
            image.style.transform = `scale(${zoom}) ${translate}`;
        } else {
            image.style.transition = "all 125ms ease-out";
            image.style.transform = `scale(1) ${translate}`;
        }
    }
}

export const isTBA = (str: string) =>
    str === "TBA" || str === "To be announced";
