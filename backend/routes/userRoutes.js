import express from "express"
import {registerUser,loginUser, updateProfile} from "../controllers/userController.js";
import { authGuard } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/update',authGuard,updateProfile)
export default router