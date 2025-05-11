import { Router } from "express";
import {
  getTasksHandler,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from "../controllers/tasks.controller";

const router = Router();

router.get("/", getTasksHandler);
router.post("/", createTaskHandler);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
