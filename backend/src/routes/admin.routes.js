import { Router } from "express";
import {
  getDetails,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controller/admin.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

import { deviceUpload } from "../middleware/mutler.middleware.js";
const router = Router();

router.post("/register", registerAdmin);
router.post("/login", deviceUpload.any(), loginAdmin);
router.post("/logout", verifyJWT, deviceUpload.any(), logoutAdmin);

router.get("/get-details", verifyJWT, getDetails);

export default router;
