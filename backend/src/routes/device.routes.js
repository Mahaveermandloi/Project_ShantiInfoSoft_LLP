import { Router } from "express";
import {
  getDevice,
  createDevice,
  editDevice,
  deleteDevice,
} from "../controller/device.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// GET all devices
router.get("/get-device", verifyJWT, getDevice);

// POST create a new device
router.post("/create-device", verifyJWT, createDevice);

// PUT update a device by _id
router.put("/edit-device/:id", verifyJWT, editDevice);

// DELETE delete a device by _id
router.delete("/delete-device/:id", verifyJWT, deleteDevice);

export default router;
