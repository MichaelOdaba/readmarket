import admin from "firebase-admin";
import { Request } from "express";
//user types
export interface User {
  firebaseUid: string;
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  mobile?: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
//firebase authed request type
export interface AuthenticatedUser extends Request {
  user?: admin.auth.DecodedIdToken;
}
export interface loginUser {
  email: string;
  password: string;
}
