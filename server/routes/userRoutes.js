import express from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  editUserDetailsController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  getUserDetailsController,
} from "../controllers/userController.js";
import auth from "../middleware/Auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/logout", auth, logoutUserController);
userRouter.put("/edit", auth, editUserDetailsController);
userRouter.put("/change-password", auth, changePasswordController);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.post("/reset-password", resetPasswordController);
userRouter.put("/refresh-token", refreshTokenController);
userRouter.get("/get-user", auth, getUserDetailsController);

export default userRouter;
