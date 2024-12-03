import viteLogo from "/vite.svg";
import reactLogo from "/react.svg";
import muiLogo from "/mui.svg";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    AppBar,
    Toolbar,
    Box,
    Divider,
    IconButton,
    Avatar,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

function NavBottom() {
    const theme = useTheme();
    const matches_down_md = useMediaQuery(theme.breakpoints.down("md"));

    const iconButtonStyle: SxProps = {
        px: "4px",
    };

    const svgStyle: SxProps = {
        width: { xs: "22px", sm: "24px" },
        height: { xs: "22px", sm: "24px" },
    };

    return (
        <AppBar
            position="relative"
            sx={{
                borderWidth: matches_down_md ? "1px 0 0 0" : "1px 0 0 1px",
                zIndex: matches_down_md
                    ? theme.zIndex.drawer
                    : theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    display: { xs: "block", md: "flex" },
                    py: "10px",
                }}
            >
                <TextStyled variant="body2">
                    IRMINSUL.GG is not affiliated with HoYoverse.
                    <br />
                    Game contents are trademarks and copyrights of HoYoverse.
                </TextStyled>
                <Box sx={{ display: { xs: "block", md: "flex" } }}>
                    <Divider
                        orientation="horizontal"
                        sx={{
                            display: { xs: "block", md: "none" },
                            my: "10px",
                        }}
                    />
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                display: { xs: "flex", md: "block" },
                                alignItems: "center",
                            }}
                        >
                            <TextStyled
                                variant="body2"
                                align="center"
                                sx={{ mr: { xs: "8px", md: 0 } }}
                            >
                                GitHub:
                            </TextStyled>
                            <IconButton
                                disableRipple
                                href="https://github.com/bcheung98/project-phaethon"
                                target="_blank"
                                color="inherit"
                                sx={{ display: "flex", mx: "auto", px: "4px" }}
                                className="logo github"
                            >
                                <GitHubIcon sx={svgStyle} />
                            </IconButton>
                        </Box>
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ mx: { xs: "10px", md: "25px" } }}
                        />
                        <Box
                            sx={{
                                display: { xs: "flex", md: "block" },
                                alignItems: "center",
                            }}
                        >
                            <TextStyled
                                variant="body2"
                                align="center"
                                sx={{ mr: { xs: "8px", md: 0 } }}
                            >
                                Made with:
                            </TextStyled>
                            <Box>
                                <IconButton
                                    disableRipple
                                    href="https://vite.dev"
                                    target="_blank"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo vite"
                                >
                                    <Avatar
                                        variant="square"
                                        src={viteLogo}
                                        alt="Vite logo"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                                <IconButton
                                    disableRipple
                                    href="https://react.dev"
                                    target="_blank"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo react"
                                >
                                    <Avatar
                                        variant="square"
                                        src={reactLogo}
                                        alt="React logo"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                                <IconButton
                                    disableRipple
                                    href="https://mui.com"
                                    target="_blank"
                                    color="inherit"
                                    sx={iconButtonStyle}
                                    className="logo mui"
                                >
                                    <Avatar
                                        variant="square"
                                        src={muiLogo}
                                        alt="MUI logo"
                                        sx={svgStyle}
                                    />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBottom;
