import { BaseSyntheticEvent, useState } from "react";
import parse, {
    HTMLReactParserOptions,
    Element,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Box,
    Button,
    Dialog,
    IconButton,
    Card,
    Fade,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { objectKeys, range } from "helpers/utils";
import { characterColors } from "helpers/characterColors";

// Type imports
import { CharacterColors, CharacterProps } from "types/character";

function CharacterCinema({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, element, cinema, colors } = character;

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const [openMCArt, setOpenMCArt] = useState(false);
    const handleClickOpenMCArt = () => {
        setOpenMCArt(true);
    };
    const handleCloseMCArt = () => {
        setOpenMCArt(false);
    };

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const labelStyle = (index: number): SxProps => {
        const selected = index === tabValue;
        return {
            textTransform: "none",
            color: selected ? getCharacterColor("accent") : theme.text.primary,
        };
    };

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            style={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                }
            }
        },
    };

    return (
        <>
            <MainContentBox
                title="Mindscape Cinema"
                actions={
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleClickOpenMCArt}
                        sx={{
                            border: `1px solid ${theme.border.color.primary}`,
                        }}
                    >
                        View Art
                    </Button>
                }
            >
                <Grid container spacing={3}>
                    {objectKeys(cinema).map((key, index) => (
                        <Grid
                            key={key}
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                p: 2,
                                backgroundColor: theme.background(1, "light"),
                                border: theme.mainContentBox.border,
                                borderRadius: theme.mainContentBox.borderRadius,
                            }}
                        >
                            <TextStyled variant="h6-styled" sx={{ mb: "4px" }}>
                                {`${index + 1}. ${cinema[key].name}`}
                            </TextStyled>
                            <Text sx={{ color: theme.text.description }}>
                                {parse(cinema[key].description, options)}
                            </Text>
                        </Grid>
                    ))}
                </Grid>
            </MainContentBox>
            <Dialog
                open={openMCArt}
                onClose={handleCloseMCArt}
                maxWidth="xl"
                fullWidth
            >
                <Box sx={{ overflowY: "auto", scrollbarWidth: "none" }}>
                    <MainContentBox
                        title="Mindscape"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleCloseMCArt}
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
                                "& .MuiTabScrollButton-root": {
                                    color: theme.text.primary,
                                    backgroundColor: theme.background(2),
                                },
                                ".MuiTabs-scrollButtons.Mui-disabled": {
                                    opacity: 0.3,
                                },
                                "& .MuiTabs-indicatorSpan": {
                                    width: "100%",
                                    backgroundColor:
                                        getCharacterColor("accent"),
                                },
                            }}
                        >
                            {range(0, 2).map((i) => (
                                <StyledTab
                                    key={i}
                                    label={
                                        <TextStyled sx={labelStyle(i)}>
                                            Lv. {i + 1}
                                        </TextStyled>
                                    }
                                />
                            ))}
                        </StyledTabs>
                        {range(0, 2).map((i) => (
                            <TabPanel
                                key={i}
                                index={i}
                                value={tabValue}
                                padding={0}
                            >
                                <Fade in={i === tabValue} timeout={500}>
                                    <Card
                                        elevation={0}
                                        sx={{
                                            minHeight: { lg: "800px" },
                                            borderRadius: "0px",
                                            background: `linear-gradient(rgb(230, 230, 230), ${theme.background(
                                                2
                                            )})`,
                                        }}
                                    >
                                        <Image
                                            src={`characters/mindscapes/${name}_${
                                                i + 1
                                            }`}
                                            alt={`${name}_${i + 1}`}
                                            style={{
                                                width: "100%",
                                                objectFit: "contain",
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

export default CharacterCinema;
