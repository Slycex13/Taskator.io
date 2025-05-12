import type { Category } from "../types/category";
import type { Item } from "../types/Item";
import ColumnItem from "./ColumnItem";

type ColumnListProps = {
  categories: Category[];
  items: Item[];
  onAdd: (name: string, categoryId: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onDeleteCategory: (id: number) => void;
  draggingItem: Item | null;
};

function ColumnList({
  categories,
  items,
  onAdd,
  onToggle,
  onDelete,
  onDeleteCategory,
  draggingItem,
}: ColumnListProps) {
  return (
    <div className="sm:flex gap-4 p-4 overflow-x-auto w-full justify-between">
      {Array.isArray(categories) &&
        categories.map((category) => (
          <ColumnItem
            key={category.id}
            category={category}
            items={items.filter((item) => item.categoryId === category.id)}
            onAdd={onAdd}
            onToggle={onToggle}
            onDelete={onDelete}
            onDeleteCategory={onDeleteCategory}
            draggingItem={draggingItem}
          />
        ))}
    </div>
  );
}

export default ColumnList;
