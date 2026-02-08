import express from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
} from "../controllers/userController.js";
import auth from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);

export default userRouter;
