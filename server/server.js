import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "server is running on port" + PORT });
});
app.use("/api/user/", userRouter);
connectDB()
  .then(console.log("DB connected successfully on " + process.env.MONGODBURL))
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  );
