import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
} from "../controllers/suppliersController.js";
const router = express.Router();

router.get("/", getAllSuppliers);

router.post("/", createSupplier);

router.delete("/:id", deleteSupplier);
export default router;
