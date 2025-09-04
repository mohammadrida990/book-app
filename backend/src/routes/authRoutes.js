import express from "express";
import "dotenv/config";
import { login, register } from "../controllers/authControlers.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;
