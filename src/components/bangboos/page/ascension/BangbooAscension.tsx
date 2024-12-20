// Component imports
import BangbooStatsTable from "./BangbooStatsTable";
import MainContentBox from "custom/MainContentBox";

// Type imports
import { BangbooProps } from "types/bangboo";

function BangbooAscension({ bangboo }: BangbooProps) {
    return (
        <MainContentBox title="Stats">
            <BangbooStatsTable bangboo={bangboo} />
        </MainContentBox>
    );
}

export default BangbooAscension;
