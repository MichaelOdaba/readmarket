import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "server is running on port" + PORT });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
