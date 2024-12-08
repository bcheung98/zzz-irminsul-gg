import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
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
import {
    expertChallengeMaterialNames,
    formatExpertChallengeMaterials,
    formatNotoriousHuntMaterials,
    notoroiusHuntMaterialNames,
} from "data/materials/coreSkillMaterials";

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

    const filterGroups = [
        {
            name: "Attribute",
            value: filters.element,
            onChange: (_: React.BaseSyntheticEvent, newValues: Element[]) =>
                dispatch(setElement(newValues)),
            buttons: createButtons<Element>(elements, "elements"),
        },
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: React.BaseSyntheticEvent, newValues: Specialty[]) =>
                dispatch(setSpecialty(newValues)),
            buttons: createButtons<Specialty>(specialities, "specialties"),
        },
        {
            name: "Attack Type",
            value: filters.attackType,
            onChange: (_: React.BaseSyntheticEvent, newValues: AttackType[]) =>
                dispatch(setAttackType(newValues)),
            buttons: createButtons<AttackType>(
                attackTypes,
                "specialties/attack_types"
            ),
        },
        {
            name: "Rank",
            value: filters.rarity,
            onChange: (_: React.BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: createButtons<Rarity>(["S", "A"], "ranks/character"),
        },
        {
            name: "Faction",
            value: filters.faction,
            onChange: (_: React.BaseSyntheticEvent, newValues: Faction[]) =>
                dispatch(setFaction(newValues)),
            buttons: createButtons<Faction>(factions, "factions"),
        },
        {
            name: "Expert Challenge Material",
            value: filters.bossMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: ExpertChallengeMaterial[]
            ) => dispatch(setBossMat(newValues)),
            buttons: createButtons<ExpertChallengeMaterial>(
                expertChallengeMaterialNames,
                "materials/boss"
            ),
        },
        {
            name: "Notorious Hunt Material",
            value: filters.weeklyBossMat,
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: NotoriousHuntMaterial[]
            ) => dispatch(setWeeklyBossMat(newValues)),
            buttons: createButtons<NotoriousHuntMaterial>(
                notoroiusHuntMaterialNames,
                "materials/weekly"
            ),
        },
    ];

    return (
        <React.Fragment>
            <Toolbar>
                <FlexBox sx={{ flexGrow: 1 }}>
                    <Button
                        onClick={() => dispatch(clearFilters())}
                        disabled={!useAppSelector(activeCharacterFilters)}
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        sx={{
                            backgroundColor: theme.menu.selected,
                            color: theme.text.main,
                            height: "32px",
                            "&.Mui-disabled": {
                                backgroundColor: theme.menu.default,
                                opacity: 0.35,
                                color: theme.text.main,
                            },
                        }}
                    >
                        <TextStyled sx={{ textTransform: "none" }}>
                            Reset
                        </TextStyled>
                    </Button>
                </FlexBox>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "15px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? `rgb(30, 175, 255)`
                                : theme.text.main
                        }
                        contentPadding="5px 0px 5px 25px"
                    >
                        <ToggleButtons
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={0}
                        />
                    </Dropdown>
                ))}
            </List>
        </React.Fragment>
    );
}

export default CharacterFilters;

function createButtons<T>(items: readonly T[], url: string) {
    const ext = url.startsWith("materials/") ? "gif" : "png";
    const padding = url.startsWith("materials/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}`}
                ext={ext}
                alt={`${item}`}
                style={{ width: "32px", padding: padding, borderRadius: "5px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/boss")) {
        tooltip = `${formatExpertChallengeMaterials(
            item as ExpertChallengeMaterial
        )}`;
    } else if (url.startsWith("materials/weekly")) {
        tooltip = `${formatNotoriousHuntMaterials(
            item as NotoriousHuntMaterial
        )}`;
    } else if (url.startsWith("ranks")) {
        tooltip = "";
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
