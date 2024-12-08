// Component imports
import Image from "custom/Image";
import { StyledTableRow, StyledTableCell } from "styled/StyledTable";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { ButtonBase } from "@mui/material";

// Helper imports
import { combineStyles } from "helpers/utils";

// Type imports
import { WeaponRow } from "./WeaponTable";

interface WeaponTableRowProps extends WeaponRow {
    atk: number;
    subStat: string;
}

function WeaponTableRow({ row }: { row: WeaponTableRowProps }) {
    const columns = [
        {
            label: row.displayName,
            labelStyle: {
                cursor: "pointer",
                "&:hover": {
                    color: `rgb(30, 175, 255)`,
                    textDecoration: "underline",
                },
            },
            img: `w-engines/${row.name}`,
            imgStyle: {
                width: "48px",
                height: "auto",
                cursor: "pointer",
            },
            href: `/w-engines/${row.name.split(" ").join("_").toLowerCase()}`,
        },
        {
            img: `ranks/item/${row.rarity}`,
            imgStyle: {
                width: "40px",
                height: "40px",
            },
        },
        {
            label: row.specialty,
            img: `specialties/${row.specialty}`,
        },
        {
            label: row.atk,
            labelStyle: { marginLeft: "0px" },
        },
        {
            label: row.subStat,
            labelStyle: { marginLeft: "0px" },
        },
    ];

    return (
        <StyledTableRow hover>
            {columns.map((col, index) => (
                <StyledTableCell key={index} sx={{ maxWidth: "200px" }}>
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

export default WeaponTableRow;
