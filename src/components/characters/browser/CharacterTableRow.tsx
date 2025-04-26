// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectServer } from "reducers/settings";
import { createDateObject } from "helpers/dates";
import { combineStyles } from "helpers/utils";

// Type imports
import { CharacterRow } from "./CharacterTable";
import { AttackType } from "types/_common";

interface CharacterTableRowProps extends CharacterRow {
    subElement: string;
    attackType: AttackType;
    releaseDate: string;
    version: string;
}

function CharacterTableRow({ row }: { row: CharacterTableRowProps }) {
    const theme = useTheme();

    const region = useAppSelector(selectServer);

    const columns = [
        {
            label: row.fullName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: theme.text.selected,
                    textDecoration: "underline",
                },
            },
            img: `characters/avatars/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/agents/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        {
            img: `ranks/character/${row.rarity}`,
        },
        {
            label: row.subElement,
            img: `elements/${row.subElement}`,
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
            imgStyle: { width: "40px", height: "40px" },
        },
        {
            label: `${
                createDateObject({ date: row.releaseDate, region: region }).date
            } (${row.version})`,
            labelStyle: { marginLeft: "0px" },
        },
    ];

    return (
        <StyledTableRow color="secondary" hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index} sx={{ maxWidth: "275px" }}>
                    <FlexBox columnGap="16px">
                        {col.img &&
                            (col.href ? (
                                <RouterLink to={col.href}>
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
                                </RouterLink>
                            ) : (
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
                            ))}
                        {col.label &&
                            (col.href ? (
                                <RouterLink to={col.href}>
                                    <TextStyled
                                        sx={combineStyles(
                                            { textAlign: "left" },
                                            col.labelStyle
                                        )}
                                    >
                                        {col.label}
                                    </TextStyled>
                                </RouterLink>
                            ) : (
                                <TextStyled
                                    sx={combineStyles(
                                        { textAlign: "left" },
                                        col.labelStyle
                                    )}
                                >
                                    {col.label}
                                </TextStyled>
                            ))}
                    </FlexBox>
                </StyledTableCell>
            ))}
        </StyledTableRow>
    );
}

export default CharacterTableRow;
