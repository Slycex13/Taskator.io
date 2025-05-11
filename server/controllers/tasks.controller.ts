import {
  postTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../services/tasks.service";
import { Request, Response } from "express";

export async function getTasksHandler(req: Request, res: Response) {
  await getTasks();
  res.json({ message: `task getted` });
}

export async function createTaskHandler(req: Request, res: Response) {
  const { name, checked, categorieId } = req.body;
  await postTask(name, checked, categorieId);
  res.json({ message: "task added" });
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteTask(id);
  res.json({ message: `task ${id} delete` });
}

export async function updateTaskHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { checked } = req.body;
  await updateTask(id, checked);
  res.json({ message: `task ${id} updated` });
}
