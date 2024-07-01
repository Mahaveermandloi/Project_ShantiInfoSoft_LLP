import {
  createPlan,
  getAllPlans,
  getPlanById,
} from "../controller/plan.controller.js";
import {
  createResource,
  getAllResources,
  getResourceById,
} from "../controller/resource.controller.js";
import { deviceUpload , projectUpload } from "../middleware/mutler.middleware.js";
import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/project.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();

router.get("/get-projects", verifyJWT, getProjects);

router.get("/get-project/:id", verifyJWT, getProjectById);

router.post(
  "/create-project",
  verifyJWT,
projectUpload.single("attachments"),
  createProject
);

router.put("/edit-project/:id", verifyJWT, updateProject);

router.delete("/delete-project/:id", verifyJWT, deleteProject);

// ----------------------------------------------------------------------------------
// router.post(
//   "/create-plan/:id",
//   documentUpload.single("taskDocuments"),
//   createPlan
// );

router.post("/create-plan/:id", projectUpload.single("taskDocuments"), createPlan);


router.get("/get-plan/:id", getPlanById);

router.get("/get-all-plans/:id", getAllPlans);

// ----------------------------------------------------------------------------------

router.post("/create-resource/:id", projectUpload.any(), createResource);

router.get("/get-resource/:id", getResourceById);

router.get("/get-all-resources/:id", getAllResources);

export default router;
