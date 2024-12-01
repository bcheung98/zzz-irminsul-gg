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
import { attackTypes, elements, factions, specialities } from "data/common";
import {
    activeCharacterFilters,
    clearFilters,
    selectCharacterFilters,
    setAttackType,
    setElement,
    setFaction,
    setRarity,
    setSpecialty,
} from "reducers/characterFilters";

// Type imports
import { AttackType, Element, Faction, Rarity, Specialty } from "types/_common";

function CharacterFilters({
    handleClose,
}: {
    handleClose: (arg0: any) => void;
}) {
    const theme = useTheme();

    const filters = useAppSelector(selectCharacterFilters);
    const dispatch = useAppDispatch();

    const createButtons = <T,>(items: readonly T[], url: string) => {
        return items.map((item) => ({
            value: item,
            icon: (
                <Image
                    src={`${url}/${item}`}
                    alt={`${item}`}
                    style={{ width: "32px", padding: "2px" }}
                    tooltip={`${item}`}
                />
            ),
        }));
    };

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
                    >
                        <ToggleButtons
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                        />
                    </Dropdown>
                ))}
            </List>
        </React.Fragment>
    );
}

export default CharacterFilters;
