import express from "express";
import "dotenv/config";
import {
  addBook,
  deleteBook,
  getBooks,
  getUserBooks,
} from "../controllers/booksController.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addBook);

router.get("/", protectRoute, getBooks);

router.get("/user", protectRoute, getUserBooks);

router.delete("/:id", protectRoute, deleteBook);

export default router;
