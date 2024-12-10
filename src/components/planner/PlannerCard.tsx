// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import Dropdown from "custom/Dropdown";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Box, Divider, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    getSelectedCharacters,
    getSelectedWeapons,
    setPlannerCharacters,
    setPlannerWeapons,
} from "reducers/planner";
import { getRarityColor } from "helpers/rarityColors";

// Type imports
import { CharacterCostObject, WeaponCostObject } from "types/costs";
import { Element } from "types/_common";

interface PlannerCardProps {
    data: CharacterCostObject | WeaponCostObject;
}

function PlannerCard({ data }: PlannerCardProps) {
    const dispatch = useAppDispatch();

    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const { name, rarity, specialty } = data;

    let variant: "character" | "weapon";
    let title: string, element: Element | undefined, mainImage: string;
    if ("element" in data) {
        variant = "character";
        title = data.fullName;
        element = data.element;
        mainImage = `characters/icons/${name}`;
    } else {
        variant = "weapon";
        title = data.displayName;
        mainImage = `w-engines/${name}`;
    }

    const handleDelete = () => {
        if (variant === "character") {
            const newValues = characters.filter((char) => char.name !== name);
            dispatch(setPlannerCharacters(newValues));
        } else {
            const newValues = weapons.filter((wep) => wep.name !== name);
            dispatch(setPlannerWeapons(newValues));
        }
    };

    return (
        <MainContentBox
            title={
                <FlexBox>
                    <Image
                        src={mainImage}
                        alt={name}
                        style={{
                            width: "56px",
                            border: `2px solid ${getRarityColor(rarity)}`,
                            borderRadius: "10px",
                            marginRight: "15px",
                        }}
                    />
                    <Stack spacing={1}>
                        <Box>{title}</Box>
                        <Stack direction="row" spacing={0.5}>
                            {element && (
                                <Image
                                    src={`elements/${element}`}
                                    alt={element}
                                    style={{ width: "24px" }}
                                    tooltip={element}
                                />
                            )}
                            <Image
                                src={`specialties/${specialty}`}
                                alt={specialty}
                                style={{ width: "24px" }}
                                tooltip={specialty}
                            />
                        </Stack>
                    </Stack>
                </FlexBox>
            }
            actions={
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            }
            titleLineHeight="100%"
            contentPadding="20px"
        >
            <TextStyled>Materials Required</TextStyled>
            <Divider sx={{ mt: "15px", mb: "10px" }} />
            <Dropdown title="Edit"></Dropdown>
        </MainContentBox>
    );
}

export default PlannerCard;
