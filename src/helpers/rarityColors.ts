import { Rarity } from "types/_common"

export function getRarityColor(rarity: Rarity) {
    switch (rarity) {
        case "S":
            return "rgb(255, 238, 157)"
        case "A":
            return "rgb(175, 134, 255)"
        case "B":
            return "rgb(105, 157, 237)"
        case "C":
            return "rgb(175, 175, 175)"
    }
}

export function getBackgroundColor(rarity: Rarity, opacity = 0.45) {
    switch (rarity) {
        case "S":
            return `rgba(255, 199, 129, ${opacity})`
        case "A":
            return `rgba(193, 153, 253, ${opacity})`
        case "B":
            return `rgba(115, 176, 244, ${opacity})`
        case "C":
            return `rgba(195, 195, 195, ${opacity})`
    }
}