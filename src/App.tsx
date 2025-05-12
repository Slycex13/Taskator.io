import { useEffect, useState } from "react";
import "./App.css";
import type { Item } from "./types/Item";
import type { Category } from "./types/category";
import ColumnList from "./components/ColumnList";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import TaskItem from "./components/TaskItem";

function App() {
  const [draggingItem, setDraggingItem] = useState<Item | null>(null);
  const [categoriesInput, setCategoriesInput] = useState("");
  const [list, setList] = useState<Item[]>([]);
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

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoryId: targetCategoryId }),
    }).then(() => loadTask());

    setList((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, categoryId: targetCategoryId } : item
      )
    );

    setDraggingItem(null);
  }

  function onDeleteTask(id: number) {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => reload());
  }

  function onCheckTask(id: number) {
    const item = list.find((i) => i.id === id);
    if (!item) return;

    const updatedChecked = !item.checked;

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked: updatedChecked }),
    }).then(() => loadTask());
  }

  function onAddCategory(name: string) {
    fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
      }),
    }).then(() => reload());
  }
  function onAddTask(name: string, categoryId: number) {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        checked: false,
        categoryId,
      }),
    }).then(() => reload());
  }

  function loadTask() {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())

      .then((data) => {
        setList(data);
      });
  }

  function reload() {
    loadCategories();
    loadTask();
  }

  function loadCategories() {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())

      .then((data) => {
        setCategories(data);
      });
  }

  function onDeleteCategory(id: number) {
    fetch(`http://localhost:3000/categories/${id}`, {
      method: "DELETE",
    }).then(() => {
      loadCategories();
      loadTask();
    });
  }

  useEffect(() => {
    reload();
  }, []);

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
              onAddCategory(categoriesInput);
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
          onAdd={onAddTask}
          onDelete={onDeleteTask}
          onToggle={onCheckTask}
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
      <footer className="fixed w-screen bottom-0 bg-white shadow-md text-center p-4 h-24 ">
        <h1 className="text-sm font-bold text-black">
          Made with ❤ at Marseille
        </h1>
      </footer>
    </div>
  );
}

export default App;
