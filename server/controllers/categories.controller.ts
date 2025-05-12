import {
  getCategories,
  deleteCategory,
  postCategory,
} from "../services/categories.service";

import { Request, Response } from "express";

export async function getCategoriesHandler(req: Request, res: Response) {
  const categories = await getCategories();
  res.json(categories);
}

export async function createCategoryHandler(req: Request, res: Response) {
  const { name } = req.body;
  await postCategory(name);
  res.json({ message: "category added" });
}

export async function deleteCategoryHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteCategory(id);
  res.json({ message: `task ${id} delete` });
}
