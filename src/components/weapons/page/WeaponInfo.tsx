import React from "react";
import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Divider, IconButton, Dialog } from "@mui/material";
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
                p: "16px",
                mb: "16px",
                width: "100%",
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
                backgroundColor: theme.background(2),
            }}
        >
            <FlexBox>
                <Image
                    src={`ranks/item/${rarity}`}
                    alt={rarity}
                    style={{ width: "64px" }}
                />
                <Box sx={{ ml: "16px" }}>
                    <TextStyled variant="h4-styled" sx={{ mb: "8px" }}>
                        {displayName}
                    </TextStyled>
                    <InfoChip
                        color="tertiary"
                        src={`specialties/${specialty}`}
                        label={specialty}
                    />
                </Box>
            </FlexBox>
            <Divider sx={{ my: "16px" }} />
            <FlexBox>
                <IconButton disableRipple onClick={handleClickOpen}>
                    <InfoOutlinedIcon />
                </IconButton>
                <TextStyled sx={{ fontStyle: "italic" }}>
                    {parse(shortDescription)}
                </TextStyled>
            </FlexBox>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title=""
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <TextStyled>{parse(description)}</TextStyled>
                    </MainContentBox>
                </Box>
            </Dialog>
        </Box>
    );
}

export default WeaponInfo;
