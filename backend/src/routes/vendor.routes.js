import express from "express";
import {
  createVendor,
  getVendors,
  updateVendor,
  deleteVendor,
} from "../controller/vendor.controller.js";

const router = express.Router();

router.post("/create-vendor", createVendor);

router.get("/get-vendors", getVendors);

router.put("/edit-vendor/:id", updateVendor);

router.delete("/delete-vendor/:id", deleteVendor);

export default router;
