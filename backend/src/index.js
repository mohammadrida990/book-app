import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import connectDB from "./lib/db.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3001;

app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Server is running on port", port);

  connectDB();
});
