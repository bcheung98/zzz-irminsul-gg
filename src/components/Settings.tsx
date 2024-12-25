import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    IconButton,
    Dialog,
    Stack,
    Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectSettings,
    setServer,
    setSettings,
    setSkillDisplay,
    setTheme,
    setWidth,
    SkillDisplay,
    Width,
} from "reducers/settings";
import { navStyles } from "./nav/Nav";
import { themeList } from "themes/theme";
import { Region, regions } from "helpers/dates";

// Type imports
import { ThemeNames } from "types/theme";

function Settings() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));
    const styles = navStyles("_");

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);
    const themeName = settings.theme;
    const { width, skillDisplay, server } = settings;

    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        dispatch(setSettings(settings));
        setSettingsOpen(false);
    };

    const toggleButtonsParams = {
        spacing: 0,
        padding: "4px 12px",
        highlightOnHover: false,
    };

    const settingsList = [
        {
            label: "Theme",
            options: (
                <ToggleButtons
                    buttons={themeButtons}
                    value={themeName}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: ThemeNames
                    ) => {
                        if (newValue !== null) {
                            dispatch(setTheme(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Width",
            options: (
                <ToggleButtons
                    buttons={widthButtons}
                    value={width}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: Width
                    ) => {
                        if (newValue !== null) {
                            dispatch(setWidth(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Skill Display",
            options: (
                <ToggleButtons
                    buttons={skillDisplayButtons}
                    value={skillDisplay}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: SkillDisplay
                    ) => {
                        if (newValue !== null) {
                            dispatch(setSkillDisplay(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
                />
            ),
        },
        {
            label: "Server",
            options: (
                <ToggleButtons
                    buttons={regionButtons}
                    value={server}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: Region
                    ) => {
                        if (newValue !== null) {
                            dispatch(setServer(newValue));
                        }
                    }}
                    {...toggleButtonsParams}
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
                              color: "white",
                              "&:hover": {
                                  backgroundColor: theme.appbar.hover,
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
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title="Settings"
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleSettingsClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        contentProps={{ padding: "16px" }}
                    >
                        <Stack spacing={2}>
                            {settingsList.map((setting, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: { xs: "block", sm: "flex" },
                                        flexGrow: 1,
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        gap: "8px",
                                    }}
                                >
                                    <TextStyled
                                        sx={{
                                            display: {
                                                xs: "block",
                                                sm: "flex",
                                            },
                                            mb: { xs: "8px", sm: "0px" },
                                        }}
                                    >
                                        {setting.label}
                                    </TextStyled>
                                    {setting.options}
                                </Box>
                            ))}
                        </Stack>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default Settings;

const themeButtons: CustomToggleButtonProps[] = themeList.map((theme) => ({
    value: theme.name,
    label: theme.label,
}));

const widthButtons: CustomToggleButtonProps[] = [
    { value: "standard", label: "Standard" },
    { value: "wide", label: "Wide" },
];

export const skillDisplayButtons: CustomToggleButtonProps[] = [
    { value: "slider", label: "Slider" },
    { value: "table", label: "Table" },
];

const regionButtons: CustomToggleButtonProps[] = objectKeys(regions).map(
    (region) => ({
        value: region,
        label: region,
    })
);
