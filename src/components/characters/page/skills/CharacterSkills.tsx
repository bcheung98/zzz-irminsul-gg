import React from "react";

// Component imports
import CharacterSkillTab from "./CharacterSkillTab";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useMediaQuery, useTheme } from "@mui/material";

// Helper imports
import { characterColors } from "helpers/characterColors";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import {
    CharacterColors,
    CharacterProps,
    CharacterSkillKey,
} from "types/character";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function CharacterSkills({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { skills, stats, colors, element } = character;

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const currentSkillDisplay = useAppSelector(selectSkillDisplay).mode;
    const [mode, setMode] = React.useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: React.BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const skillIcon = (index: number): React.CSSProperties => {
        const selected = index === tabValue;
        return {
            width: "48px",
            height: "48px",
            margin: "5px 0",
            borderWidth: selected ? "thick" : "3px",
            borderStyle: selected ? "double" : "solid",
            borderColor: getCharacterColor("accent"),
            borderRadius: "64px",
            boxShadow: selected
                ? `0 0 12px 4px ${getCharacterColor("accent")}`
                : "none",
            transition: "box-shadow 250ms",
        };
    };

    React.useEffect(() => {
        setMode(currentSkillDisplay);
    }, [currentSkillDisplay]);

    return (
        <MainContentBox
            title="Skills"
            actions={
                <ToggleButtons
                    color="secondary"
                    buttons={skillDisplayButtons}
                    value={mode}
                    exclusive
                    onChange={handleMode}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
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
                        backgroundColor: getCharacterColor("accent"),
                    },
                }}
            >
                {Object.keys(skills).map((key, index) => (
                    <StyledTab
                        key={key}
                        icon={
                            <React.Fragment>
                                <Image
                                    src={`skills/${getSkillImage(
                                        key as CharacterSkillKey
                                    )}`}
                                    alt={key}
                                    style={skillIcon(index)}
                                />
                            </React.Fragment>
                        }
                        sx={{ px: 0 }}
                    />
                ))}
            </StyledTabs>
            {Object.keys(skills).map((key, index) => (
                <TabPanel key={key} index={index} value={tabValue}>
                    <CharacterSkillTab
                        mode={mode}
                        skillKey={key as CharacterSkillKey}
                        skillData={skills[key as CharacterSkillKey]}
                        ascension={stats.ascension}
                        element={element}
                        colors={colors}
                    />
                </TabPanel>
            ))}
        </MainContentBox>
    );
}

export default CharacterSkills;

function getSkillImage(skill: CharacterSkillKey) {
    switch (skill) {
        case "basic":
            return "Basic";
        case "dodge":
            return "Dodge";
        case "assist":
            return "Assist";
        case "special":
            return "SpecialEX";
        case "chain":
            return "Ultimate";
        case "core":
            return "Core";
    }
}
