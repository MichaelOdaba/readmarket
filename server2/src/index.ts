import express from "express";
import type { Request, Response } from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/User.routes.js";
import { initFirebase } from "./config/firebaseAdmin.js";
import { UserModel } from "./models/User.js";

dotenv.config();
//initialize firebase admin sdk
initFirebase();
const app = express();
app.use(express.json());
//configure cors with appropriate options and types
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});
app.get("/test-db", async (req, res) => {
  try {
    const users = await UserModel.find();

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database query failed",
    });
  }
});
app.use("/api/user", router);

const PORT = process.env.PORT || 3000;
//connect to database here if needed
await connectDB();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});

export default app;
