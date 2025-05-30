import { useState } from "react";
import type { Item } from "../types/Item";
import { useDraggable } from "@dnd-kit/core";

type TaskItemProps = {
  item: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (name: string, id: number) => void;
  className?: string;
};

function TaskItem({
  item,
  onToggle,
  onDelete,
  onEdit,
  className,
}: TaskItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `task-${item.id}`,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(item.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmEdit = () => {
    setIsEditing(false);
    onEdit(inputValue, item.id); // appelle ta fonction de mise à jour
  };

  return (
    <li
      className={`bg-white shadow rounded-xl p-4 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4  ${
        className ?? ""
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-2 py-1 border rounded  border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-300"
          autoFocus
        />
      ) : (
        <p
          className={`text-lg break-words w-full ${
            item.checked ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {item.name}
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {isEditing ? (
          <button
            onClick={() => {
              handleConfirmEdit();
            }}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all"
          >
            OK
          </button>
        ) : (
          <button
            onClick={handleEditClick}
            disabled={item.checked}
            className={`
    px-4 py-2 rounded-lg text-white transition-all
    ${
      item.checked
        ? "bg-gray-500 cursor-none line-through"
        : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
    }
  `}
          >
            Éditer
          </button>
        )}

        <button
          onClick={() => {
            onToggle(item.id);
          }}
          className={`px-4 py-2  rounded-lg text-white transition-all whitespace-nowrap
                    ${
                      item.checked
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
        >
          {item.checked ? "À faire" : "Fait"}
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
