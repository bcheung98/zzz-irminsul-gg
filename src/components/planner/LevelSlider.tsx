import React from "react";

// Component imports
import Image from "custom/Image";
import { StyledSlider } from "styled/StyledSlider";
import { StyledSwitch } from "styled/StyledSwitch";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack } from "@mui/material";
import { UpdateCostsPayload } from "types/costs";

// Helper imports
import { useAppDispatch } from "helpers/hooks";
import { updateCharacterCosts, updateWeaponCosts } from "reducers/planner";

// Type imports
import { Weapon } from "types/weapon";

interface LevelSliderProps {
    name: string;
    variant: "character" | "weapon";
    title: string;
    icon?: string;
    levels: (string | number)[];
    rarity?: Weapon["rarity"];
    dispatchProps: {
        type: UpdateCostsPayload["type"];
        getCost: Function;
    };
    color?: string;
}

function LevelSlider({
    name,
    variant,
    title,
    icon,
    levels,
    rarity = "B",
    dispatchProps,
    color,
}: LevelSliderProps) {
    const theme = useTheme();
    const matches_md_sm = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useAppDispatch();

    const [selected, setSelected] = React.useState(true);
    const handleSelect = () => {
        setSelected(!selected);
    };

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
                variant={sliderValue.includes(index + 1) ? "body1" : "body2"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue.includes(index + 1)
                        ? 1
                        : { "@": 0, "@325": 0.25 },
                }}
            >
                {level}
            </TextStyled>
        ),
    }));

    React.useEffect(() => {
        if (variant === "character") {
            dispatch(
                updateCharacterCosts({
                    name: name,
                    type: dispatchProps.type,
                    costs: dispatchProps.getCost(sliderValue, selected),
                })
            );
        } else {
            dispatch(
                updateWeaponCosts({
                    name: name,
                    type: "level",
                    costs: dispatchProps.getCost(rarity, sliderValue, selected),
                })
            );
        }
    }, [sliderValue, selected]);

    return (
        <Box sx={{ containerType: "inline-size" }}>
            <Stack direction="row" spacing={1} alignItems="center">
                {variant === "character" && (
                    <StyledSwitch
                        checked={selected}
                        onChange={handleSelect}
                        size="small"
                        switchColor={color}
                    />
                )}
                {icon && (
                    <Image
                        src={icon}
                        alt={title}
                        style={{
                            opacity: selected ? 1 : 0.35,
                            width: matches_md_sm ? "32px" : "40px",
                            height: matches_md_sm ? "32px" : "40px",
                            // border: `3px solid ${color}`,
                            // borderRadius: "64px",
                        }}
                    />
                )}
                <TextStyled sx={{ opacity: selected ? 1 : 0.35 }}>
                    {title}
                </TextStyled>
            </Stack>
            <Box
                sx={{
                    px: "25px",
                    mt: "10px",
                    opacity: selected ? 1 : 0.35,
                }}
            >
                <StyledSlider
                    disabled={!selected}
                    value={sliderValue}
                    marks={marks}
                    min={1}
                    max={maxValue}
                    onChange={handleSliderChange}
                    disableSwap
                    size={matches_md_sm ? "small" : "medium"}
                    sx={{ color: color }}
                />
            </Box>
        </Box>
    );
}

export default LevelSlider;
