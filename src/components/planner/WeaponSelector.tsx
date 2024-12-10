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

    const smallIconStyle = { width: "20px", height: "20px" };

    return (
        <Autocomplete
            multiple
            autoComplete
            disableCloseOnSelect
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
            value={useAppSelector(getSelectedWeapons)}
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
                            style={{ width: "24px", marginLeft: "5px" }}
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
                            borderBottom: `1px solid ${theme.border.color}`,
                        },
                    }}
                >
                    <FlexBox>
                        <Box sx={{ mr: "10px", mt: "6px" }}>
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
                                marginRight: "10px",
                                border: `2px solid ${getRarityColor(
                                    option.rarity
                                )}`,
                                borderRadius: theme.mainContentBox.borderRadius,
                                backgroundColor: theme.background(8),
                                boxShadow: `inset 0 0 25px 15px ${getBackgroundColor(
                                    option.rarity
                                )}`,
                            }}
                        />
                        <TextStyled noWrap>{option.displayName}</TextStyled>
                    </FlexBox>
                </StyledMenuItem>
            )}
            slotProps={{
                chip: {
                    sx: {
                        backgroundColor: theme.background(8),
                        color: theme.text.main,
                        fontFamily: theme.font.styled.family,
                        "& .MuiChip-deleteIcon": {
                            color: theme.text.main,
                            ":hover": {
                                color: theme.text.description,
                            },
                        },
                    },
                },
                listbox: {
                    sx: { p: 0 },
                },
                paper: {
                    sx: {
                        backgroundColor: theme.menu.default,
                        borderRadius: "5px",
                    },
                },
                popper: {
                    sx: { zIndex: theme.zIndex.appBar - 1 },
                },
            }}
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
                    credits: 0,
                    weaponXP: {
                        weaponXP1: 0,
                        weaponXP2: 0,
                        weaponXP3: 0,
                    },
                    weaponAscension: {
                        [`${wep.specialty}1`]: 0,
                        [`${wep.specialty}2`]: 0,
                        [`${wep.specialty}3`]: 0,
                    },
                },
            } as WeaponCostObject)
    );
}
