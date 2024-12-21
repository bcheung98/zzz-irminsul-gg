import React from "react";

// Component imports
import { FlexBox } from "styled/StyledBox";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTableCell, StyledTableRow } from "styled/StyledTable";
import { StyledSlider } from "styled/StyledSlider";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
} from "@mui/material";

interface StatsTableProps {
    mode?: "slider" | "table";
    levels: (string | number)[];
    data: (string | number)[][];
    headColumns?: (string | number)[];
    orientation?: "row" | "column";
    sliderProps?: {
        initialValue?: number;
        sx?: SxProps;
    };
    tableProps?: {
        width?: string | number;
    };
    textID?: string;
}

function StatsTable({
    mode = "slider",
    levels,
    data,
    headColumns,
    orientation = "row",
    sliderProps,
    tableProps,
    textID = "text-value"
}: StatsTableProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const [sliderValue, setSliderValue] = React.useState(
        sliderProps?.initialValue || levels.length
    );
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const targets = document.getElementsByClassName(textID);
    React.useEffect(() => {
        data.forEach((subScaling: (string | number)[], index: number) => {
            const target = targets[index];
            if (target) {
                target.innerHTML = subScaling[sliderValue].toString();
            }
        });
    }, [sliderValue]);

    const tableHeadRow = headColumns || data.map((row) => row[0]);
    const tableRows =
        orientation === "row"
            ? data
            : levels.map((_, level) => data.map((row) => row[level + 1]));
    const sliderRows = data.filter((row) => row[0] !== "Level");

    const tableTextStyle: SxProps = {
        textAlign: { xs: "left", md: "center" },
    };

    return (
        <>
            <FlexBox
                sx={{
                    display: mode === "slider" ? "flex" : "none",
                    flexWrap: { xs: "wrap", md: "nowrap" },
                    mb: "15px",
                }}
            >
                <TextStyled sx={{ minWidth: "60px" }}>
                    Lv. {levels[sliderValue - 1]}
                </TextStyled>
                <StyledSlider
                    value={sliderValue}
                    step={1}
                    min={1}
                    max={levels.length}
                    onChange={handleSliderChange}
                    size={matches_sm_up ? "medium" : "small"}
                    sx={sliderProps?.sx}
                />
            </FlexBox>
            <TableContainer
                component={Card}
                sx={{ width: tableProps?.width, mt: "10px" }}
            >
                <Table>
                    {mode === "table" && (
                        <TableHead>
                            <TableRow>
                                {tableHeadRow.map((col) => (
                                    <StyledTableCell key={col}>
                                        <TextStyled
                                            variant="body1"
                                            sx={tableTextStyle}
                                        >
                                            {col}
                                        </TextStyled>
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                    )}
                    <TableBody>
                        {mode === "slider"
                            ? sliderRows.map((row) => (
                                  <StyledTableRow key={row[0]}>
                                      <StyledTableCell align="left">
                                          <Text variant="body2">{row[0]}</Text>
                                      </StyledTableCell>
                                      <StyledTableCell align="right">
                                          <Text variant="body2">
                                              {row[sliderValue]}
                                          </Text>
                                      </StyledTableCell>
                                  </StyledTableRow>
                              ))
                            : tableRows.map((row) => (
                                  <StyledTableRow key={row[0]} hover>
                                      {row.map((level, index) => (
                                          <StyledTableCell
                                              key={`${row[0]}-${index}`}
                                          >
                                              <Text
                                                  variant="body2"
                                                  sx={tableTextStyle}
                                              >
                                                  {level}
                                              </Text>
                                          </StyledTableCell>
                                      ))}
                                  </StyledTableRow>
                              ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default StatsTable;
