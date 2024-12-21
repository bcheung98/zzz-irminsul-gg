// Component imports
import StatsTable from "custom/StatsTable";
import { TextStyled } from "styled/StyledTypography";

// Helper imports
import { range } from "helpers/utils";

// Type imports
import { BangbooSkillScalingProps } from "./BangbooSkillTab";

function BangbooSkillScaling({
    mode,
    skillKey,
    scaling,
}: BangbooSkillScalingProps) {
    const levels = skillKey === "B" ? 5 : 10;

    return (
        <>
            <TextStyled sx={{ mb: "15px" }}>Skill Scaling</TextStyled>
            <StatsTable
                mode={mode}
                levels={range(1, levels)}
                data={scaling}
                headColumns={["Level", ...range(1, levels)]}
                sliderProps={{
                    initialValue: levels,
                    sx: {
                        minWidth: "100px",
                        maxWidth: "500px",
                        ml: "10px",
                    },
                }}
                tableProps={{ width: mode === "table" ? "100%" : "400px" }}
            />
        </>
    );
}

export default BangbooSkillScaling;
