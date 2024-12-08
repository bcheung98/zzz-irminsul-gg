import React from "react";

// Component imports
import Image from "custom/Image";
import DisplayCard from "custom/DisplayCard";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Select,
    SelectChangeEvent,
    IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { updates } from "data/versions";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { RarityMap } from "data/common";

function VersionHighlights() {
    const theme = useTheme();

    const [index, setIndex] = React.useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) setIndex(index + 1);
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) setIndex(index - 1);
    };

    const buttonStyle: SxProps = {
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.text.main,
        },
    };

    const version = updates[index].version;

    const characters = useAppSelector(selectCharacters);
    const weapons = useAppSelector(selectWeapons);

    const currentCharacters = characters
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) => RarityMap[b.rarity] - RarityMap[a.rarity] || a.id - b.id
        );
    const currentWeapons = weapons
        .filter((wep) => wep.release.version === version)
        .sort(
            (a, b) => RarityMap[b.rarity] - RarityMap[a.rarity] || a.id - b.id
        );

    return (
        <MainContentBox
            title="Version Highlights"
            actions={
                <FlexBox>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeLeft}
                            disabled={index >= updates.length - 1}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowLeftIcon />
                        </IconButton>
                    </Box>
                    <Select
                        value={index.toString()}
                        label="Version"
                        onChange={handleIndexChange}
                        input={<StyledInput />}
                        sx={{ width: "75px", mx: "5px" }}
                    >
                        {updates.map((version, index) => (
                            <StyledMenuItem key={index} value={index}>
                                <TextStyled>{version.version}</TextStyled>
                            </StyledMenuItem>
                        ))}
                    </Select>
                    <Box sx={{ width: "24px" }}>
                        <IconButton
                            onClick={handleIndexChangeRight}
                            disabled={index === 0}
                            sx={buttonStyle}
                            disableRipple
                        >
                            <KeyboardArrowRightIcon />
                        </IconButton>
                    </Box>
                </FlexBox>
            }
        >
            <TextStyled variant="h5" sx={{ mb: "20px" }}>
                {updates[index].version} - <i>{updates[index].name}</i>
            </TextStyled>
            <Grid container spacing={5}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FlexBox sx={{ mb: "20px" }}>
                        <Image
                            src="icons/Characters"
                            alt="New Agents"
                            style={{ width: "32px", marginRight: "10px" }}
                        />
                        <TextStyled variant="h6">New Agents</TextStyled>
                    </FlexBox>
                    <Grid container spacing={2}>
                        {currentCharacters.map((char, index) => (
                            <DisplayCard
                                key={index}
                                id={`${char.name}-versionHighlights`}
                                name={char.name}
                                displayName={char.fullName}
                                type="character"
                                rarity={char.rarity}
                                info={{
                                    element: char.element,
                                    specialty: char.specialty,
                                }}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FlexBox sx={{ mb: "20px" }}>
                        <Image
                            src="icons/W-Engine"
                            alt="New W-Engines"
                            style={{ width: "32px", marginRight: "10px" }}
                        />
                        <TextStyled variant="h6">New W-Engines</TextStyled>
                    </FlexBox>
                    <Grid container spacing={2}>
                        {currentWeapons.map((weapon, index) => (
                            <DisplayCard
                                key={index}
                                id={`${weapon.name}-versionHighlights`}
                                name={weapon.name}
                                displayName={weapon.displayName}
                                type="weapon"
                                rarity={weapon.rarity}
                                info={{
                                    specialty: weapon.specialty,
                                }}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </MainContentBox>
    );
}

export default VersionHighlights;
