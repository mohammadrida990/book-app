import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import connectDB from "./lib/db.js";
import cors from "cors";
import job from "./lib/cron.js";

const app = express();
job.start(); // Start the cron job

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
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
