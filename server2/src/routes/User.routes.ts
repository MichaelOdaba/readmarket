import { Router } from "express";
import {
  getUserController,
  registerUserController,
} from "../controllers/User.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import { requireVerifyEmail } from "../middleware/requireVerifyEmail.js";

const userRouter = Router();
userRouter.post("/register", verifyFirebaseToken, registerUserController);

//get user route with verifyFirebaseToken middleware
userRouter.get("/get-user", verifyFirebaseToken, getUserController);

//verify email router

export default userRouter;
