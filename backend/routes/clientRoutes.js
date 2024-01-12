import express from "express";
import {
  createClient,
  getClientsInfo,
} from "../controllers/clientController.js";
import { getAllClient } from "../controllers/clientController.js";
const router = express.Router();
router.post("/", createClient);
router.get("/", getClientsInfo);

export default router;
