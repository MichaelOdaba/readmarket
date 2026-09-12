import { NextFunction, Response } from "express";
import { UserModel } from "../models/User.js";
import { AuthenticatedUser } from "../types/user.types.js";

const requireAdmin = async (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  const firebaseUid = req.user?.uid;

 
  if (!firebaseUid) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const user = await UserModel.findOne({ firebaseUid }).select("role");

  if (user?.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admin privileges required.",
    });
  }

  return next();
};

export default requireAdmin;