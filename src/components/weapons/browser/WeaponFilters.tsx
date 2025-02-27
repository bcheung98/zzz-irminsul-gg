import { BaseSyntheticEvent } from "react";

// Component imports
import BrowserSort from "custom/BrowserSort";
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    activeWeaponFilters,
    clearFilters,
    selectWeaponFilters,
    setRarity,
    setSpecialty,
    setSubstat,
} from "reducers/weaponFilters";
import { specialities } from "data/common";
import { subStats, WeaponSubStat } from "data/weaponStats";

// Type imports
import { Rarity, Specialty } from "types/_common";

function WeaponFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectWeaponFilters);
    const dispatch = useAppDispatch();

    const filterGroups = [
        {
            name: "Specialty",
            value: filters.specialty,
            onChange: (_: BaseSyntheticEvent, newValues: Specialty[]) =>
                dispatch(setSpecialty(newValues)),
            buttons: createButtons(specialities, "specialties"),
        },
        {
            name: "Rank",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: createButtons(["S", "A", "B"], "ranks/item"),
        },
        {
            name: "Advanced Stat",
            value: filters.substats,
            onChange: (_: BaseSyntheticEvent, newValues: WeaponSubStat[]) =>
                dispatch(setSubstat(newValues)),
            buttons: createButtons(objectKeys(subStats), "stat_icons"),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeWeaponFilters)}
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
                        border: `1px solid ${theme.border.color.primary}`,
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
            <BrowserSort
                type="weapons"
                options={["release", "name", "rarity", "specialty"]}
            />
        </>
    );
}

export default WeaponFilters;

function createButtons<T extends string>(items: readonly T[], url: string) {
    const padding = url.startsWith("ranks/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: padding, borderRadius: "4px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T extends string>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("ranks")) {
        tooltip = "";
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
