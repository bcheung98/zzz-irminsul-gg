import { HTMLAttributes } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Component imports
import PlannerListItem from "./PlannerListItem";

// Type imports
import { TPlannerListItem } from "./PlannerList";

type PlannerListSortableItemProps = {
    item: TPlannerListItem;
} & HTMLAttributes<HTMLDivElement>;

function PlannerListSortableItem({
    item,
    ...props
}: PlannerListSortableItemProps) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
        touchAction: "manipulation",
    };

    return (
        <PlannerListItem
            item={item}
            ref={setNodeRef}
            style={styles}
            isDragging={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}

export default PlannerListSortableItem;
