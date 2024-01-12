import express from "express";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();
router.get("/", getAllProducts);

router.post("/", createProduct);

router.delete("/:product_id", deleteProduct);

export default router;
