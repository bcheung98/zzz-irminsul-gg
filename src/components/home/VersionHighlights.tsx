import React from "react"

// Component imports
import Image from "custom/Image"
import DisplayCard from "custom/DisplayCard"

// MUI imports
import { useTheme, Box } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { updates } from "data/versions"
import { useAppSelector } from "helpers/hooks"
import { selectCharacters } from "reducers/character"

function VersionHighlights() {

    const theme = useTheme()

    const version = updates[0].version

    const characters = useAppSelector(selectCharacters)

    const currentCharacters = characters.filter(char => char.release.version === version)

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                {
                    currentCharacters.map((char, index) =>
                        <DisplayCard
                            key={index}
                            id={`${char.name}-versionHighlights`}
                            name={char.name}
                            displayName={char.fullName}
                            type="character"
                            rarity={char.rarity}
                            info={{ element: char.element, specialty: char.specialty }}
                        />
                    )
                }
            </Grid>
        </React.Fragment>
    )

}

export default VersionHighlights