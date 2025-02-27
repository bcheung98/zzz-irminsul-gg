import { BaseSyntheticEvent, useState } from "react";

// Component imports
import ToggleButtons from "./ToggleButtons";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledInput } from "styled/StyledInput";
import { StyledMenuItem } from "styled/StyledMenu";

// MUI imports
import { Box, Divider, Select, SelectChangeEvent } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Helper imports
import { useAppSelector, useAppDispatch } from "helpers/hooks";
import {
    selectBrowserSettings,
    SortBy,
    SortType,
    setSortBy as setReducerSortBy,
    setSortDirection as setReducerSortDirection,
    SortDirection,
} from "reducers/browser";

interface BrowserSortProps {
    type: SortType;
    options: SortBy[];
}

function BrowserSort({ type, options }: BrowserSortProps) {
    const dispatch = useAppDispatch();

    const sortSettings = useAppSelector(selectBrowserSettings)[type];
    const [sortBy, setSortBy] = useState(sortSettings.sortBy);
    const handleSelectChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as SortBy);
        dispatch(
            setReducerSortBy({ type, sortBy: event.target.value as SortBy })
        );
    };

    const [sortDirection, setSortDirection] = useState(
        sortSettings.sortDirection
    );
    const handleDirectionChange = (
        _: BaseSyntheticEvent,
        newDirection: SortDirection
    ) => {
        if (newDirection !== null) {
            setSortDirection(newDirection);
            dispatch(
                setReducerSortDirection({ type, sortDirection: newDirection })
            );
        }
    };

    return (
        <Box
            sx={{
                display: sortSettings.view !== "table" ? "block" : "none",
                mx: 3,
                mb: 2,
            }}
        >
            <Divider sx={{ mb: 2 }} />
            <TextStyled sx={{ mb: 2 }}>Sort By</TextStyled>
            <FlexBox sx={{ alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSelectChange}
                    input={
                        <StyledInput
                            sx={{
                                "& .MuiInputBase-input": {
                                    padding: { xs: "4px 16px", sm: "2px 16px" },
                                },
                            }}
                        />
                    }
                    MenuProps={{
                        disableScrollLock: true,
                    }}
                >
                    {options.map((option, index) => (
                        <StyledMenuItem key={index} value={option}>
                            <TextStyled sx={{ textTransform: "capitalize" }}>
                                {formatOption(option)}
                            </TextStyled>
                        </StyledMenuItem>
                    ))}
                </Select>
                <ToggleButtons
                    color="primary"
                    buttons={[
                        {
                            value: "asc",
                            icon: <ArrowUpwardIcon fontSize="small" />,
                        },
                        {
                            value: "desc",
                            icon: <ArrowDownwardIcon fontSize="small" />,
                        },
                    ]}
                    value={sortDirection}
                    exclusive
                    onChange={handleDirectionChange}
                    highlightOnHover={false}
                />
            </FlexBox>
        </Box>
    );
}

export default BrowserSort;

function formatOption(option: SortBy) {
    switch (option) {
        case "element":
            return "Attribute";
        case "release":
            return "Release Date";
        case "rarity":
            return "Rank";
        case "name":
        case "specialty":
            return option;
    }
}
