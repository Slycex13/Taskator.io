import type { Item } from "../types/Item";
import TaskItem from "./TaskItem";

type TaskListProps = {
  items: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (name: string, id: number) => void;
  draggingItem: Item | null;
};

function TaskList({
  items,
  onToggle,
  onDelete,
  onEdit,
  draggingItem,
}: TaskListProps) {
  return (
    <ul className=" mb-4  flex flex-col gap-4">
      {Array.isArray(items) &&
        items.map((item) =>
          draggingItem?.id === item.id ? null : (
            <TaskItem
              key={item.id}
              item={item}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          )
        )}
    </ul>
  );
}

export default TaskList;
