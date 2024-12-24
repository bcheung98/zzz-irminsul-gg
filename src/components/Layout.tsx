// MUI imports
import { Box } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            sx={{
                px: "20px",
             
                pb: "50px",
                mt: "80px",
                minHeight: "100vh",
                width: "100%",
                mx: "auto",
            }}
        >
            {children}
        </Box>
    );
}

export default Layout;
