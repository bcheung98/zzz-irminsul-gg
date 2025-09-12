import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    DragEndEvent,
    TouchSensor,
    MouseSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

// Component imports
import PlannerListSortableItem from "./PlannerListSortableItem";

// MUI imports
import { Stack } from "@mui/material";

// Helper imports
import { useAppSelector, useAppDispatch } from "helpers/hooks";
import { getSelectedCharacters, getSelectedWeapons } from "reducers/planner";
import { setItems as setPlannerItems } from "reducers/planner";

// Type imports
import { Rarity } from "types/_common";
import { CharacterCostObject, WeaponCostObject } from "types/costs";

export interface TPlannerListItem {
    id: string;
    name: string;
    rarity: Rarity;
    imgURL: string;
}

function PlannerList({ data }: { data: string[] }) {
    const characters = useAppSelector(getSelectedCharacters);
    const weapons = useAppSelector(getSelectedWeapons);

    const dispatch = useAppDispatch();

    function getItemData(item: string): TPlannerListItem {
        const [variant] = item.split("_");
        let data: CharacterCostObject | WeaponCostObject;
        let name: string;
        let imgURL: string;
        if (variant === "character") {
            data = characters.find((char) => char.id === item)!;
            name = data.fullName;
            imgURL = `characters/icons/${data.name}`;
        } else {
            data = weapons.find((wep) => wep.id === item)!;
            name = data.displayName;
            imgURL = `w-engines/${data.name}`;
        }
        return {
            id: item,
            name,
            rarity: data.rarity,
            imgURL,
        };
    }

    const list = [...data].map((d) => getItemData(d));

    const [items, setItems] = useState<TPlannerListItem[]>(list);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeItem = items.find((item) => item.id === active.id);
        const overItem = items.find((item) => item.id === over.id);

        if (!activeItem || !overItem) {
            return;
        }

        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);

        if (activeIndex !== overIndex) {
            setItems((prev) =>
                arrayMove<TPlannerListItem>(prev, activeIndex, overIndex)
            );
        }
    };

    useEffect(() => {
        dispatch(setPlannerItems(items.map((i) => i.id)));
    }, [items]);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <Stack
                    spacing={1}
                    sx={{
                        height: "50vh",
                        maxHeight: "600px",
                        overflowY: "auto",
                    }}
                >
                    {items.map((item) => (
                        <PlannerListSortableItem key={item.id} item={item} />
                    ))}
                </Stack>
            </SortableContext>
        </DndContext>
    );
}

export default PlannerList;
