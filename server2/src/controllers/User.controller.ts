// Controllers placeholder

import { ApiResponse } from "../types/Api.types.js";
import { AuthenticatedUser, loginUser, User } from "../types/user.types.js";
import { Response } from "express";
import { UserModel } from "../models/User.js";

//register user controller
export async function registerUserController(
  req: AuthenticatedUser,
  res: Response<ApiResponse<User>>
) {
  try {
    //destructure uid and email from firebaseUser
    const { uid, email } = req.user!;

    //destructure username, firstName, lastName from req.body
    const { username, firstName, lastName } = req.body;

    //check if user already exists in database
    const existingUser = await UserModel.findOne({ firebaseUid: uid });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //check if username already exists in database
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists, use another one",
      });
    }

    //create new user in database
    const newUser = await UserModel.create({
      firebaseUid: uid,
      email,
      username,
      firstName,
      lastName,
    });
    //check if newUser is created successfully
    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    //error handling
    console.error("Error in registerUser controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
//login user controller
export async function getUserController(
  req: AuthenticatedUser,
  res: Response<ApiResponse<User>>
) {
  //destructure uid  and email from firebaseUser
  const { uid } = req.user!;

  try {
    //find user in database
    const user = await UserModel.findOne({ firebaseUid: uid });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error("Error in getUser controller:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
