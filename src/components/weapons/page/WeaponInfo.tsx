import React from "react";
import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    Box,
    Divider,
    IconButton,
    Dialog,
    Card,
    Toolbar,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponInfo({ weapon }: WeaponProps) {
    const theme = useTheme();

    const { displayName, rarity, specialty, description, shortDescription } =
        weapon;

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                p: "15px",
                mb: "15px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(8),
            }}
        >
            <FlexBox>
                <Image
                    src={`specialties/${specialty}`}
                    alt={specialty}
                    tooltip={specialty}
                    style={{ width: "64px" }}
                />
                <Box sx={{ ml: "15px" }}>
                    <TextStyled variant="h4" sx={{ mb: "5px" }}>
                        {displayName}
                    </TextStyled>
                    <FlexBox columnGap="4px">
                        <Image
                            src={`ranks/item/${rarity}`}
                            alt={rarity}
                            style={{ width: "40px" }}
                        />
                    </FlexBox>
                </Box>
            </FlexBox>
            <Divider sx={{ my: "15px" }} />
            <FlexBox>
                <IconButton disableRipple onClick={handleClickOpen}>
                    <InfoOutlinedIcon />
                </IconButton>
                <TextStyled sx={{ fontStyle: "italic" }}>
                    {parse(shortDescription)}
                </TextStyled>
            </FlexBox>
            <Dialog open={open} onClose={handleClose} maxWidth={false}>
                <Card
                    sx={{
                        p: "0 15px 15px 15px",
                        width: { xs: "100%", md: "40vw" },
                        border: theme.mainContentBox.border,
                        borderRadius: theme.mainContentBox.borderRadius,
                        backgroundColor: theme.background(3),
                    }}
                >
                    <Toolbar
                        disableGutters
                        sx={{ justifyContent: "right", p: 0 }}
                    >
                        <IconButton disableRipple onClick={handleClose}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Toolbar>
                    <TextStyled>{parse(description)}</TextStyled>
                </Card>
            </Dialog>
        </Box>
    );
}

export default WeaponInfo;
