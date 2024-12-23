import React from "react";

// Component imports
import WeaponTableRow from "./WeaponTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Helper imports
import { mainStats, subStats } from "data/weaponStats";
import { RarityMap } from "data/common";
import { useAppSelector } from "helpers/hooks";
import { selectCharacters } from "reducers/character";

// Type imports
import { Weapon } from "types/weapon";

export type WeaponRow = Pick<
    Weapon,
    "id" | "name" | "displayName" | "rarity" | "specialty"
>;

function WeaponTable({ weapons }: { weapons: Weapon[] }) {
    const characters = useAppSelector(selectCharacters);

    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState("rank");

    const handleRequestSort = (
        _: React.BaseSyntheticEvent,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "displayName", label: "Name" },
        { id: "rank", label: "Rank" },
        { id: "specialty", label: "Specialty" },
        { id: "signatureFullName", label: "Signature" },
        { id: "mainStat", label: "Base Stat" },
        { id: "subStat", label: "Advanced Stat" },
    ];

    const rows = weapons.map((wep) => {
        const mainStat = `${wep.stats.mainStat.type}:<br />${
            mainStats[wep.stats.mainStat.type].scaling[
                wep.stats.mainStat.value
            ].slice(-1)[0]
        }`;
        const subStat = `${wep.stats.subStat}:<br />${
            subStats[wep.stats.subStat].scaling[wep.rarity].slice(-1)[0]
        }`;
        const character = characters.find(
            (char) => char.name === wep.signature
        );
        return {
            id: wep.id,
            name: wep.name,
            displayName: wep.displayName,
            rank: RarityMap[wep.rarity],
            rarity: wep.rarity,
            specialty: wep.specialty,
            signature: wep.signature || "_",
            signatureFullName: character?.fullName || "_",
            mainStat: mainStat,
            subStat: subStat,
        };
    });

    return (
        <MainContentBox
            title={`${weapons.length} ${
                weapons.length === 1 ? "W-Engine" : "W-Engines"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows.sort(getComparator(order, orderBy)).map((row) => (
                            <WeaponTableRow key={row.displayName} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default WeaponTable;
