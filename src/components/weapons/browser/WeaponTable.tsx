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
import { baseATKScaling, subStatScaling } from "data/weaponStats";
import { RarityMap } from "data/common";

// Type imports
import { Weapon } from "types/weapon";

export type WeaponRow = Pick<
    Weapon,
    "id" | "name" | "displayName" | "rarity" | "specialty"
>;

function WeaponTable({ weapons }: { weapons: Weapon[] }) {
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
        { id: "atk", label: "Base ATK" },
        { id: "subStat", label: "Substat" },
    ];

    const rows = weapons.map((wep) => {
        const baseATK = baseATKScaling[wep.stats.atk].slice(-1)[0];
        const subStat =
            subStatScaling[wep.rarity][wep.stats.subStat].slice(-1)[0];
        const subStatString = `${wep.stats.subStat} ${subStat}`;
        return {
            id: wep.id,
            name: wep.name,
            displayName: wep.displayName,
            rank: RarityMap[wep.rarity],
            rarity: wep.rarity,
            specialty: wep.specialty,
            atk: baseATK,
            subStat: subStatString,
        };
    });

    return (
        <MainContentBox
            title={`${weapons.length} ${
                weapons.length === 1 ? "W-Engine" : "W-Engines"
            }`}
            contentPadding={0}
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
