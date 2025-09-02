import { BaseSyntheticEvent, useEffect, useState } from "react";

// Component imports
import BannerListRow from "./BannerListRow";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import ToggleButtons from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";
import { StyledMenuItem } from "styled/StyledMenu";
import { StyledSwitch } from "styled/StyledSwitch";
import { StyledTooltip } from "styled/StyledTooltip";

// MUI imports
import {
    useTheme,
    Autocomplete,
    IconButton,
    Stack,
    Divider,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";
import { selectWeapons } from "reducers/weapon";
import { selectCharacterBanners, selectWeaponBanners } from "reducers/banner";
import { createBannerData } from "helpers/createBannerData";
import { sortBy } from "helpers/utils";
import { getBackgroundColor, getRarityColor } from "helpers/rarityColors";

// Type imports
import { Banner, BannerData, BannerOption, BannerType } from "types/banner";

function BannerList({ type }: { type: BannerType }) {
    const theme = useTheme();

    const banners =
        type === "character"
            ? useAppSelector(selectCharacterBanners)
            : useAppSelector(selectWeaponBanners);

    const characters = useAppSelector(selectCharacters);
    const weapons = useAppSelector(selectWeapons);
    const loading = [...characters, ...weapons].length === 0;

    const [rows, setRows] = useState<BannerData[]>([]);

    const [values, setValue] = useState<BannerOption[]>([]);
    const options = createOptions(banners);

    const [selected, setSelected] = useState(true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const handleDirectionChange = (
        _: BaseSyntheticEvent,
        newDirection: "asc" | "desc"
    ) => {
        if (newDirection !== null) {
            setSortDirection(newDirection);
        }
    };

    useEffect(() => {}, [characters, weapons]);

    useEffect(() => {
        setRows(createBannerRows(banners, values));
    }, [banners, values, selected, sortDirection]);

    function createBannerRows(banners: Banner[], searchValue: BannerOption[]) {
        let rowData: BannerData[] = [];
        banners.forEach((banner) => {
            const fiveStars = banner.fiveStars.map((item) =>
                createBannerData(item, type, characters, weapons)
            );
            const fourStars = banner.fourStars.map((item) =>
                createBannerData(item, type, characters, weapons)
            );
            rowData.push({
                ...banner,
                fiveStars: fiveStars,
                fourStars: fourStars,
            });
        });
        if (searchValue.length > 0) {
            rowData = rowData.filter((banner) => {
                function filterFn(item: BannerOption) {
                    return [
                        ...banner.fiveStars.map((item) => item.name),
                        ...banner.fiveStars.map((item) => item.displayName),
                        ...banner.fourStars.map((item) => item.name),
                        ...banner.fourStars.map((item) => item.displayName),
                    ].includes(item.name);
                }
                if (selected) {
                    return searchValue.every(filterFn);
                } else {
                    return searchValue.some(filterFn);
                }
            });
        }
        if (sortDirection === "asc") {
            rowData = rowData.reverse();
        }
        return rowData;
    }

    function createOptions(banners: Banner[]) {
        const options = [
            ...new Set(banners.map((banner) => banner.fiveStars).flat()),
            ...new Set(banners.map((banner) => banner.fourStars).flat()),
        ]
            .map((id) => createBannerData(id, type, characters, weapons))
            .sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.displayName, a.displayName)
            );
        return options;
    }

    const smallIconStyle = { width: "16px", height: "16px" };

    return (
        <>
            <Autocomplete
                multiple
                autoComplete
                filterSelectedOptions
                options={options}
                getOptionLabel={(option) => option.displayName}
                filterOptions={(options, { inputValue }) =>
                    options.filter(
                        (option) =>
                            option.name
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase()) ||
                            option.displayName
                                .toLocaleLowerCase()
                                .includes(inputValue.toLocaleLowerCase())
                    )
                }
                noOptionsText={
                    type === "character" ? "No Agents" : "No W-Engines"
                }
                value={values}
                isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                }
                onChange={(_: any, newValue: BannerOption[] | null) =>
                    setValue(newValue as BannerOption[])
                }
                renderInput={(params) => (
                    <SearchBar
                        params={params}
                        placeholder={
                            type === "character" ? "Agents" : "W-Engines"
                        }
                        inputIcon={
                            type === "character" ? (
                                <Image
                                    src="icons/Characters"
                                    alt="Agents"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "64px",
                                    }}
                                />
                            ) : (
                                <Image
                                    src="icons/W-Engine"
                                    alt="W-Engines"
                                    style={{
                                        width: "32px",
                                        marginLeft: "4px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor,
                                        borderRadius: "64px",
                                    }}
                                />
                            )
                        }
                    />
                )}
                renderOption={(props, option) => (
                    <StyledMenuItem
                        {...props}
                        key={option.displayName}
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.menu.hover,
                            },
                            "&:not(:last-child)": {
                                borderBottom: `1px solid ${theme.border.color.primary}`,
                            },
                        }}
                    >
                        <Stack spacing={2} direction="row" alignItems="center">
                            <Stack
                                spacing={1}
                                sx={{
                                    p: "4px",
                                    borderRadius: "16px",
                                    backgroundColor:
                                        theme.appbar.backgroundColor,
                                }}
                            >
                                {option.element && (
                                    <Image
                                        src={`elements/${option.element}`}
                                        alt={option.element}
                                        style={smallIconStyle}
                                        tooltip={option.element}
                                    />
                                )}
                                <Image
                                    src={`specialties/${option.specialty}`}
                                    alt={option.specialty}
                                    style={smallIconStyle}
                                    tooltip={option.specialty}
                                />
                            </Stack>
                            <Image
                                src={
                                    type === "character"
                                        ? `characters/icons/${option.name}`
                                        : `w-engines/${option.name}`
                                }
                                alt={option.name}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    padding:
                                        type === "character" ? "0px" : "4px",
                                    border: `2px solid ${getRarityColor(
                                        option.rarity
                                    )}`,
                                    borderRadius:
                                        theme.mainContentBox.borderRadius,
                                    backgroundColor: theme.background(2),
                                    boxShadow: `inset 0 0 24px 16px ${getBackgroundColor(
                                        option.rarity
                                    )}`,
                                }}
                            />
                            <TextStyled noWrap>{option.displayName}</TextStyled>
                        </Stack>
                    </StyledMenuItem>
                )}
            />
            <FlexBox sx={{ my: "8px", height: "30px" }}>
                <StyledSwitch
                    checked={selected}
                    onChange={handleSelect}
                    sx={{ mt: "3px" }}
                />
                <TextStyled variant="body2-styled">
                    Toggle "AND" Filter
                </TextStyled>
                <StyledTooltip
                    title="If toggled, will filter banners that only contain all selected items."
                    arrow
                    placement="top"
                >
                    <IconButton disableRipple>
                        <HelpIcon />
                    </IconButton>
                </StyledTooltip>
            </FlexBox>
            <MainContentBox
                title={
                    <FlexBox
                        sx={{
                            width: "100%",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextStyled sx={{ color: theme.appbar.color }}>
                            {`${type === "character" ? "Agent" : "W-Engine"}
                            Banner`}
                        </TextStyled>
                        <ToggleButtons
                            color="primary"
                            buttons={[
                                {
                                    value: "asc",
                                    icon: <ArrowUpwardIcon fontSize="small" />,
                                },
                                {
                                    value: "desc",
                                    icon: (
                                        <ArrowDownwardIcon fontSize="small" />
                                    ),
                                },
                            ]}
                            value={sortDirection}
                            exclusive
                            onChange={handleDirectionChange}
                            highlightOnHover={false}
                        />
                    </FlexBox>
                }
                contentProps={{ padding: 0 }}
            >
                <Stack divider={<Divider />}>
                    {rows.map((row, idx) => (
                        <BannerListRow
                            key={idx}
                            loading={loading}
                            type={type}
                            row={row}
                        />
                    ))}
                </Stack>
            </MainContentBox>
        </>
    );
}

export default BannerList;
