import React from "react";

// Component imports
import MaterialImage from "custom/MaterialImage";
import LevelUpSliderContainer from "custom/LevelUpSliderContainer";
import { TextStyled } from "styled/StyledTypography";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { characterColors } from "helpers/characterColors";
import {
    getCharacterCoreSkillCost,
    getCharacterLevelCost,
    getCharacterSkillCost,
    getWeaponLevelCost,
} from "helpers/getLevelUpCosts";
import { CostObjectSourceIndex } from "reducers/planner";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { Element, Rarity, Specialty } from "types/_common";
import { CharacterColors } from "types/character";
import { TotalCostObject } from "types/costs";
import {
    CharacterAscensionMaterial,
    CharacterMaterials,
    CharacterSkillMaterial,
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
    WeaponAscensionMaterial,
} from "types/materials";

interface LevelUpCostsProps {
    type: "character" | "weapon" | "bangboo";
    skillKey: keyof typeof CostObjectSourceIndex;
    rarity?: Exclude<Rarity, "C">;
    element?: Element;
    specialty?: Specialty;
    mats?: CharacterMaterials;
    colors?: CharacterColors;
    threshold?: string;
}

function LevelUpCosts({
    type,
    skillKey,
    rarity = "B",
    element,
    specialty,
    mats,
    colors,
    threshold = "@100",
}: LevelUpCostsProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const color =
        element && colors
            ? characterColors(colors, "accent", element)
            : undefined;

    const levels = getLevels(skillKey);
    const minDistance = 1;
    const maxValue = levels.length;
    const [values, setValues] = React.useState([1, maxValue]);
    const handleSliderChange = (
        _: Event,
        newValue: number | number[],
        activeThumb: number
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], maxValue - minDistance);
                setValues([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setValues([clamped - minDistance, clamped]);
            }
        } else {
            setValues(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    values.includes(index + 1) ? "body1-styled" : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: values.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    const costs = getCosts({
        type,
        skillKey,
        rarity,
        values,
        element,
        specialty,
        mats,
    });

    return (
        <Box sx={{ containerType: "inline-size" }}>
            <Grid container spacing={2} sx={{ mb: "16px" }}>
                {createMaterialCostData(costs).map((material, index) => (
                    <MaterialImage
                        key={index}
                        name={material.name}
                        rarity={material.rarity}
                        cost={material.cost}
                        imgSrc={material.img}
                        size="64px"
                    />
                ))}
            </Grid>
            <LevelUpSliderContainer
                values={[levels[values[0] - 1], levels[values[1] - 1]]}
                threshold={threshold}
            >
                <StyledSlider
                    value={values}
                    marks={marks}
                    min={1}
                    max={maxValue}
                    onChange={handleSliderChange}
                    disableSwap
                    size={matches_sm_dn ? "small" : "medium"}
                    sx={{ color: color }}
                />
            </LevelUpSliderContainer>
        </Box>
    );
}

export default LevelUpCosts;

function getLevels(skillKey: LevelUpCostsProps["skillKey"]) {
    switch (skillKey) {
        case "level":
            return ["10", "20", "30", "40", "50", "60"];
        case "basic":
        case "dodge":
        case "assist":
        case "special":
        case "chain":
            return range(1, 12);
        case "core":
            return ["0", "A", "B", "C", "D", "E", "F"];
    }
}

function getCosts({
    type,
    skillKey,
    rarity,
    values,
    element,
    specialty,
    mats,
}: {
    type: "character" | "weapon" | "bangboo";
    skillKey: LevelUpCostsProps["skillKey"];
    rarity: Exclude<Rarity, "C">;
    values: number[];
    element?: Element;
    specialty?: Specialty;
    mats?: CharacterMaterials;
}) {
    let costs, levelUpCost;
    switch (skillKey) {
        case "level":
            // TODO: Add bangboo level-up costs
            if (type === "character") {
                levelUpCost = getCharacterLevelCost(values, true, false);
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    characterAscension: {
                        [`${specialty}1` as CharacterAscensionMaterial]:
                            levelUpCost.characterAscension.characterAscension1,
                        [`${specialty}2` as CharacterAscensionMaterial]:
                            levelUpCost.characterAscension.characterAscension2,
                        [`${specialty}3` as CharacterAscensionMaterial]:
                            levelUpCost.characterAscension.characterAscension3,
                    },
                } as TotalCostObject;
            } else {
                levelUpCost = getWeaponLevelCost(rarity, values, true, false);
                costs = {
                    credits: {
                        Credit: levelUpCost.credits.Credit,
                    },
                    weaponAscension: {
                        [`${specialty}1` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscension.weaponAscension1,
                        [`${specialty}2` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscension.weaponAscension2,
                        [`${specialty}3` as WeaponAscensionMaterial]:
                            levelUpCost.weaponAscension.weaponAscension3,
                    },
                } as TotalCostObject;
            }
            break;
        case "basic":
        case "dodge":
        case "assist":
        case "special":
        case "chain":
            levelUpCost = getCharacterSkillCost(values, true);
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                characterSkill: {
                    [`${element}1` as CharacterSkillMaterial]:
                        levelUpCost.characterSkill.characterSkill1,
                    [`${element}2` as CharacterSkillMaterial]:
                        levelUpCost.characterSkill.characterSkill2,
                    [`${element}3` as CharacterSkillMaterial]:
                        levelUpCost.characterSkill.characterSkill3,
                },
                hamsterCagePass: {
                    "Hamster Cage Pass":
                        levelUpCost.hamsterCagePass["Hamster Cage Pass"],
                },
            } as TotalCostObject;
            break;
        case "core":
            let materials = mats as CharacterMaterials;
            levelUpCost = getCharacterCoreSkillCost(values, true);
            costs = {
                credits: {
                    Credit: levelUpCost.credits.Credit,
                },
                bossMat: {
                    [`${materials.bossMat}` as ExpertChallengeMaterial]:
                        levelUpCost.bossMat.bossMat,
                },
                weeklyBossMat: {
                    [`${materials.weeklyBossMat}` as NotoriousHuntMaterial]:
                        levelUpCost.weeklyBossMat.weeklyBossMat,
                },
            } as TotalCostObject;
            break;
    }
    return costs;
}
