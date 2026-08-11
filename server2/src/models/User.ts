// Placeholder for Mongoose models
import { Schema, model } from "mongoose";
import { User } from "../types/user.types.js";

const userSchema = new Schema<User>({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>("User", userSchema);
