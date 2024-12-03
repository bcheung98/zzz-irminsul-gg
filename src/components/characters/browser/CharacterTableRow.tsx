// Component imports
import Image from "custom/Image";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { ButtonBase } from "@mui/material";

// Helper imports
import { createDateObject } from "helpers/dates";
import { combineStyles } from "helpers/utils";

// Type imports
import { CharacterRow } from "./CharacterTable";

interface CharacterTableRowProps extends CharacterRow {
    releaseDate: string;
}

function CharacterTableRow({ row }: { row: CharacterTableRowProps }) {
    const columns = [
        {
            label: row.fullName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: `rgb(30, 175, 255)`,
                    textDecoration: "underline",
                },
            },
            img: `characters/icons/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "48px",
                cursor: "pointer",
            },
            href: `/agents/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        {
            img: `ranks/character/${row.rarity}`,
        },
        {
            label: row.element,
            img: `elements/${row.element}`,
        },
        {
            label: row.specialty,
            img: `specialties/${row.specialty}`,
        },
        {
            label: row.attackType,
            img: `specialties/attack_types/${row.attackType}`,
        },
        {
            label: row.faction,
            img: `factions/${row.faction}`,
            imgStyle: { width: "48px", height: "48px" },
        },
        {
            label: createDateObject(row.releaseDate).date,
        },
    ];

    return (
        <StyledTableRow hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index}>
                    <FlexBox columnGap="10px">
                        {col.img && (
                            <ButtonBase
                                disableRipple
                                href={col.href || ""}
                                target="_blank"
                                sx={{
                                    cursor: col.href ? "pointer" : "default",
                                    userSelect: col.href
                                        ? "pointer"
                                        : "default",
                                }}
                            >
                                <Image
                                    src={col.img}
                                    alt={col.label}
                                    style={combineStyles(
                                        {
                                            width: "32px",
                                            height: "32px",
                                        },
                                        col.imgStyle
                                    )}
                                />
                            </ButtonBase>
                        )}
                        {col.label && (
                            <ButtonBase
                                disableRipple
                                href={col.href || ""}
                                target="_blank"
                                sx={{
                                    cursor: col.href ? "pointer" : "text",
                                    userSelect: col.href ? "pointer" : "text",
                                }}
                            >
                                <TextStyled
                                    sx={combineStyles(
                                        {
                                            marginLeft: "10px",
                                            textAlign: "left",
                                        },
                                        col.labelStyle
                                    )}
                                >
                                    {col.label}
                                </TextStyled>
                            </ButtonBase>
                        )}
                    </FlexBox>
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );
}

export default CharacterTableRow;
