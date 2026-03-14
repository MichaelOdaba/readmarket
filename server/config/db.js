import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URL) {
  throw new Error("pls provide mongoDB connection string");
}
export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
