import { Material } from "types/materials";
import { isUnreleasedContent } from "./utils";

export function formatMaterialName(material?: Material) {
    if (material) {
        let materialName = material.displayName;
        if (material.source) {
            materialName += ` (${material.source})`;
        }
        return materialName;
    } else {
        return "?";
    }
}

export function getMaterialKeys(materials: Material[], showUnreleased = false) {
    if (!showUnreleased) {
        materials = materials.filter((mat) =>
            isUnreleasedContent(mat.release.version)
        );
    }
    return materials.filter(
        (mat) => !["1", "2", "3", "4"].includes(mat.tag.slice(-1))
    );
}

export function getMaterialKeyNames(
    materials: Material[],
    showUnreleased = false
) {
    if (!showUnreleased) {
        materials = materials.filter((mat) =>
            isUnreleasedContent(mat.release.version)
        );
    }
    return materials
        .filter((mat) => !["1", "2", "3", "4"].includes(mat.tag.slice(-1)))
        .map((mat) => mat.tag);
}
