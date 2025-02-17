import { useMemo } from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { StyledMenuItem } from "styled/StyledMenu";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Autocomplete, Stack } from "@mui/material";

// Helper imports
import { range } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { getSelectedCharacters, setPlannerCharacters } from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { Character } from "types/character";
import { CharacterCostObject } from "types/costs";
import {
    CharacterAscensionMaterial,
    CharacterSkillMaterial,
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

function CharacterSelector() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = [...useAppSelector(selectCharacters)].sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
    );
    const options = useMemo(
        () => createOptions(characters),
        [JSON.stringify(characters)]
    );
    const values = useAppSelector(getSelectedCharacters);

    const smallIconStyle = { width: "16px", height: "16px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
            disableClearable
            options={options}
            getOptionLabel={(option) => option.fullName}
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.name
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase()) ||
                        option.fullName
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase())
                )
            }
            noOptionsText="No Agents"
            value={values}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(
                event,
                newValue: CharacterCostObject[] | null,
                reason
            ) => {
                if (
                    event.type === "keydown" &&
                    ((event as React.KeyboardEvent).key === "Backspace" ||
                        (event as React.KeyboardEvent).key === "Delete") &&
                    reason === "removeOption"
                ) {
                    return;
                }
                dispatch(
                    setPlannerCharacters(newValue as CharacterCostObject[])
                );
            }}
            renderTags={() => null}
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    placeholder="Agents"
                    inputIcon={
                        <Image
                            src="icons/Characters"
                            alt="Agents"
                            style={{
                                width: "32px",
                                marginLeft: "4px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "64px",
                            }}
                        />
                    }
                />
            )}
            renderOption={(props, option) => (
                <StyledMenuItem
                    {...props}
                    key={option.fullName}
                    sx={{
                        "&:hover": {
                            backgroundColor: theme.menu.selectedHover,
                        },
                        "&:not(:last-child)": {
                            borderBottom: `1px solid ${theme.border.color.primary}`,
                        },
                    }}
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <Stack
                            spacing={1}
                            sx={{
                                p: "4px",
                                borderRadius: "16px",
                                backgroundColor: theme.appbar.backgroundColor,
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
                                width: "48px",
                                height: "48px",
                                border: `2px solid ${getRarityColor(
                                    option.rarity
                                )}`,
                                borderRadius: theme.mainContentBox.borderRadius,
                                backgroundColor: theme.background(2),
                                boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                    option.rarity
                                )}`,
                            }}
                        />
                        <TextStyled noWrap>{option.fullName}</TextStyled>
                    </Stack>
                </StyledMenuItem>
            )}
        />
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
                        [`${char.materials.bossMat}` as ExpertChallengeMaterial]:
                            costArray,
                    },
                    weeklyBossMat: {
                        [`${char.materials.weeklyBossMat}` as NotoriousHuntMaterial]:
                            costArray,
                    },
                    hamsterCagePass: {
                        "Hamster Cage Pass": costArray,
                    },
                    characterAscension: {
                        [`${char.specialty}1` as CharacterAscensionMaterial]:
                            costArray,
                        [`${char.specialty}2` as CharacterAscensionMaterial]:
                            costArray,
                        [`${char.specialty}3` as CharacterAscensionMaterial]:
                            costArray,
                    },
                    characterSkill: {
                        [`${char.element}1` as CharacterSkillMaterial]:
                            costArray,
                        [`${char.element}2` as CharacterSkillMaterial]:
                            costArray,
                        [`${char.element}3` as CharacterSkillMaterial]:
                            costArray,
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
            } as CharacterCostObject)
    );
}
