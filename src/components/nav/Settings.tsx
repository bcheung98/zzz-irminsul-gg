import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

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
import { objectKeys } from "helpers/utils";
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import {
    selectServer,
    selectSkillDisplay,
    selectTheme,
    setServer,
    setSkillDisplay,
    setTheme,
    SkillDisplay,
} from "reducers/settings";
import { navStyles } from "./Nav";
import { themeNames } from "themes/theme";
import { Region, regions } from "helpers/dates";

// Type imports
import { ThemeNames } from "types/theme";

function Settings() {
    const theme = useTheme();
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));
    const styles = navStyles(theme);

    const dispatch = useAppDispatch();

    const currentTheme = useAppSelector(selectTheme).name;
    const currentSkillDisplay = useAppSelector(selectSkillDisplay).mode;
    const currentServer = useAppSelector(selectServer).region;

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
                    buttons={themeButtons}
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
                    buttons={skillDisplayButtons}
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
        {
            label: "Server",
            options: (
                <ToggleButtons
                    buttons={regionButtons}
                    value={currentServer}
                    exclusive
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newRegion: Region
                    ) => {
                        if (newRegion !== null) {
                            dispatch(setServer(newRegion));
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
                                sx={{
                                    flexWrap: "wrap",
                                    justifyContent: "space-between",
                                }}
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

const themeButtons: CustomToggleButtonProps[] = themeNames.map((theme) => ({
    value: theme,
    label: theme,
}));

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
