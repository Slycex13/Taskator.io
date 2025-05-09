import { useEffect, useState } from "react";
import "./App.css";

function App() {
  type Item = { name: string; check: boolean };

  const [input, setInput] = useState("");
  const [list, setList] = useState<Item[]>([]);
  const [filtered, setFiltered] = useState<"all" | "checked" | "unchecked">(
    "all"
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const listDisplayed = list.filter((item) => {
    if (filtered === "checked") return item.check === true;
    if (filtered === "unchecked") return item.check === false;
    return true;
  });

  useEffect(() => {
    const data = localStorage.getItem("mylist");
    if (data) {
      setList(JSON.parse(data) as Item[]);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    localStorage.setItem("mylist", JSON.stringify(list));
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-md py-6 text-center">
        <h1 className="text-4xl font-bold text-amber-600">📝 Ma Liste</h1>
      </header>

      <div className="flex justify-end px-6 mt-6">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-amber-500 hover:bg-amber-600 transition-all text-white px-4 py-2 rounded-lg shadow"
          >
            Filtrer
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 flex flex-col animate-fade-in z-10">
              <button
                onClick={() => setFiltered("checked")}
                className="text-left hover:bg-gray-100 px-3 py-2 rounded"
              >
                ✔️ Fait
              </button>
              <button
                onClick={() => setFiltered("unchecked")}
                className="text-left hover:bg-gray-100 px-3 py-2 rounded"
              >
                🕐 À faire
              </button>
              <button
                onClick={() => setFiltered("all")}
                className="text-left hover:bg-gray-100 px-3 py-2 rounded"
              >
                📋 Tous
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 px-6">
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
              setList([...list, { name: input, check: false }]);
              setInput("");
            }}
            className="bg-green-500 hover:bg-green-600 transition-all text-white px-6 py-2 rounded-lg shadow"
          >
            Ajouter
          </button>
        </div>
      </div>

      <ul className="max-w-2xl mx-auto mt-10 px-6 flex flex-col gap-4">
        {listDisplayed.map((item, index) => (
          <li
            key={index}
            className="bg-white shadow rounded-xl p-4 animate-fade-in flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
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
                  const newList = [...list];
                  newList[index].check = !newList[index].check;
                  setList(newList);
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
                  const newList = [...list];
                  newList.splice(index, 1);
                  setList(newList);
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
