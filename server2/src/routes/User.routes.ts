import { Router } from "express";
import {
  editUserProfileController,
  getUserController,
  registerUserController,
} from "../controllers/User.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import { requireVerifyEmail } from "../middleware/requireVerifyEmail.js";

const userRouter = Router();
userRouter.post("/register", verifyFirebaseToken, registerUserController);

//get user route with verifyFirebaseToken middleware
userRouter.get("/get-user", verifyFirebaseToken, getUserController);

userRouter.put("/edit-user", verifyFirebaseToken, editUserProfileController);

//verify email router

export default userRouter;
