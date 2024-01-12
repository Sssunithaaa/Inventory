import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactions,
  getTransactionById,
} from "../controllers/transactionsController.js";
const router = express.Router();

router.get("/", getAllTransactions);
router.get("/:transaction_id", getTransactionById);
router.post("/", createTransaction);

router.delete("/:transaction_id", deleteTransaction);
export default router;
