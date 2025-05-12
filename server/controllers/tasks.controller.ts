import {
  postTask,
  getTasks,
  updateTaskChecked,
  deleteTask,
  updateTaskCategory,
  updateTaskName,
} from "../services/tasks.service";
import { Request, Response } from "express";

export async function getTasksHandler(req: Request, res: Response) {
  const tasks = await getTasks();
  res.json(tasks);
}

export async function createTaskHandler(req: Request, res: Response) {
  const { name, checked, categoryId } = req.body;
  await postTask(name, checked, categoryId);
  res.json({ message: "task added" });
}

export async function deleteTaskHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  await deleteTask(id);
  res.json({ message: `task ${id} delete` });
}

export async function updateTaskHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const { checked, categoryId, name } = req.body;

  if (typeof checked !== "undefined") {
    await updateTaskChecked(id, checked);
  }
  if (typeof categoryId !== "undefined") {
    await updateTaskCategory(id, categoryId);
  }
  if (typeof name !== "undefined") {
    await updateTaskName(id, name);
  }
  res.json({ message: `task ${id} updated` });
}
