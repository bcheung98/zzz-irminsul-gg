import React from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, useMediaQuery, IconButton, Dialog } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectTheme, setTheme } from "reducers/settings";
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
                    {settings.map((setting, index) => (
                        <FlexBox
                            key={index}
                            sx={{ justifyContent: "space-between" }}
                        >
                            <TextStyled>{setting.label}</TextStyled>
                            {setting.options}
                        </FlexBox>
                    ))}
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default Settings;

function createThemeButtons() {
    return themeNames.map((theme) => ({
        value: theme,
        label: theme,
    }));
}
