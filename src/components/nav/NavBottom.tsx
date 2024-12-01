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
    const matches_down_sm = useMediaQuery(theme.breakpoints.down("sm"));

    const svgStyle: SxProps = {
        width: { xs: "24px", sm: "32px" },
        height: { xs: "24px", sm: "32px" },
        mt: { xs: "2.5px", sm: 0 },
    };

    return (
        <AppBar
            position="relative"
            sx={{ borderWidth: "1px 0 0 1px", zIndex: theme.zIndex.drawer + 1 }}
        >
            <Toolbar
                sx={{
                    justifyContent: "center",
                    display: { xs: "block", sm: "flex" },
                    my: "10px",
                }}
            >
                <TextStyled variant="body2" gutterBottom>
                    IRMINSUL.GG is not affiliated with HoYoverse.
                    <br />
                    Game contents are trademarks and copyrights of HoYoverse.
                </TextStyled>
                <Box sx={{ display: { xs: "block", sm: "flex" } }}>
                    <Divider
                        orientation={
                            !matches_down_sm ? "vertical" : "horizontal"
                        }
                        variant="middle"
                        flexItem
                        sx={{
                            mx: { xs: 0, sm: "25px" },
                            my: { xs: "10px", sm: 0 },
                        }}
                    />
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                alignItems: "center",
                                display: { xs: "flex", sm: "block" },
                            }}
                        >
                            <TextStyled
                                variant="body2"
                                gutterBottom
                                align="center"
                            >
                                GitHub:
                            </TextStyled>
                            <IconButton
                                disableRipple
                                href="https://github.com/bcheung98/project-phaethon"
                                target="_blank"
                                color="inherit"
                                sx={{ pr: { xs: "0px", sm: "8px" } }}
                            >
                                <GitHubIcon
                                    sx={{
                                        fontSize: { xs: 20, sm: 28 },
                                        mt: { xs: "-2.5px", sm: 0 },
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <Divider
                            orientation="vertical"
                            variant="middle"
                            flexItem
                            sx={{
                                mx: { xs: "10px", sm: "25px" },
                                my: 0,
                            }}
                        />
                        <Box
                            sx={{
                                alignItems: "center",
                                display: { xs: "flex", sm: "block" },
                            }}
                        >
                            <TextStyled
                                variant="body2"
                                gutterBottom
                                align="center"
                            >
                                Made with:
                            </TextStyled>
                            <IconButton
                                disableRipple
                                href="https://vite.dev"
                                target="_blank"
                                color="inherit"
                                sx={{ pr: { xs: "0px", sm: "8px" } }}
                            >
                                <Avatar
                                    variant="square"
                                    src={viteLogo}
                                    className="logo"
                                    alt="Vite logo"
                                    sx={svgStyle}
                                />
                            </IconButton>
                            <IconButton
                                disableRipple
                                href="https://react.dev"
                                target="_blank"
                                color="inherit"
                                sx={{ pr: { xs: "0px", sm: "8px" } }}
                            >
                                <Avatar
                                    variant="square"
                                    src={reactLogo}
                                    className="logo"
                                    alt="Vite logo"
                                    sx={svgStyle}
                                />
                            </IconButton>
                            <IconButton
                                disableRipple
                                href="https://mui.com"
                                target="_blank"
                                color="inherit"
                                sx={{ pr: { xs: "0px", sm: "8px" } }}
                            >
                                <Avatar
                                    variant="square"
                                    src={muiLogo}
                                    className="logo"
                                    alt="Vite logo"
                                    sx={svgStyle}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBottom;
