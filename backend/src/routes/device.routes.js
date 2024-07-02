import { Router } from "express";
import {
  getDevice,
  createDevice,
  editDevice,
  deleteDevice,
  assignDevice,
  getDeviceById,
  makeDeviceAvailable,
} from "../controller/device.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deviceUpload } from "../middleware/mutler.middleware.js";
const router = Router();

// GET all devices
router.get("/get-device", verifyJWT, getDevice);

router.get("/get-device-by-id/:id", verifyJWT, getDeviceById);

// POST create a new device
router.post(
  "/create-device",
  verifyJWT,

  deviceUpload.fields([
    { name: "Image", maxCount: 1 },
    { name: "Bill", maxCount: 1 },
  ]),
  createDevice
);

router.put(
  "/edit-device/:id",
  verifyJWT,
  deviceUpload.fields([
    { name: "Image", maxCount: 1 },
    { name: "Bill", maxCount: 1 },
  ]),
  editDevice
);

router.put("/assign-device/:id", verifyJWT, deviceUpload.any(), assignDevice);

router.put(
  "/avail-device/:id",
  verifyJWT,
  deviceUpload.any(),
  makeDeviceAvailable
);

// DELETE delete a device by _id
router.delete("/delete-device/:id", verifyJWT, deleteDevice);

export default router;
