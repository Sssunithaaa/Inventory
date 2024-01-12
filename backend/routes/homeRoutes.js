import express from "express";
import { getNumbers } from "../controllers/homeController.js";
const router = express.Router();
router.get("/", getNumbers);
export default router;
