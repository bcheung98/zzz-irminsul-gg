import React from "react"

// Component imports
import Image from "custom/Image"
import DisplayCard from "custom/DisplayCard"

// MUI imports
import { useTheme } from "@mui/material"
import Grid from "@mui/material/Grid2"

// Helper imports
import { updates } from "data/versions"
import { useAppSelector } from "helpers/hooks"

function VersionHighlights() {

    const theme = useTheme()

    const version = updates[0].version

    const characters = useAppSelector(state => state.characters.characters)

    const currentCharacters = characters.filter(char => char.release.version === version)

    return (
        <Grid size={{ sm: 12, md: 6 }}>
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
    )

}

export default VersionHighlights