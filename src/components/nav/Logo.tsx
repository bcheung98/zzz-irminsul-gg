// Component imports
import Image from "custom/Image";
import RouterLink from "./RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Stack } from "@mui/material";

function Logo({ href = "/" }: { href?: string }) {
    return (
        <RouterLink to={href}>
            <Stack direction="row" spacing={2}>
                <Image
                    src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                    alt="IRMINSUL.GG"
                    style={{ width: "48px", height: "48px" }}
                />
                <TextStyled variant="sitename" sx={{ lineHeight: "48px" }}>
                    IRMINSUL.GG
                </TextStyled>
            </Stack>
        </RouterLink>
    );
}

export default Logo;
