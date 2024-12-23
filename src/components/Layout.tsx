// Component imports
// import ActionFab from "custom/ActionFab";

// MUI imports
import { Box } from "@mui/material";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Layout({ children }: { children: React.ReactNode }) {
    // const handleScrollTop = (event: React.BaseSyntheticEvent) => {
    //     const anchor = (event.target.ownerDocument || document).querySelector(
    //         "#back-to-top-anchor"
    //     );
    //     if (anchor) {
    //         anchor.scrollIntoView({
    //             block: "center",
    //         });
    //     }
    // };

    return (
        <>
            <Box
                sx={{
                    px: "20px",
                    pt: "20px",
                    pb: "50px",
                    mt: "80px",
                    minHeight: "100vh",
                    width: "100%",
                    mx: "auto",
                }}
            >
                {children}
            </Box>
            {/* <ActionFab
                action={handleScrollTop}
                hysteresis
                icon={<KeyboardArrowUpIcon />}
                tooltip="Scroll to top"
                color={{
                    primary: theme.button.primary,
                    hover: theme.button.hover,
                }}
                position={{ top: 90, left: "50%" }}
            /> */}
        </>
    );
}

export default Layout;
