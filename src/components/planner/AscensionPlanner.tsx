import React from "react";

// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports

function AscensionPlanner() {
    document.title = `Ascension Planner ${import.meta.env.VITE_DOCUMENT_TITLE}`;

    return (
        <React.Fragment>
            <TextStyled variant="h5" sx={{ lineHeight: "36px" }}>
                Ascension Planner
            </TextStyled>
        </React.Fragment>
    );
}

export default AscensionPlanner;
