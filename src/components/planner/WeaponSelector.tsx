import React from "react";

// Component imports
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Autocomplete, Box } from "@mui/material";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectWeapons } from "reducers/weapon";
import { getSelectedWeapons, setPlannerWeapons } from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { RarityMap } from "data/common";

// Type imports
import { Weapon } from "types/weapon";
import { WeaponCostObject } from "types/costs";
import { WeaponAscensionMaterial } from "types/materials";

function WeaponSelector() {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const weapons = [...useAppSelector(selectWeapons)].sort(
        (a, b) =>
            RarityMap[b.rarity] - RarityMap[a.rarity] ||
            a.displayName.localeCompare(b.displayName)
    );
    const options = React.useMemo(
        () => createOptions(weapons),
        [JSON.stringify(weapons)]
    );
    const values = useAppSelector(getSelectedWeapons);

    const smallIconStyle = { width: "20px", height: "20px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            filterSelectedOptions
            options={options}
            getOptionLabel={(option) => option.displayName}
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    (option) =>
                        option.name
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase()) ||
                        option.displayName
                            .toLocaleLowerCase()
                            .includes(inputValue.toLocaleLowerCase())
                )
            }
            noOptionsText="No W-Engines"
            value={values}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(_: any, newValue: WeaponCostObject[] | null) =>
                dispatch(setPlannerWeapons(newValue as WeaponCostObject[]))
            }
            renderInput={(params) => (
                <SearchBar
                    params={params}
                    placeholder="W-Engines"
                    inputIcon={
                        <Image
                            src="icons/W-Engine"
                            alt="W-Engines"
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
                    key={option.displayName}
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
                        <Box sx={{ mr: "8px", mt: "6px" }}>
                            <Image
                                src={`specialties/${option.specialty}`}
                                alt={option.specialty}
                                style={smallIconStyle}
                                tooltip={option.specialty}
                            />
                        </Box>
                        <Image
                            src={`w-engines/${option.name}`}
                            alt={option.name}
                            style={{
                                width: "48px",
                                height: "48px",
                                padding: "4px",
                                marginRight: "8px",
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
                        <TextStyled noWrap>{option.displayName}</TextStyled>
                    </FlexBox>
                </StyledMenuItem>
            )}
        />
    );
}

export default WeaponSelector;

function createOptions(weapons: Weapon[]) {
    return weapons.map(
        (wep) =>
            ({
                name: wep.name,
                displayName: wep.displayName,
                rarity: wep.rarity,
                specialty: wep.specialty,
                costs: {
                    credits: {
                        Credit: 0,
                    },
                    weaponXP: {
                        WeaponXP1: 0,
                        WeaponXP2: 0,
                        WeaponXP3: 0,
                    },
                    weaponAscension: {
                        [`${wep.specialty}1` as WeaponAscensionMaterial]: 0,
                        [`${wep.specialty}2` as WeaponAscensionMaterial]: 0,
                        [`${wep.specialty}3` as WeaponAscensionMaterial]: 0,
                    },
                },
            } as WeaponCostObject)
    );
}
