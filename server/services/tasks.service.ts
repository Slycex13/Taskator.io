import { db } from "./db";

export async function postTask(
  name: string,
  checked: boolean,
  categoryId: number
) {
  return new Promise((resolve, reject) => {
    const checkedValue = checked ? 1 : 0;
    db.query(
      "INSERT INTO tasks (name, checked, categoryId) VALUES (?,?,?)",
      [name, checkedValue, categoryId],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export async function getTasks() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM tasks", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
}

export async function deleteTask(id: number) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
}

export async function updateTaskChecked(id: number, checked: boolean) {
  return new Promise((resolve, reject) => {
    const checkedValue = checked ? 1 : 0;
    db.query(
      "UPDATE tasks SET checked = ? WHERE id = ?",
      [checkedValue, id],
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      }
    );
  });
}

export async function updateTaskCategory(id: number, categoryId: number) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE tasks SET categoryId = ? WHERE id = ?",
      [categoryId, id],
      (err, rows) => {
        if (err) reject(err);
        else {
          resolve(rows);
        }
      }
    );
  });
}
