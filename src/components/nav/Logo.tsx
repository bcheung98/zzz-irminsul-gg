// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { ButtonBase, CardHeader } from "@mui/material";

function Logo({ onHomePage }: { onHomePage: boolean }) {
    return (
        <ButtonBase
            disableRipple
            href={onHomePage ? "https://irminsul.gg/" : "https://irminsul.gg/"}
        >
            <CardHeader
                avatar={
                    <Image
                        src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                        alt="IRMINSUL.GG"
                        style={{ width: "48px", height: "48px" }}
                    />
                }
                title={
                    <TextStyled
                        variant="sitename"
                        sx={{ color: "white !important" }}
                    >
                        IRMINSUL.GG
                    </TextStyled>
                }
                sx={{ p: 0 }}
            />
        </ButtonBase>
    );
}

export default Logo;
