import { useMemo } from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Autocomplete, Box, Card } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { getSelectedCharacters, setPlannerCharacters } from "reducers/planner";
import { getRarityColor } from "helpers/rarityColors";

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

    const smallIconStyle = { width: "20px", height: "20px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
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
            onChange={(_: any, newValue: CharacterCostObject[] | null) =>
                dispatch(
                    setPlannerCharacters(newValue as CharacterCostObject[])
                )
            }
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
                    <FlexBox>
                        <Box sx={{ mr: "4px", mt: "8px" }}>
                            <Box>
                                <Image
                                    src={`elements/${option.element}`}
                                    alt={option.element}
                                    style={smallIconStyle}
                                    tooltip={option.element}
                                />
                            </Box>
                            <Box>
                                <Image
                                    src={`specialties/${option.specialty}`}
                                    alt={option.specialty}
                                    style={smallIconStyle}
                                    tooltip={option.specialty}
                                />
                            </Box>
                        </Box>
                        <Card
                            sx={{
                                width: "38px",
                                height: "48px",
                                border: `2px solid ${getRarityColor(
                                    option.rarity
                                )}`,
                                borderRadius: "4px",
                                backgroundColor: theme.background(2),
                                mr: "16px",
                                transform: "skewX(15deg) translate(7px)",
                            }}
                        >
                            <Image
                                src={`characters/avatars/${option.name}`}
                                alt={option.name}
                                style={{
                                    width: "48px",
                                    transform: "skewX(-15deg) translate(-7px)",
                                }}
                            />
                        </Card>
                        <TextStyled noWrap>{option.fullName}</TextStyled>
                    </FlexBox>
                </StyledMenuItem>
            )}
        />
    );
}

export default CharacterSelector;

function createOptions(characters: Character[]) {
    return characters.map(
        (char) =>
            ({
                name: char.name,
                fullName: char.fullName,
                rarity: char.rarity,
                element: char.element,
                specialty: char.specialty,
                colors: char.colors,
                costs: {
                    // Source of each material is mapped to a specific index in the array:
                    // [Level, Basic, Dodge, Assist, Special, Chain, Core]
                    credits: {
                        Credit: [0, 0, 0, 0, 0, 0, 0],
                    },
                    characterXP: {
                        CharacterXP1: [0, 0, 0, 0, 0, 0, 0],
                        CharacterXP2: [0, 0, 0, 0, 0, 0, 0],
                        CharacterXP3: [0, 0, 0, 0, 0, 0, 0],
                    },
                    bossMat: {
                        [`${char.materials.bossMat}` as ExpertChallengeMaterial]:
                            [0, 0, 0, 0, 0, 0, 0],
                    },
                    weeklyBossMat: {
                        [`${char.materials.weeklyBossMat}` as NotoriousHuntMaterial]:
                            [0, 0, 0, 0, 0, 0, 0],
                    },
                    hamsterCagePass: {
                        "Hamster Cage Pass": [0, 0, 0, 0, 0, 0, 0],
                    },
                    characterAscension: {
                        [`${char.specialty}1` as CharacterAscensionMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.specialty}2` as CharacterAscensionMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.specialty}3` as CharacterAscensionMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                    characterSkill: {
                        [`${char.element}1` as CharacterSkillMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.element}2` as CharacterSkillMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                        [`${char.element}3` as CharacterSkillMaterial]: [
                            0, 0, 0, 0, 0, 0, 0,
                        ],
                    },
                },
            } as CharacterCostObject)
    );
}
