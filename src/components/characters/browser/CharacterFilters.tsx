import { BaseSyntheticEvent } from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectUnreleasedContent } from "reducers/settings";
import {
    activeCharacterFilters,
    clearFilters,
    selectCharacterFilters,
    setAttackType,
    setBossMat,
    setElement,
    setFaction,
    setRarity,
    setSpecialty,
    setWeeklyBossMat,
} from "reducers/characterFilters";
import { attackTypes, elements, factions, specialities } from "data/common";
import { formatMaterialName, getMaterialKeyNames } from "helpers/materials";
import {
    getExpertChallengeMaterial,
    getNotoriousHuntMaterial,
    expertChallengeMaterials,
    notoriousHuntMaterials,
} from "data/materials/characterCoreSkillMaterials";

// Type imports
import { AttackType, Element, Faction, Rarity, Specialty } from "types/_common";
import {
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    const showUnreleased = useAppSelector(selectUnreleasedContent);

    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons(elements, "elements"),
        },
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: BaseSyntheticEvent, newValues: Specialty[]) =>
                dispatch(setSpecialty(newValues)),
            buttons: createButtons(specialities, "specialties"),
        },
        {
            name: "Attack Type",
            value: filters.attackType,
            onChange: (_: BaseSyntheticEvent, newValues: AttackType[]) =>
                dispatch(setAttackType(newValues)),
            buttons: createButtons(attackTypes, "specialties/attack_types"),
        },
        {
            name: "Rank",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: createButtons(["S", "A"], "ranks/character"),
        },
        {
            name: "Faction",
            value: filters.faction,
            onChange: (_: BaseSyntheticEvent, newValues: Faction[]) =>
                dispatch(setFaction(newValues)),
            buttons: createButtons(factions, "factions"),
        },
        {
            name: "Expert Challenge Material",
            value: filters.bossMat,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: ExpertChallengeMaterial[]
            ) => dispatch(setBossMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames(
                    [...expertChallengeMaterials],
                    showUnreleased
                ),
                "materials/boss"
            ),
        },
        {
            name: "Notorious Hunt Material",
            value: filters.weeklyBossMat,
            onChange: (
                _: BaseSyntheticEvent,
                newValues: NotoriousHuntMaterial[]
            ) => dispatch(setWeeklyBossMat(newValues)),
            buttons: createButtons(
                getMaterialKeyNames(
                    [...notoriousHuntMaterials],
                    showUnreleased
                ),
                "materials/weekly"
            ),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeCharacterFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                    }}
                >
                    Reset
                </Button>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default CharacterFilters;

function createButtons<T extends string>(items: readonly T[], url: string) {
    const padding = url.startsWith("materials/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}${
                    url.startsWith("materials/") ? ".gif" : ""
                }`}
                alt={`${item}`}
                style={{ width: "32px", padding: padding, borderRadius: "4px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T extends string>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/boss")) {
        tooltip = `${formatMaterialName(
            getExpertChallengeMaterial({ tag: item })
        )}`;
    } else if (url.startsWith("materials/weekly")) {
        tooltip = `${formatMaterialName(
            getNotoriousHuntMaterial({ tag: item })
        )}`;
    } else if (url.startsWith("ranks")) {
        tooltip = "";
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
