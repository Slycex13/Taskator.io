import type { Item } from "../types/Item";
import TaskItem from "./TaskItem";

type TaskListProps = {
  items: Item[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskList({ items, onToggle, onDelete }: TaskListProps) {
  return (
    <ul className=" mb-4  flex flex-col gap-4">
      {items.map((item) => (
        <TaskItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
