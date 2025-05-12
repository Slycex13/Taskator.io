import { useState } from "react";
import type { Category } from "../types/category";
import type { Item } from "../types/Item";
import TaskList from "./TaskList";
import { useDroppable } from "@dnd-kit/core";

type ColumnItemProps = {
  category: Category;
  items: Item[];
  onAdd: (name: string, categoryId: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (name: string, id: number) => void;
  onDeleteCategory: (id: number) => void;
  draggingItem: Item | null;
};

function ColumnItem({
  category,
  items,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  onDeleteCategory,
  draggingItem,
}: ColumnItemProps) {
  const [input, setInput] = useState("");

  const { setNodeRef } = useDroppable({
    id: `column-${category.id}`,
  });

  return (
    <div
      key={category.id}
      className="flex flex-col bg-white rounded-lg shadow mb-4 w-full min-h-[500px]"
    >
      <div className="relative flex uppercase rounded-t-lg p-4 text-sm text-white justify-center bg-amber-400">
        <h2 className="text-3xl">{category.name}</h2>
        <button
          onClick={() => {
            onDeleteCategory(category.id);
          }}
          className="absolute text-3xl right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hover:scale-110 duration-300 hover:-rotate-3"
        >
          ❌
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">Items: {items.length}</p>
      <div className="px-6 my-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nouvel élément..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => {
              if (input.trim() === "") return;
              onAdd(input, category.id);
              setInput("");
            }}
            className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-lg shadow"
          >
            Ajouter
          </button>
        </div>
      </div>
      <div ref={setNodeRef} className="flex-1  px-6">
        <TaskList
          items={items}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          draggingItem={draggingItem}
        />
      </div>
    </div>
  );
}

export default ColumnItem;
