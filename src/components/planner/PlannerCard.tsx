import { useState } from "react";

// Component imports
import CharacterSliders from "./CharacterSliders";
import WeaponSliders from "./WeaponSliders";
import MainContentBox from "custom/MainContentBox";
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import MaterialImage from "custom/MaterialImage";
import RouterLink from "components/nav/RouterLink";
import { FlexBox } from "styled/StyledBox";
import { TextStyled, Text } from "styled/StyledTypography";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    Divider,
    Box,
    Stack,
    IconButton,
    IconButtonProps,
    SvgIconProps,
    Dialog,
    Card,
    Button,
    ButtonProps,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    getHiddenItems,
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
    toggleHidden,
} from "reducers/planner";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";
import {
    createMaterialCostData,
    reduceMaterialCosts,
} from "helpers/createMaterialCostData";

// Type imports
import {
    CharacterCostObject,
    TotalCostObject,
    WeaponCost,
    WeaponCostObject,
} from "types/costs";
import { Element } from "types/_common";

export type CardMode = "view" | "edit";

interface PlannerCardProps {
    data: CharacterCostObject | WeaponCostObject;
}

function PlannerCard({ data }: PlannerCardProps) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const hiddenItems = useAppSelector(getHiddenItems);

    const [hidden, setHidden] = useState(hiddenItems.includes(data?.id ?? ""));
    const handleHiddenChange = () => {
        setHidden(!hidden);
        dispatch(toggleHidden(data.id));
    };

    const [mode, setMode] = useState<CardMode>("view");
    const handleModeChange = () => {
        if (mode === "view") {
            setMode("edit");
        } else {
            setMode("view");
        }
    };

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const { name, rarity, specialty } = data;

    let variant: "character" | "weapon";
    let title: string,
        element: Element | undefined,
        imgSrc: string,
        route: "agents" | "w-engines",
        costs: TotalCostObject | WeaponCost;

    if ("element" in data) {
        variant = "character";
        title = data.fullName;
        element = data.element;
        imgSrc = `characters/icons/${name}`;
        route = "agents";
        costs = reduceMaterialCosts(data.costs);
    } else {
        variant = "weapon";
        title = data.displayName;
        imgSrc = `w-engines/${name}`;
        route = "w-engines";
        costs = data.costs;
    }

    const handleDelete = () => {
        if (hidden) {
            dispatch(toggleHidden(data.id));
        }
        if (variant === "character") {
            const newValues = characters.filter((char) => char.name !== name);
            dispatch(setPlannerCharacters(newValues));
        } else {
            const newValues = weapons.filter((wep) => wep.name !== name);
            dispatch(setPlannerWeapons(newValues));
        }
    };

    const iconButtonProps: IconButtonProps = {
        disableRipple: true,
        sx: {
            p: { xs: "2px", sm: "4px" },
            color: theme.appbar.color,
            borderRadius: "4px",
            border: `1px solid ${theme.border.color.primary}`,
            backgroundColor: theme.appbar.hover,
            "&:hover": {
                backgroundColor: theme.appbar.selectedHover,
            },
        },
    };

    const iconProps: SvgIconProps = {
        fontSize: "small",
    };

    const buttonProps: ButtonProps = {
        disableRipple: true,
        variant: "contained",
        size: "small",
    };

    return (
        <>
            <MainContentBox
                title={
                    <FlexBox>
                        <RouterLink
                            to={`/${route}/${name
                                .split(" ")
                                .join("_")
                                .toLowerCase()}`}
                        >
                            <Image
                                src={imgSrc}
                                alt={name}
                                style={{
                                    width: "56px",
                                    border: `2px solid ${getRarityColor(
                                        rarity
                                    )}`,
                                    borderRadius: "8px",
                                    marginRight: "16px",
                                    padding:
                                        variant === "character" ? "0px" : "4px",
                                    backgroundColor:
                                        variant === "character"
                                            ? theme.background(2)
                                            : theme.background(2),
                                    boxShadow:
                                        variant === "character"
                                            ? "none"
                                            : `inset 0 0 28px 4px ${getBackgroundColor(
                                                  rarity
                                              )}`,
                                }}
                            />
                        </RouterLink>
                        <Stack spacing={0.25} sx={{ minHeight: "56px" }}>
                            <RouterLink
                                to={`/${route}/${name
                                    .split(" ")
                                    .join("_")
                                    .toLowerCase()}`}
                            >
                                <TextStyled
                                    variant="h6-styled"
                                    sx={{
                                        cursor: "pointer",
                                        color: "white",
                                        "&:hover": {
                                            color: theme.text.selected,
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {title}
                                </TextStyled>
                            </RouterLink>
                            <Stack direction="row" spacing={0.5}>
                                {element && (
                                    <Image
                                        src={`elements/${element}`}
                                        alt={element}
                                        style={{ width: "20px" }}
                                        tooltip={element}
                                    />
                                )}
                                <Image
                                    src={`specialties/${specialty}`}
                                    alt={specialty}
                                    style={{ width: "20px" }}
                                    tooltip={specialty}
                                />
                            </Stack>
                        </Stack>
                    </FlexBox>
                }
                actions={
                    <Stack direction="row" spacing={1} alignItems="center">
                        <StyledTooltip
                            title={mode !== "edit" ? "Edit" : "Done"}
                            arrow
                            placement="top"
                        >
                            <IconButton
                                onClick={handleModeChange}
                                {...iconButtonProps}
                            >
                                {mode !== "edit" ? (
                                    <EditIcon {...iconProps} />
                                ) : (
                                    <DoneIcon {...iconProps} />
                                )}
                            </IconButton>
                        </StyledTooltip>
                        <StyledTooltip title="Toggle" arrow placement="top">
                            <IconButton
                                onClick={handleHiddenChange}
                                {...iconButtonProps}
                            >
                                {hidden ? (
                                    <VisibilityIcon {...iconProps} />
                                ) : (
                                    <VisibilityOffIcon {...iconProps} />
                                )}
                            </IconButton>
                        </StyledTooltip>
                        <StyledTooltip title="Delete" arrow placement="top">
                            <IconButton
                                onClick={handleAlertOpen}
                                {...iconButtonProps}
                            >
                                <DeleteIcon {...iconProps} />
                            </IconButton>
                        </StyledTooltip>
                    </Stack>
                }
                contentProps={{ padding: "16px 24px" }}
            >
                <Box sx={{ opacity: hidden ? 0.5 : 1 }}>
                    <Box sx={{ mx: { xs: "0px", lg: "8px" } }}>
                        {"element" in data ? (
                            <CharacterSliders character={data} mode={mode} />
                        ) : (
                            <WeaponSliders weapon={data} mode={mode} />
                        )}
                    </Box>
                    <Divider sx={{ my: "16px" }} />
                    <Dropdown
                        title="Materials Required"
                        contentPadding="0px"
                        defaultOpen
                    >
                        <Grid container spacing={2} sx={{ mt: "16px" }}>
                            {createMaterialCostData(
                                costs as TotalCostObject
                            ).map((material, index) => (
                                <MaterialImage
                                    key={index}
                                    name={material.name}
                                    rarity={material.rarity}
                                    cost={material.cost}
                                    imgSrc={material.img}
                                    size="56px"
                                />
                            ))}
                        </Grid>
                    </Dropdown>
                </Box>
            </MainContentBox>
            <Dialog open={alertOpen} onClose={handleAlertClose}>
                <Card sx={{ p: 2 }}>
                    <Box sx={{ mb: 2 }}>
                        <TextStyled variant="h6" sx={{ mb: 1 }}>
                            Confirm Delete
                        </TextStyled>
                        <Text sx={{ color: theme.text.description }}>
                            {"Are you sure you want to delete "}
                            <span style={{ color: theme.text.value }}>
                                {title}
                            </span>
                            ?
                        </Text>
                    </Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent="right"
                    >
                        <Button {...buttonProps} onClick={handleAlertClose}>
                            Cancel
                        </Button>
                        <Button
                            {...buttonProps}
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Stack>
                </Card>
            </Dialog>
        </>
    );
}

export default PlannerCard;
