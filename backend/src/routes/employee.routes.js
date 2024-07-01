import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
} from "../controller/employee.controller.js";

import { projectUpload } from "../middleware/mutler.middleware.js";
const router = express.Router();

router.post("/create-employee", projectUpload.any(), createEmployee);

router.get("/get-employees", getEmployees);

router.get("/get-employee-by-id/:id", getEmployeeById);

router.put("/edit-employee/:id", projectUpload.any(), updateEmployee);

router.delete("/delete-employee/:id", deleteEmployee);

export default router;
