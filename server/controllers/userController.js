import bcryptjs from "bcryptjs";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { createNotificationController } from "./notificationController.js";
export async function registerUserController(req, res) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "pls fill all the required fields",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "This user already exists",
        success: false,
      });
    }

    const checkPasswordMatch = password === confirmPassword;
    if (!checkPasswordMatch) {
      return res.status(400).json({
        message: "confirm password and password do not match ",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const registeredUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Create welcome notification
    await createNotificationController(
      registeredUser._id,
      "REGISTER",
      "Welcome to ReadMarket!",
      `Welcome ${registeredUser.firstName}! Your account has been created successfully.`
    );

    console.log(registeredUser);
    return res.status(201).json({
      message: `new user ${registeredUser.firstName} created successfully`,
      success: true,
      data: registeredUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while registering the user",
      success: false,
      error: error.message || error,
    });
  }
}
export async function registerAdminController(req, res) {
  try {
    const user = req.userId;
    const role = req.userRole;

    if (role !== "ADMIN") {
      return res.status(403).json({
        message: "only admins can create other admin accounts",
        success: false,
      });
    }

    //deconstruct the required fields from the request body
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "pls fill all the required fields",
        success: false,
      });
    }
    //check if a user with the provided email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "This user already exists",
        success: false,
      });
    }
    //check if the password and confirm password fields match
    const checkPasswordMatch = password === confirmPassword;
    if (!checkPasswordMatch) {
      return res.status(400).json({
        message: "confirm password and password do not match ",
        success: false,
      });
    }
    //hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10);
    //create a new user in the database with the role of ADMIN
    const registeredAdmin = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });
    return res.status(201).json({
      message: `new admin ${registeredAdmin.firstName} created successfully`,
      success: true,
      data: registeredAdmin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while registering the admin",
      success: false,
      error: error.message || error,
    });
  }
}
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "pls fill the required fields",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "This user does not exist",
        success: false,
      });
    }
    if (user.status !== "ACTIVE") {
      return res.status(400).json({
        message: "this account is not active",
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "wrong password",
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id, user.role);
    const refreshToken = await generateRefreshToken(user._id, user.role);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", refreshToken, cookieOptions);

    const updateUserModel = await userModel.findByIdAndUpdate(user._id, {
      last_login_date: new Date(),
      refresh_token: refreshToken,
    });

    console.log(user.role);

    return res.status(200).json({
      message: `${user.firstName} login successful`,
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "an error occured when loggin in",
      success: false,
      error: error.message || error,
    });
  }
}

export async function logoutUserController(req, res) {
  try {
    const userId = req.userId;
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("refresh_token", cookieOptions);
    res.clearCookie("access_token", cookieOptions);

    const clearRefreshTokenFromDB = await userModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });
    return res.status(200).json({
      message: "logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while logging out",
      success: false,
      error: error.message,
    });
  }
}
export async function editUserDetailsController(req, res) {
  try {
    const userId = req.userId;
    const { firstName, lastName, email, mobile, avatar } = req.body;

    console.log("EditUser - userId:", userId);
    console.log("EditUser - Request body:", {
      firstName,
      lastName,
      email,
      mobile,
      avatar,
    });

    if (!firstName && !lastName && !email && !mobile && !avatar) {
      return res.status(400).json({
        message: "you did not provide any fields to update",
        success: false,
      });
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (avatar) updateData.avatar = avatar;

    console.log("EditUser - updateData:", updateData);

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    console.log("EditUser - Updated user:", updatedUser);

    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    // Create profile update notification
    await createNotificationController(
      userId,
      "PROFILE_UPDATE",
      "Profile Updated",
      "Your profile has been updated successfully."
    );

    return res.status(200).json({
      message: "user details updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error("EditUser - Error:", error);
    return res.status(500).json({
      message: "an error occurred while editing user details",
      success: false,
      error: error.message,
    });
  }
}
export async function changePasswordController(req, res) {}
export async function forgotPasswordController(req, res) {}
export async function resetPasswordController(req, res) {}
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refresh_token || req.headers.authorization?.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "you are not authenticated",
        success: false,
      });
    }
    const verifyRefreshToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verifyRefreshToken) {
      return res.status(403).json({
        message: "refresh token is not valid",
        success: false,
      });
    }
    const userId = verifyRefreshToken?.id;
    const userRole = verifyRefreshToken?.role;
    const newAccessToken = await generateAccessToken(userId, userRole);
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("access_token", newAccessToken, cookieOptions);
    return res.status(200).json({
      message: "access token refreshed successfully",
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while refreshing access token",
      success: false,
      error: error.message,
    });
  }
}
export async function getUserDetailsController(req, res) {
  try {
    const userId = req.userId;
    const userDetails = await userModel.findById(userId);
    return res.status(200).json({
      message: "user details fetched successfully",
      success: true,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: "an error occurred while fetching user details",
      success: false,
      error: error.message,
    });
  }
}
