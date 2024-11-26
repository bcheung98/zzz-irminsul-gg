export function zoomImageOnHover(direction: "enter" | "leave", id: string, zoom = 1.1, translate = "translate(0px, 0px)") {
    const image = document.getElementById(id)
    if (image !== null) {
        if (direction === "enter") {
            image.style.transition = "all 125ms ease-in"
            image.style.transform = `scale(${zoom}) ${translate}`
        }
        else {
            image.style.transition = "all 125ms ease-out"
            image.style.transform = `scale(1) ${translate}`
        }
    }
}