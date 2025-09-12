import { useState } from "react";

// Component imports
import PlannerList from "./PlannerList";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Stack, Dialog, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { getItems } from "reducers/planner";

function PlannerListBase() {
    const theme = useTheme();

    const items = useAppSelector(getItems);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    p: "16px",
                    width: "auto",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: theme.background(2),
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    "&:hover": {
                        backgroundColor: theme.background(2, "light"),
                    },
                }}
                onClick={handleClickOpen}
            >
                <Stack spacing={1} direction="row" alignItems="center">
                    <SortIcon sx={{ color: theme.text.primary }} />
                    <TextStyled variant="body2-styled">Set Order</TextStyled>
                </Stack>
            </Card>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <MainContentBox
                    title={`Set Order`}
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleClose}
                            sx={{ color: theme.appbar.color }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    contentProps={{ padding: "16px" }}
                >
                    <TextStyled sx={{ mb: "16px" }}>
                        Drag to rearrange items
                    </TextStyled>
                    <PlannerList data={items} />
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default PlannerListBase;
