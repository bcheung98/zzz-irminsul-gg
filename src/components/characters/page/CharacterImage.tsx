import { BaseSyntheticEvent, useState } from "react";
import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import { FlexBox } from "styled/StyledBox";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Card,
    Button,
    Dialog,
    Box,
    IconButton,
    Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Type imports
import { CharacterProps } from "types/character";

function CharacterImage({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { outfits } = character;

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const handleTabChangeLeft = () => {
        if (tabValue - 1 >= 0) {
            setTabValue(tabValue - 1);
        } else {
            setTabValue(outfits.length - 1);
        }
    };
    const handleTabChangeRight = () => {
        if (tabValue + 1 < outfits.length) {
            setTabValue(tabValue + 1);
        } else {
            setTabValue(0);
        }
    };

    const buttonStyle: SxProps = {
        display: outfits.length > 1 ? "flex" : "none",
        color: theme.text.primary,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.text.primary,
        },
    };

    const imgSrcSplash =
        tabValue === 0
            ? `characters/portraits/${character.name}`
            : `characters/outfits/splash/${outfits[tabValue].name}`;

    return (
        <>
            <Card
                sx={{
                    backgroundColor: theme.background(1),
                    width: "100%",
                    height: "auto",
                }}
            >
                <Image
                    src={imgSrcSplash}
                    alt={character.name}
                    style={{
                        width: "100%",
                        height: "600px",
                        objectFit: "cover",
                        overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                        borderBottom: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.background(2),
                    }}
                />
                <FlexBox
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        p: "4px 8px 8px",
                        height: "48px",
                    }}
                >
                    <IconButton
                        onClick={handleTabChangeLeft}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogOpen}
                        disableRipple
                    >
                        View Outfits
                    </Button>
                    <IconButton
                        onClick={handleTabChangeRight}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </FlexBox>
            </Card>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="lg"
                fullWidth
                keepMounted
            >
                <Box sx={{ overflowY: "auto", scrollbarWidth: "none" }}>
                    <MainContentBox
                        title="Outfits"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleDialogClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        contentProps={{ padding: 0 }}
                    >
                        <StyledTabs
                            variant="scrollable"
                            value={tabValue}
                            onChange={handleTabChange}
                            scrollButtons="auto"
                            allowScrollButtonsMobile={!matches_sm_up}
                            sx={{
                                height: "100%",
                                "& .MuiTabScrollButton-root": {
                                    color: theme.text.primary,
                                    backgroundColor: theme.background(2),
                                },
                                ".MuiTabs-scrollButtons.Mui-disabled": {
                                    opacity: 0.3,
                                },
                                "& .MuiTabs-indicatorSpan": {
                                    width: "100%",
                                    backgroundColor: theme.border.color.primary,
                                },
                            }}
                        >
                            {outfits.map((outfit, index) => (
                                <StyledTab
                                    key={outfit.name}
                                    icon={
                                        <Image
                                            src={
                                                index === 0
                                                    ? `characters/icons/${character.name}`
                                                    : `characters/outfits/icon/${outfit.name}`
                                            }
                                            alt={outfit.name}
                                            style={{
                                                width: matches_sm_up
                                                    ? "72px"
                                                    : "64px",
                                                border: `2px solid ${theme.border.color.primary}`,
                                                borderRadius: "4px",
                                                backgroundColor:
                                                    theme.appbar
                                                        .backgroundColor,
                                                backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${outfit.rarity}_Star.png)`,
                                                backgroundSize: "contain",
                                            }}
                                        />
                                    }
                                />
                            ))}
                        </StyledTabs>
                        {outfits.map((outfit, index) => (
                            <TabPanel
                                key={outfit.name}
                                index={index}
                                value={tabValue}
                            >
                                <Box>
                                    <TextStyled
                                        variant="h6-styled"
                                        gutterBottom
                                    >
                                        {outfit.name !== ""
                                            ? outfit.displayName || outfit.name
                                            : character.fullName}
                                    </TextStyled>
                                    <Text
                                        sx={{
                                            color: theme.text.description,
                                        }}
                                    >
                                        {parse(outfit.description)}
                                    </Text>
                                </Box>
                                <Fade in={index === tabValue} timeout={500}>
                                    <Card
                                        elevation={0}
                                        sx={{ minHeight: "600px" }}
                                    >
                                        <Image
                                            src={imgSrcSplash}
                                            alt={outfit.name}
                                            style={{
                                                width: "100%",
                                                minHeight: "600px",
                                                objectFit: "cover",
                                                overflowClipMargin: "unset",
                                            }}
                                        />
                                    </Card>
                                </Fade>
                            </TabPanel>
                        ))}
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default CharacterImage;
