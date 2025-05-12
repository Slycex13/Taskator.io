import { db } from "./db";

export async function postCategory(name: string) {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name],
      (err, rows) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(rows);
        }
      }
    );
  });
}

export async function deleteCategory(id: number) {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tasks WHERE categoryId = ?", [id], (err) => {
      if (err) return reject(err);

      db.query("DELETE FROM categories WHERE id = ?", [id], (err2, rows2) => {
        if (err2) return reject(err2);
        return resolve(rows2);
      });
    });
  });
}

export async function getCategories() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM categories", (err, rows) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(rows);
      }
    });
  });
}
