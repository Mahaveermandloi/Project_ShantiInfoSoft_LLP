import { Router } from "express";
import { registerUser } from "../controller/admin.controller.js";

const router = Router();

router.post("/register-user", registerUser);

export default router;
