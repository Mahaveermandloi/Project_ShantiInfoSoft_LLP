import { Router } from "express";
import {
  loginAdmin,
  logoutAdmin,
  registerUser,
} from "../controller/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginAdmin);
router.post("/logout", verifyJWT, logoutAdmin);

export default router;
