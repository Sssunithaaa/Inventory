import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from "../controllers/categoriesController.js";
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);

export default router;
