import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODBURL) {
  throw new Error("pls provide mongoDB connection string");
}
export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODBURL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
