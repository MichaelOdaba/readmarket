//middle ware that requires email to be verified before accessing certain routes
import { Request, Response, NextFunction } from "express";
import { AuthenticatedUser } from "../types/user.types.js";
import { auth } from "firebase-admin";

export function requireVerifyEmail(
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) {
  //check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //check is email is verified
  if (!req.user.email_verified) {
    return res.status(403).json({ error: "Email not verified" });
  }
  next();
}
