import { CharacterFilterState } from "reducers/characterFilters";
import { Character } from "types/character";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.specialty.length > 0) {
        chars = chars.filter((char) =>
            filters.specialty.includes(char.specialty)
        );
    }
    if (filters.attackType.length > 0) {
        chars = chars.filter((char) =>
            filters.attackType.includes(char.attackType)
        );
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.faction.length > 0) {
        chars = chars.filter((char) => filters.faction.includes(char.faction));
    }
    if (searchValue) {
        chars = chars.filter(
            (char) =>
                char.name
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase()) ||
                char.fullName
                    .toLocaleLowerCase()
                    .includes(searchValue.toLocaleLowerCase())
        );
    }
    return chars;
}
