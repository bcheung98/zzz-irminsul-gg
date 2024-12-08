// Component imports
import WeaponStatsTable from "./table/WeaponStatsTable";
import MainContentBox from "custom/MainContentBox";

// MUI imports

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponTable({ weapon }: WeaponProps) {
    return (
        <MainContentBox title="Stats">
            <WeaponStatsTable weapon={weapon} />
        </MainContentBox>
    );
}

export default WeaponTable;
