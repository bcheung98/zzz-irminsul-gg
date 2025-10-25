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
import { sortBy } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectWeapons } from "reducers/weapon";
import {
    addItem,
    getSelectedWeapons,
    setPlannerWeapons,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import { RarityMap, specialities } from "data/common";
import { getWeaponAscensionMaterial } from "data/materials/weaponAscensionMaterials";

// Type imports
import { Specialty, Rarity } from "types/_common";
import { Weapon } from "types/weapon";
import { WeaponCostObject } from "types/costs";
import { WeaponFilterState } from "reducers/weaponFilters";

const initialFilters: WeaponFilterState = {
    specialty: [],
    rarity: [],
    substats: [],
};

function WeaponSelector({ handleClose }: { handleClose: () => void }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const weapons = [...useAppSelector(selectWeapons)];

    const options = createOptions(weapons);
    const selected = useAppSelector(getSelectedWeapons);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const [filters, setFilters] = useState(initialFilters);
    const filterGroups = [
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: BaseSyntheticEvent, newValues: Specialty[]) =>
                setFilters({ ...filters, specialty: newValues }),
            buttons: createButtons(specialities, "specialties"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                setFilters({ ...filters, rarity: newValues }),
            buttons: createButtons(["S", "A", "B"], "ranks/item"),
            width: "auto",
        },
    ];

    const currentOptions = useMemo(
        () => filterOptions(options, selected, filters, searchValue),
        [options, selected, filters, searchValue]
    );

    const handleClick = (option: WeaponCostObject) => {
        const newValues = [...selected];
        newValues.push(option);
        dispatch(setPlannerWeapons(newValues));
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
                                    src={`specialties/${option.specialty}`}
                                    alt={option.specialty}
                                    style={smallIconStyle}
                                    tooltip={option.specialty}
                                />
                            </Stack>
                            <Image
                                src={`w-engines/${option.name}`}
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
                                {option.displayName}
                            </TextStyled>
                        </Stack>
                    ))
                ) : (
                    <TextStyled sx={{ textAlign: "center" }}>
                        No w-engines
                    </TextStyled>
                )}
            </Stack>
        </Stack>
    );
}

export default WeaponSelector;

function createOptions(weapons: Weapon[]) {
    return weapons.map(
        (wep) =>
            ({
                id: `weapon_${wep.id}`,
                name: wep.name,
                displayName: wep.displayName,
                rarity: wep.rarity,
                specialty: wep.specialty,
                release: wep.release,
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
                        [getWeaponAscensionMaterial({
                            tag: `${wep.specialty}1`,
                        })?.id!]: 0,
                        [getWeaponAscensionMaterial({
                            tag: `${wep.specialty}2`,
                        })?.id!]: 0,
                        [getWeaponAscensionMaterial({
                            tag: `${wep.specialty}3`,
                        })?.id!]: 0,
                    },
                },
                values: {
                    level: {},
                },
                dataFormat: "v2",
            } as WeaponCostObject)
    );
}

function filterOptions(
    weapons: WeaponCostObject[],
    selected: WeaponCostObject[],
    filters: WeaponFilterState,
    searchValue: string
) {
    let weps: WeaponCostObject[];
    weps = weapons.filter(
        (wep) => !selected.map((wep) => wep.id).includes(wep.id)
    );
    if (filters.specialty.length > 0) {
        weps = weps.filter((wep) => filters.specialty.includes(wep.specialty));
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((wep) => filters.rarity.includes(wep.rarity));
    }
    if (searchValue !== "") {
        weps = weps.filter(
            (wep) =>
                wep.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                wep.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }
    weps = weps.sort(
        (a, b) =>
            sortBy(a.release.version, b.release.version) ||
            sortBy(RarityMap[a.rarity], RarityMap[b.rarity]) ||
            sortBy(b.displayName, a.displayName)
    );

    return weps;
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
