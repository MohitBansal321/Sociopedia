import express from "express";
import { login } from "../controllers/auth.js";

// Route for logging in the user
const router = express.Router();

router.post("/login", login);
export default router;
