import { BaseSyntheticEvent, CSSProperties, useEffect, useState } from "react";

// Component imports
import CharacterSkillTab from "./CharacterSkillTab";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { characterColors } from "helpers/characterColors";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import {
    CharacterColors,
    CharacterProps,
    CharacterSkillKey,
} from "types/character";
import { Specialty } from "types/_common";

function CharacterSkills({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { skills, stats, colors, element, specialty, materials } = character;

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const getCharacterColor = (option: keyof CharacterColors) =>
        characterColors(colors, option, element);

    const skillIcon = (index: number): CSSProperties => {
        const selected = index === tabValue;
        return {
            width: "48px",
            height: "48px",
            margin: "4px 0",
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

    useEffect(() => {
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
                            <Image
                                src={`skills/${getSkillImage(
                                    key as CharacterSkillKey,
                                    specialty
                                )}`}
                                alt={key}
                                style={skillIcon(index)}
                            />
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
                        specialty={specialty}
                        materials={materials}
                        colors={colors}
                    />
                </TabPanel>
            ))}
        </MainContentBox>
    );
}

export default CharacterSkills;

function getSkillImage(skill: CharacterSkillKey, specialty: Specialty) {
    switch (skill) {
        case "basic":
            return "Basic";
        case "dodge":
            return "Dodge";
        case "assist":
            return "Assist";
        case "special":
            return specialty === "Rupture" ? "SpecialEX2" : "SpecialEX";
        case "chain":
            return "Ultimate";
        case "core":
            return "Core";
    }
}
