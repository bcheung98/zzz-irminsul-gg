import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    IconButton,
    Dialog,
    Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectSkillDisplay,
    selectTheme,
    setSkillDisplay,
    setTheme,
    SkillDisplay,
} from "reducers/settings";
import { navStyles } from "./Nav";
import { themeNames } from "themes/theme";

// Type imports
import { ThemeNames } from "types/theme";

function Settings() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));
    const styles = navStyles(theme);

    const dispatch = useAppDispatch();

    const currentTheme = useAppSelector(selectTheme).name;
    const currentSkillDisplay = useAppSelector(selectSkillDisplay).mode;

    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        setSettingsOpen(false);
    };

    const settings = [
        {
            label: "Theme",
            options: (
                <ToggleButtons
                    buttons={createThemeButtons()}
                    value={currentTheme}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newTheme: ThemeNames
                    ) => {
                        if (newTheme !== null) {
                            dispatch(setTheme(newTheme));
                        }
                    }}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            ),
        },
        {
            label: "Skill Display",
            options: (
                <ToggleButtons
                    buttons={[
                        { value: "slider", label: "Slider" },
                        { value: "table", label: "Table" },
                    ]}
                    value={currentSkillDisplay}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newMode: SkillDisplay
                    ) => {
                        if (newMode !== null) {
                            dispatch(setSkillDisplay(newMode));
                        }
                    }}
                    spacing={0}
                    padding={10}
                    highlightOnHover={false}
                />
            ),
        },
    ];

    return (
        <>
            <IconButton
                disableRipple
                disableTouchRipple
                onClick={handleSettingsOpen}
                sx={
                    matches_up_md
                        ? {
                              borderRadius: "64px",
                              px: "2px",
                              width: "36px",
                              height: "36px",
                              "&:hover": {
                                  backgroundColor: theme.table.body.hover,
                              },
                          }
                        : styles.listItemButton()
                }
            >
                <SettingsIcon
                    sx={matches_up_md ? undefined : styles.navItem()}
                />
                {!matches_up_md && (
                    <TextStyled
                        sx={matches_up_md ? undefined : styles.listItemText()}
                    >
                        Settings
                    </TextStyled>
                )}
            </IconButton>
            <Dialog
                open={settingsOpen}
                onClose={handleSettingsClose}
                maxWidth="sm"
                fullWidth
            >
                <MainContentBox
                    title="Settings"
                    actions={
                        <IconButton disableRipple onClick={handleSettingsClose}>
                            <CloseIcon />
                        </IconButton>
                    }
                >
                    <Stack spacing={2}>
                        {settings.slice(1).map((setting, index) => (
                            <FlexBox
                                key={index}
                                sx={{ justifyContent: "space-between" }}
                            >
                                <TextStyled>{setting.label}</TextStyled>
                                {setting.options}
                            </FlexBox>
                        ))}
                    </Stack>
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default Settings;

function createThemeButtons(): CustomToggleButtonProps[] {
    return themeNames.map((theme) => ({
        value: theme,
        label: theme,
    }));
}

export const skillDisplayButtons: CustomToggleButtonProps[] = [
    { value: "slider", label: "Slider" },
    { value: "table", label: "Table" },
];
