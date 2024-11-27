import { useTheme, Card, AppBar, Box } from "@mui/material";
import { TextStyled } from "styled/StyledTypography";

interface MainContentBoxProps {
    children?: React.ReactNode;
    title?: React.ReactNode;
    actions?: React.ReactNode;
}

function MainContentBox({ children, title, actions }: MainContentBoxProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: theme.background(3),
                borderRadius: "5px",
            }}
        >
            <AppBar
                position="static"
                sx={{
                    minHeight: "70px",
                    p: "10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                    }}
                >
                    <TextStyled variant="h6" sx={{ lineHeight: "45px" }}>
                        {title && title}
                    </TextStyled>
                    {actions && actions}
                </Box>
            </AppBar>
            <Box sx={{ p: "25px" }}>{children && children}</Box>
        </Card>
    );
}

export default MainContentBox;
