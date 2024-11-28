// Component imports
import CharacterStatsTable from "./table/CharacterStatsTable";
import MainContentBox from "custom/MainContentBox";

// MUI imports

// Type imports
import { CharacterProps } from "types/character";

function CharacterTable({ character }: CharacterProps) {
    return (
        <MainContentBox title="Stats">
            <CharacterStatsTable character={character} />
        </MainContentBox>
    );
}

export default CharacterTable;
