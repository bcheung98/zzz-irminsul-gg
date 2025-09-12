import { CSSProperties, forwardRef, HTMLAttributes } from "react";

// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";

// Helper imports
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { TPlannerListItem } from "./PlannerList";

type PlannerListItemProps = {
    item: TPlannerListItem;
    isOpacityEnabled?: boolean;
    isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const PlannerListItem = forwardRef<HTMLDivElement, PlannerListItemProps>(
    ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
        const theme = useTheme();
        const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

        const styles: CSSProperties = {
            cursor: isDragging ? "grabbing" : "grab",
            backgroundColor: theme.background(0, isDragging ? "light" : "dark"),
            touchAction: "manipulation",
            ...style,
        };

        return (
            <div ref={ref} style={styles} {...props}>
                <Stack
                    spacing={2}
                    direction="row"
                    alignItems="center"
                    sx={{
                        p: 1,
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: theme.background(
                                0,
                                isDragging ? "light" : "main"
                            ),
                        },
                    }}
                >
                    <Image
                        src={item.imgURL}
                        style={{
                            width: matches_md_up ? "48px" : "40px",
                            height: matches_md_up ? "48px" : "40px",
                            border: `2px solid ${getRarityColor(item.rarity)}`,
                            borderRadius: theme.mainContentBox.borderRadius,
                            backgroundColor: theme.background(2),
                            boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                item.rarity
                            )}`,
                        }}
                    />
                    <TextStyled
                        variant={
                            matches_md_up ? "body1-styled" : "body2-styled"
                        }
                    >
                        {item.name}
                    </TextStyled>
                </Stack>
            </div>
        );
    }
);

export default PlannerListItem;
