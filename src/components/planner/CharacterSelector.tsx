import { BaseSyntheticEvent, useMemo, useState } from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import Dropdown from "custom/Dropdown";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack, StackProps } from "@mui/material";

// Helper imports
import { range, sortBy } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import {
    addItem,
    getSelectedCharacters,
    setPlannerCharacters,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { elements, specialities } from "data/common";
import {
    getExpertChallengeMaterial,
    getNotoriousHuntMaterial,
} from "data/materials/characterCoreSkillMaterials";
import { getCharacterAscensionMaterial } from "data/materials/characterAscensionMaterials";
import { getCharacterSkillMaterial } from "data/materials/characterSkillMaterials";

// Type imports
import { Element, Specialty, Rarity } from "types/_common";
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";
import { CharacterFilterState } from "reducers/characterFilters";

const initialFilters: CharacterFilterState = {
    element: [],
    specialty: [],
    attackType: [],
    rarity: [],
    faction: [],
    bossMat: [],
    weeklyBossMat: [],
};

function CharacterSelector({ handleClose }: { handleClose: () => void }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );

    const options = createOptions(characters);
    const selected = useAppSelector(getSelectedCharacters);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const [filters, setFilters] = useState(initialFilters);
    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                setFilters({ ...filters, element: newValues }),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: BaseSyntheticEvent, newValues: Specialty[]) =>
                setFilters({ ...filters, specialty: newValues }),
            buttons: createButtons(specialities, "specialties"),
        },
        {
            name: "Rank",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            buttons: createButtons(["S", "A"], "ranks/character"),
            width: "auto",
        },
    ];

    const currentOptions = useMemo(
        () => filterOptions(options, selected, filters, searchValue),
        [options, selected, filters, searchValue]
    );

    const handleClick = (option: CharacterCostObject) => {
        const newValues = [...selected];
        newValues.push(option);
        dispatch(setPlannerCharacters(newValues));
        dispatch(addItem(option.id));
        handleClose();
    };

    const smallIconStyle = { width: "16px", height: "16px" };

    const stackParams: StackProps = {
        spacing: 2,
        direction: "row",
        alignItems: "center",
        sx: {
            p: 1,
            borderRadius: "4px",
            backgroundColor: theme.background(0, "dark"),
            "&:hover": {
                backgroundColor: theme.background(0, "light"),
                cursor: "pointer",
            },
        },
    };

    return (
        <Stack spacing={2}>
            <Stack spacing={2}>
                <SearchBar
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleInputChange}
                    size={{ height: "36px" }}
                />
                <Dropdown title="Filters">
                    {filterGroups.map((filter, index) => (
                        <Stack key={index} spacing={1}>
                            <ToggleButtons
                                color="secondary"
                                buttons={filter.buttons}
                                value={filter.value}
                                onChange={filter.onChange}
                                width={filter.width || undefined}
                                spacing={4}
                                padding={
                                    "label" in filter.buttons[0] ? "0 8px" : 0
                                }
                            />
                        </Stack>
                    ))}
                </Dropdown>
            </Stack>
            <Stack
                spacing={1}
                sx={{
                    height: "50vh",
                    maxHeight: "600px",
                    overflowY: "auto",
                }}
            >
                {currentOptions.length > 0 ? (
                    currentOptions.map((option) => (
                        <Stack
                            key={option.id}
                            {...stackParams}
                            onClick={() => handleClick(option)}
                        >
                            <Stack
                                spacing={1}
                                sx={{
                                    p: "4px",
                                    borderRadius: "16px",
                                    backgroundColor:
                                        theme.appbar.backgroundColor,
                                }}
                            >
                                <Image
                                    src={`elements/${option.element}`}
                                    alt={option.element}
                                    style={smallIconStyle}
                                    tooltip={option.element}
                                />

                                <Image
                                    src={`specialties/${option.specialty}`}
                                    alt={option.specialty}
                                    style={smallIconStyle}
                                    tooltip={option.specialty}
                                />
                            </Stack>
                            <Image
                                src={`characters/icons/${option.name}`}
                                alt={option.name}
                                style={{
                                    width: matches_md_up ? "48px" : "40px",
                                    height: matches_md_up ? "48px" : "40px",
                                    border: `2px solid ${getRarityColor(
                                        option.rarity
                                    )}`,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                    backgroundColor: theme.background(2),
                                    boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                        option.rarity
                                    )}`,
                                }}
                            />
                            <TextStyled
                                variant={
                                    matches_md_up
                                        ? "body1-styled"
                                        : "body2-styled"
                                }
                                noWrap
                            >
                                {option.fullName}
                            </TextStyled>
                        </Stack>
                    ))
                ) : (
                    <TextStyled sx={{ textAlign: "center" }}>
                        No agents
                    </TextStyled>
                )}
            </Stack>
        </Stack>
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    const costArray = range(0, 7, 0);
    return characters.map(
        (char) =>
            ({
                id: `character_${char.id}`,
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                specialty: char.specialty,
                colors: char.colors,
                release: char.release,
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Basic, Dodge, Assist, Special, Chain, Core]
                    credits: {
                        Credit: costArray,
                    },
                    characterXP: {
                        CharacterXP1: costArray,
                        CharacterXP2: costArray,
                        CharacterXP3: costArray,
                    },
                    bossMat: {
                        [getExpertChallengeMaterial({
                            tag: char.materials.bossMat,
                        })?.id!]: costArray,
                    },
                    weeklyBossMat: {
                        [getNotoriousHuntMaterial({
                            tag: char.materials.weeklyBossMat,
                        })?.id!]: costArray,
                    },
                    hamsterCagePass: {
                        "Hamster Cage Pass": costArray,
                    },
                    characterAscension: {
                        [getCharacterAscensionMaterial({
                            tag: `${char.specialty}1`,
                        })?.id!]: costArray,
                        [getCharacterAscensionMaterial({
                            tag: `${char.specialty}2`,
                        })?.id!]: costArray,
                        [getCharacterAscensionMaterial({
                            tag: `${char.specialty}3`,
                        })?.id!]: costArray,
                    },
                    characterSkill: {
                        [getCharacterSkillMaterial({ tag: `${char.element}1` })
                            ?.id!]: costArray,
                        [getCharacterSkillMaterial({ tag: `${char.element}2` })
                            ?.id!]: costArray,
                        [getCharacterSkillMaterial({ tag: `${char.element}3` })
                            ?.id!]: costArray,
                    },
                },
                values: {
                    level: {},
                    basic: {},
                    dodge: {},
                    assist: {},
                    special: {},
                    chain: {},
                    core: {},
                },
                dataFormat: "v2",
            } as CharacterCostObject)
    );
}

function filterOptions(
    characters: CharacterCostObject[],
    selected: CharacterCostObject[],
    filters: CharacterFilterState,
    searchValue: string
) {
    let chars: CharacterCostObject[];
    chars = characters.filter(
        (char) => !selected.map((char) => char.id).includes(char.id)
    );
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.specialty.length > 0) {
        chars = chars.filter((char) =>
            filters.specialty.includes(char.specialty)
        );
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (searchValue !== "") {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    chars = chars.sort(
        (a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.fullName, a.fullName)
    );

    return chars;
}

function createButtons<T extends string>(items: readonly T[], url: string) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={!url.startsWith("ranks") ? item : ""}
            />
        ),
    }));
}
