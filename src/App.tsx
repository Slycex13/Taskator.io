import { useEffect, useRef, useState } from "react";
import "./App.css";
import type { Item } from "./types/Item";
import type { Category } from "./types/category";
import ColumnList from "./components/ColumnList";
import { DndContext, DragOverlay } from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";
import TaskItem from "./components/TaskItem";

function App() {
  const idItemCounter = useRef(0);
  const idCategorieCounter = useRef(0);

  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const [categoriesInput, setCategoriesInput] = useState("");
  const [list, setList] = useState<Item[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Sécurité : vérifier qu’on a bien un drop valide
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Vérifie qu’on déplace bien une tâche vers une colonne
    if (!activeId.startsWith("task-") || !overId.startsWith("column-")) return;

    const taskId = parseInt(activeId.replace("task-", ""));
    const targetCategoryId = parseInt(overId.replace("column-", ""));

    setList((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, categoryId: targetCategoryId } : item
      )
    );

    setDraggingItem(null);
  }

  function onDelete(id: number) {
    setList(list.filter((item) => item.id !== id));
  }

  function onToggle(id: number) {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, check: !item.check } : item
      )
    );
  }

  function onAdd(name: string, categoryId: number) {
    idItemCounter.current++;
    setList([
      ...list,
      {
        id: idItemCounter.current,
        name: name,
        check: false,
        categoryId: categoryId,
      },
    ]);
  }

  function onDeleteCategory(id: number) {
    setCategories(categories.filter((cat) => cat.id !== id));
    setList(list.filter((item) => item.categoryId !== id));
  }

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
    const storedCategories = localStorage.getItem("categories");

    if (storedItems) {
      setList(JSON.parse(storedItems) as Item[]);
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories) as Category[]);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    localStorage.setItem("items", JSON.stringify(list));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [list, categories]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-md py-6 text-center h-24 ">
        <h1 className="text-4xl font-bold text-amber-600 ">📝 TASKATOR.IO</h1>
      </header>

      <div className="flex justify-end px-6 mt-6">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-amber-500 hover:bg-amber-600 transition-all text-white px-4 py-2 rounded-lg shadow"
          >
            Filtrer
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nouvelle catégorie..."
            value={categoriesInput}
            onChange={(e) => setCategoriesInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => {
              if (categoriesInput.trim() === "") return;
              idCategorieCounter.current++;
              setCategories([
                ...categories,
                { id: idCategorieCounter.current, name: categoriesInput },
              ]);
              setCategoriesInput("");
              console.log(categories);
            }}
            className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-lg shadow"
          >
            Ajouter
          </button>
        </div>
      </div>
      <DndContext
        onDragStart={({ active }) => {
          const id = parseInt(active.id.toString().replace("task-", ""));
          const found = list.find((item) => item.id === id);
          if (found) setDraggingItem(found);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setDraggingItem(null)}
      >
        <ColumnList
          items={list}
          onAdd={onAdd}
          onDelete={onDelete}
          onToggle={onToggle}
          onDeleteCategory={onDeleteCategory}
          categories={categories}
          draggingItem={draggingItem}
        />
        <DragOverlay>
          {draggingItem ? (
            <TaskItem
              item={draggingItem}
              onToggle={() => {}}
              onDelete={() => {}}
              className="min-w-fit bg-white rounded-xl p-4 shadow-xl pointer-events-none"
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      <footer className="absolute w-screen bottom-0 bg-white shadow-md text-center p-4 h-24 ">
        <h1 className="text-sm font-bold text-black">
          Made with ❤ at Marseille
        </h1>
      </footer>
    </div>
  );
}

export default App;
