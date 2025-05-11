import type { Item } from "../types/Item";
import { useDraggable } from "@dnd-kit/core";

type TaskItemProps = {
  item: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  className?: string;
};

function TaskItem({ item, onToggle, onDelete, className }: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `task-${item.id}`,
  });
  return (
    <li
      className={`bg-white shadow rounded-xl p-4 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4  ${
        className ?? ""
      }`}
    >
      <p
        className={`text-lg break-words w-full ${
          item.check ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {item.name}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <button
          onClick={() => {
            onToggle(item.id);
          }}
          className={`px-4 py-2  rounded-lg text-white transition-all whitespace-nowrap
                    ${
                      item.check
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
        >
          {item.check ? "À faire" : "Fait"}
        </button>
        <button
          onClick={() => {
            onDelete(item.id);
          }}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
        >
          Supprimer
        </button>
      </div>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={{
          transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
          zIndex: transform ? 50 : "auto",
        }}
        className="cursor-grab text-xl hover:scale-120 "
      >
        ⠿
      </div>
    </li>
  );
}

export default TaskItem;
