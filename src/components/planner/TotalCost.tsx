// Component imports
import MainContentBox from "custom/MainContentBox";
import MaterialImage from "custom/MaterialImage";

// MUI imports
import Grid from "@mui/material/Grid2";

// Helper imports
import { createMaterialCostData } from "helpers/createMaterialCostData";
import { useAppSelector } from "helpers/hooks";
import { getTotalCost } from "reducers/planner";

function TotalCost() {
    const costs = createMaterialCostData(useAppSelector(getTotalCost));

    return (
        <>
            {costs.length > 0 && (
                <MainContentBox title="Total Materials Required">
                    <Grid container spacing={2}>
                        {costs.map((material, index) => (
                            <MaterialImage
                                key={index}
                                name={material.name}
                                rarity={material.rarity}
                                cost={material.cost}
                                imgSrc={material.img}
                                size="64px"
                            />
                        ))}
                    </Grid>
                </MainContentBox>
            )}
        </>
    );
}

export default TotalCost;
