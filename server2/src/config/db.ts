import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri: any = process.env.MONGODB_URI;

  //check if mongoUri is defined
  if (!mongoUri) {
    console.error("MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri);

    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");
  } catch (error) {
    //log error and exit process
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
