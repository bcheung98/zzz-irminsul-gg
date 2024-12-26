import React from "react";

// Component imports
import Image from "custom/Image";
import InfoCard from "custom/InfoCard";
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
import { RarityMap } from "data/common";
import { updates } from "data/versions";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectDriveDiscs } from "reducers/driveDiscs";
import { selectBangboos } from "reducers/bangboo";

function VersionHighlights() {
    const theme = useTheme();

    const [index, setIndex] = React.useState(0);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index + 1 < updates.length) {
            setIndex(index + 1);
        }
    };
    const handleIndexChangeRight = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        }
    };

    const buttonStyle: SxProps = {
        color: theme.appbar.color,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.appbar.color,
        },
    };

    const gridStyle: SxProps = {
        maxHeight: "720px", 
        overflowY: "auto", 
    };

    const iconStyle: React.CSSProperties = {
        width: "32px",
        marginRight: "8px",
        backgroundColor: theme.icon.backgroundColor,
        borderRadius: "64px",
    }

    const version = updates[index].version;

    const characters = useAppSelector(selectCharacters)
        .filter((char) => char.release.version === version)
        .sort(
            (a, b) =>
                RarityMap[b.rarity] - RarityMap[a.rarity] ||
                a.fullName.localeCompare(b.fullName)
        );
    const weapons = useAppSelector(selectWeapons)
        .filter((wep) => wep.release.version === version)
        .sort(
            (a, b) =>
                RarityMap[b.rarity] - RarityMap[a.rarity] ||
                a.displayName.localeCompare(b.displayName)
        );
    const driveDiscs = useAppSelector(selectDriveDiscs)
        .filter((disc) => disc.release.version === version)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
    const bangboos = useAppSelector(selectBangboos)
        .filter((bangboo) => bangboo.release.version === version)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));

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
                        sx={{ mx: "4px" }}
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
            <Grid container spacing={4}>
                {characters.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Characters"
                                alt="New Agents"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6">New Agents</TextStyled>
                        </FlexBox>
                        <Grid container spacing={2}>
                            {characters.map((char, index) => (
                                <InfoCard
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
                )}
                {weapons.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/W-Engine"
                                alt="New W-Engines"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6">New W-Engines</TextStyled>
                        </FlexBox>
                        <Grid container spacing={2}>
                            {weapons.map((weapon, index) => (
                                <InfoCard
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
                )}
                {driveDiscs.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Drive_Disc"
                                alt="New Drive Discs"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6">
                                New Drive Discs
                            </TextStyled>
                        </FlexBox>
                        <Grid container spacing={2}>
                            {driveDiscs.map((disc, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${disc.name}-versionHighlights`}
                                    name={disc.name}
                                    displayName={disc.displayName}
                                    type="drivedisc"
                                    rarity={disc.rarity}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
                {bangboos.length > 0 && (
                    <Grid size={{ xs: 12, lg: 6 }} sx={gridStyle}>
                        <FlexBox sx={{ mb: "20px" }}>
                            <Image
                                src="icons/Bangboo"
                                alt="New Bangboos"
                                style={iconStyle}
                            />
                            <TextStyled variant="h6">New Bangboos</TextStyled>
                        </FlexBox>
                        <Grid container spacing={2}>
                            {bangboos.map((bangboo, index) => (
                                <InfoCard
                                    key={index}
                                    id={`${bangboo.name}-bangbooBrowser`}
                                    name={bangboo.name}
                                    displayName={bangboo.displayName}
                                    info={{
                                        element: bangboo.element || undefined,
                                    }}
                                    type="bangboo"
                                    rarity={bangboo.rarity}
                                />
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </MainContentBox>
    );
}

export default VersionHighlights;
