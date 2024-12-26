import React from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import MaterialImage from "custom/MaterialImage";
import LevelUpSliderContainer from "custom/LevelUpSliderContainer";
import { StyledSlider } from "styled/StyledSlider";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { range } from "helpers/utils";
import { characterColors } from "helpers/characterColors";
import {
    getCharacterCoreSkillCost,
    getCharacterSkillCost,
} from "helpers/getLevelUpCosts";
import { createMaterialCostData } from "helpers/createMaterialCostData";

// Type imports
import { CharacterColors } from "types/character";
import {
    CharacterSkillMaterial,
    ExpertChallengeMaterial,
    NotoriousHuntMaterial,
} from "types/materials";
import { TotalCostObject } from "types/costs";
import { CharacterSkillLevelUpProps } from "./CharacterSkillTab";

const threshold = "@500";

function CharacterSkillLevelUpCost({
    skillKey,
    element,
    colors,
    materials,
}: CharacterSkillLevelUpProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const levels =
        skillKey !== "core"
            ? range(1, 12)
            : ["0", "A", "B", "C", "D", "E", "F"];

    const minDistance = 1;
    const maxValue = levels.length;
    const [sliderValue, setSliderValue] = React.useState([1, maxValue]);
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
                setSliderValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance + 1);
                setSliderValue([clamped - minDistance, clamped]);
            }
        } else {
            setSliderValue(newValue);
        }
    };

    const marks = levels.map((level, index) => ({
        value: index + 1,
        label: (
            <TextStyled
                variant={
                    sliderValue.includes(index + 1)
                        ? "body1-styled"
                        : "body2-styled"
                }
                sx={{
                    userSelect: "none",
                    opacity: sliderValue.includes(index + 1)
                        ? { "@": 0, [threshold]: 1 }
                        : { "@": 0, [threshold]: 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    let levelUpCost, costs;
    if (skillKey !== "core") {
        levelUpCost = getCharacterSkillCost(sliderValue, true);
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
    } else {
        levelUpCost = getCharacterCoreSkillCost(sliderValue, true);
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
    }

    return (
        <Dropdown
            title="Level Up Cost"
            iconColor={getCharacterColor("accent")}
            contentPadding="16px 24px"
        >
            <Box
                sx={{
                    containerName: "level-slider",
                    containerType: "inline-size",
                }}
            >
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
                    values={[
                        levels[sliderValue[0] - 1],
                        levels[sliderValue[1] - 1],
                    ]}
                    threshold={threshold}
                >
                    <StyledSlider
                        value={sliderValue}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches_sm_dn ? "small" : "medium"}
                        sx={{ color: getCharacterColor("accent") }}
                    />
                </LevelUpSliderContainer>
            </Box>
        </Dropdown>
    );
}

export default CharacterSkillLevelUpCost;
