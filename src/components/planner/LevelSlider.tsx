import { useEffect, useState } from "react";

// Component imports
import Image from "custom/Image";
import { StyledSlider } from "styled/StyledSlider";
import { StyledSwitch } from "styled/StyledSwitch";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppDispatch } from "helpers/hooks";
import { updateCharacterCosts, updateWeaponCosts } from "reducers/planner";

// Type imports
import { CostSliderData, UpdateCostsPayload } from "types/costs";
import { CardMode } from "./PlannerCard";
import { Rarity } from "types/_common";

interface LevelSliderProps {
    mode: CardMode;
    name: string;
    variant: "character" | "weapon";
    title: string;
    icon?: string;
    levels: (string | number)[];
    values: CostSliderData;
    rarity?: Rarity;
    type: UpdateCostsPayload["type"];
    color?: string;
}

const threshold = "@350";

function LevelSlider({
    mode,
    name,
    variant,
    title,
    icon,
    levels,
    values,
    rarity = "B",
    type,
    color,
}: LevelSliderProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState(values.selected ?? true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const minDistance = 1;
    const maxValue = levels.length;
    const [sliderValue, setSliderValue] = useState([
        values.start ?? 1,
        values.stop ?? maxValue,
    ]);
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
                variant={sliderValue.includes(index + 1) ? "body1" : "body2"}
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

    useEffect(() => {
        if (variant === "character") {
            dispatch(
                updateCharacterCosts({
                    name: name,
                    type: type,
                    data: {
                        start: sliderValue[0],
                        stop: sliderValue[1],
                        selected: selected,
                    },
                })
            );
        } else {
            dispatch(
                updateWeaponCosts({
                    name: name,
                    type: "level",
                    data: {
                        start: sliderValue[0],
                        stop: sliderValue[1],
                        selected: selected,
                        rarity: rarity,
                    },
                })
            );
        }
    }, [sliderValue, selected]);

    return (
        <Box
            sx={{
                containerName: "level-slider",
                containerType: "inline-size",
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: "4px" }}
            >
                {variant === "character" && (
                    <StyledSwitch
                        checked={selected}
                        onChange={handleSelect}
                        size="small"
                        switchColor={color}
                        sx={{ display: mode === "edit" ? "flex" : "none" }}
                    />
                )}
                {icon && (
                    <Image
                        src={icon}
                        alt={title}
                        style={{
                            opacity: selected ? 1 : 0.35,
                            width: matches_sm_dn ? "32px" : "40px",
                            height: matches_sm_dn ? "32px" : "40px",
                            borderRadius: "64px",
                            border: "1px solid black",
                            // border: `3px solid ${color}`,
                        }}
                        tooltip={mode === "view" ? title : ""}
                    />
                )}
                {mode === "edit" ? (
                    <TextStyled sx={{ opacity: selected ? 1 : 0.35 }}>
                        {title}
                    </TextStyled>
                ) : (
                    <TextStyled
                        sx={{
                            opacity: selected ? 1 : 0.35,
                            textTransform: "capitalize",
                        }}
                    >
                        {type === "level" && `Level: `}
                        {selected
                            ? `${levels[sliderValue[0] - 1]} → ${
                                  levels[sliderValue[1] - 1]
                              }`
                            : "---"}
                    </TextStyled>
                )}
            </Stack>
            <Grid
                container
                columnSpacing={3.5}
                sx={{
                    display: mode === "edit" ? "flex" : "none",
                    opacity: selected ? 1 : 0.35,
                    px: {
                        "@": matches_sm_dn ? "16px" : "0px",
                        [threshold]: "16px",
                    },
                    alignItems: "center",
                }}
            >
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [threshold]: "none" },
                        mb: "24px",
                    }}
                >
                    <TextStyled>{levels[sliderValue[0] - 1]}</TextStyled>
                </Grid>
                <Grid size="grow">
                    <StyledSlider
                        disabled={!selected}
                        value={sliderValue}
                        marks={marks}
                        min={1}
                        max={maxValue}
                        onChange={handleSliderChange}
                        disableSwap
                        size={matches_sm_dn ? "small" : "medium"}
                        sx={{ color: color }}
                    />
                </Grid>
                <Grid
                    size={1}
                    sx={{
                        display: { "@": "flex", [threshold]: "none" },
                        mb: "24px",
                    }}
                >
                    <TextStyled>{levels[sliderValue[1] - 1]}</TextStyled>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LevelSlider;
