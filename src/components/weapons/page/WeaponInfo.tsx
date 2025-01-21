import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    Box,
    Divider,
    Card,
    Stack,
    IconButton,
    Dialog,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { getRarityColor } from "helpers/rarityColors";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponInfo({ weapon }: WeaponProps) {
    const theme = useTheme();

    const {
        displayName,
        rarity,
        specialty,
        signature,
        description,
        shortDescription,
    } = weapon;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Card
            sx={{
                p: "16px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "16px", rowGap: "8px" }}
                >
                    <Image
                        src={`ranks/item/${rarity}`}
                        alt={rarity}
                        style={{ width: "64px" }}
                    />
                    <Box>
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
                <FlexBox sx={{ alignItems: "center" }}>
                    <IconButton disableRipple onClick={handleClickOpen}>
                        <InfoOutlinedIcon />
                    </IconButton>
                    <TextStyled
                        variant="subtitle1-styled"
                        sx={{ fontStyle: "italic" }}
                    >
                        {parse(shortDescription)}
                    </TextStyled>
                </FlexBox>
            </Stack>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title={
                            signature ? (
                                <Image
                                    src={`characters/icons/${signature}`}
                                    alt={signature}
                                    style={{
                                        width: "48px",
                                        border: `2px solid ${getRarityColor(
                                            rarity
                                        )}`,
                                        borderRadius: "4px",
                                    }}
                                />
                            ) : (
                                ""
                            )
                        }
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
                        <TextStyled component="span">
                            {parse(description)}
                        </TextStyled>
                    </MainContentBox>
                </Box>
            </Dialog>
        </Card>
    );
}

export default WeaponInfo;
