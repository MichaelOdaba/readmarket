import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { AuthenticatedUser } from "../types/user.types.js";
import { log } from "console";

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ error: "Missing token" });

  const idToken = authHeader.split(" ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    // log("Decoded token:", decoded); // Log the decoded token for debugging
    // // attach as needed
    (req as AuthenticatedUser).user = decoded;
    return next();
  } catch (err) {
    console.error("Error verifying Firebase token:", err); // Log the error for debugging

    return res.status(401).json({ error: "Invalid token" });
  }
}
