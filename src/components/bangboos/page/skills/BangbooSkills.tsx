import React from "react";

// Component imports
import BangbooSkillTab from "./BangbooSkillTab";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";

// MUI imports
import { useTheme, useMediaQuery } from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { skillDisplayButtons } from "components/Settings";

// Type imports
import {
    BangbooProps,
    BangbooSkills as BangbooSkillsType,
} from "types/bangboo";
import { selectSkillDisplay, SkillDisplay } from "reducers/settings";
import { useAppSelector } from "helpers/hooks";

function BangbooSkills({ bangboo }: BangbooProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const skills = Object.fromEntries(
        Object.entries(bangboo.skills).filter(([_, arr]) => arr.length > 0)
    ) as BangbooSkillsType;

    const [tabValue, setTabValue] = React.useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const currentSkillDisplay = useAppSelector(selectSkillDisplay);
    const [mode, setMode] = React.useState<SkillDisplay>(currentSkillDisplay);
    const handleMode = (_: React.BaseSyntheticEvent, newView: SkillDisplay) => {
        if (newView !== null) {
            setMode(newView);
        }
    };

    const skillIcon = (index: number): React.CSSProperties => {
        const selected = index === tabValue;
        return {
            width: "64px",
            height: "auto",
            margin: "4px 0",
            opacity: selected ? 1 : 0.75,
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
                        backgroundColor: theme.palette.info.main,
                    },
                }}
            >
                {objectKeys(skills).map((key, index) => (
                    <StyledTab
                        key={key}
                        icon={
                            <Image
                                src={`skills/bangboo/${key}`}
                                alt={key}
                                style={skillIcon(index)}
                            />
                        }
                        sx={{ px: 0 }}
                    />
                ))}
            </StyledTabs>
            {objectKeys(skills).map((key, index) => (
                <TabPanel key={key} index={index} value={tabValue}>
                    <BangbooSkillTab
                        mode={mode}
                        skillKey={key}
                        skillData={skills[key]}
                    />
                </TabPanel>
            ))}
        </MainContentBox>
    );
}

export default BangbooSkills;
