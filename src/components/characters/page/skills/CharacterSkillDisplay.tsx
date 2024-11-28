import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useMediaQuery, useTheme } from "@mui/material";

// Type imports
import { CharacterProps, CharacterSkillKey } from "types/character";
import CharacterSkillTab from "./CharacterSkillTab";

function CharacterSkillDisplay({ character }: CharacterProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { skills } = character;

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const skillIcon = (index: number): React.CSSProperties => {
        const selected = index === tabValue;
        return {
            width: "48px",
            height: "48px",
            padding: "2px",
            margin: "5px auto 5px auto",
            borderRadius: "64px",
            filter: selected ? "drop-shadow(0 0 8px white)" : "none",
            transition: "filter 250ms",
        };
    };

    return (
        <MainContentBox title="Skills" contentPadding={0}>
            <StyledTabs
                variant="scrollable"
                value={tabValue}
                onChange={handleTabChange}
                scrollButtons="auto"
                allowScrollButtonsMobile={!matches_sm_up}
                sx={{
                    height: "100%",
                    "& .MuiTabScrollButton-root": {
                        color: theme.text.main,
                        backgroundColor: theme.background(7),
                    },
                    ".MuiTabs-scrollButtons.Mui-disabled": {
                        opacity: 0.3,
                    },
                    "& .MuiTabs-indicatorSpan": {
                        width: "100%",
                    },
                }}
            >
                {Object.keys(skills).map((key, index) => (
                    <StyledTab
                        key={key}
                        label={
                            <Image
                                src={`skills/${getSkillImage(
                                    key as CharacterSkillKey
                                )}`}
                                alt={key}
                                style={skillIcon(index)}
                            />
                        }
                    />
                ))}
            </StyledTabs>
            {Object.keys(skills).map((key, index) => (
                <TabPanel key={key} index={index} value={tabValue}>
                    <CharacterSkillTab
                        skillKey={key as CharacterSkillKey}
                        skillData={skills[key as CharacterSkillKey]}
                    />
                </TabPanel>
            ))}
        </MainContentBox>
    );
}

export default CharacterSkillDisplay;

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
