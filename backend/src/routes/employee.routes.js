import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controller/employee.controller.js";

import { documentUpload } from "../middleware/mutler.middleware.js";
const router = express.Router();

router.post("/create-employee", documentUpload.any(), createEmployee);

router.get("/get-employees", getEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.put("/edit-employee/:id", documentUpload.any(), updateEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
