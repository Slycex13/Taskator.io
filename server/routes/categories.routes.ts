import { Router } from "express";
import {
  getCategoriesHandler,
  createCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/categories.controller";

const router = Router();

router.get("/", getCategoriesHandler);
router.post("/", createCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export default router;
