import { Router } from "express";
import {
  getUserController,
  registerUserController,
} from "../controllers/User.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";

const router = Router();
router.post("/register", verifyFirebaseToken, registerUserController);
export default router;
//get user route with verifyFirebaseToken middleware
router.get("/get-user", verifyFirebaseToken, getUserController);
