import { Router } from "express";
import { registerUserController } from "../controllers/User.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const router = Router();
router.post("/register", verifyFirebaseToken, registerUserController);
export default router;
