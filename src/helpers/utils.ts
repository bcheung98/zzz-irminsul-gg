export function range(len: number): number[];
export function range(start: number, stop: number, step?: number): number[];
export function range(a: number, b?: number, step = 1): number[] {
    let arr: number[] = [];
    if (b) {
        const start = Math.min(a, b);
        const stop = Math.max(a, b);
        arr = [...Array(stop - start + 1).keys()].map((i) => i * step + start);
        a > b && arr.reverse();
    } else {
        arr = [...Array(a).keys()].map((i) => i);
    }
    return arr;
}

export function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj) as Array<keyof T>;
}

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

export function isTBA(str: string) {
    return str === "TBA" || str === "To be announced";
}
