import express from "express";

import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.json({ message: "server is running on port" + PORT });
});
app.use("/api/user/", userRouter);
app.use("/api/notification/", notificationRouter);
connectDB()
  .then(console.log("DB connected successfully on " + process.env.MONGODB_URL))
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  );
