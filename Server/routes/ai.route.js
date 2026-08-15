import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { generateCourse } from "../controllers/ai.control.js";

const router = express.Router();

router.route("/generate-course").post(generateCourse);

export default router;