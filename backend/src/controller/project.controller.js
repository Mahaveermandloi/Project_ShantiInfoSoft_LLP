import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Project from "../models/project.model.js"; // Adjust the path as per your project structure

const getProjects = asyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  const response = new ApiResponse(
    200,
    projects,
    "Projects fetched successfully"
  );
  res.status(200).json(response);
});

const getProjectById = asyncHandler(async (req, res, next) => {
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const response = new ApiResponse(
    200,
    project,
    "Project fetched successfully"
  );
  res.status(200).json(response);
});

const createProject = asyncHandler(async (req, res, next) => {
  const {
    projectName,
    shortDescription,
    design,
    html,
    website,
    mobileApp,
    backendApi,
    db,
    qa,
    leadResource,
    codeReview,
  } = req.body;

  const doc = req.file;

  console.log(doc);
  if (!req.file) {
    return res.status(400).json({ message: "Attachment is required" });
  }

  const attachmentPath = `/uploads/project/${doc.filename}`;

  const newProject = new Project({
    projectName,
    shortDescription,
    design,
    html,
    website,
    mobileApp,
    backendApi,
    db,
    qa,
    leadResource,
    codeReview,
    attachments: attachmentPath,
  });

  const savedProject = await newProject.save();
  const response = new ApiResponse(
    201,
    savedProject,
    "Project created successfully"
  );
  res.status(201).json(response);
});

const updateProject = asyncHandler(async (req, res, next) => {
  const projectId = req.params.id;
  const {
    projectName,
    shortDescription,
    design,
    html,
    website,
    mobileApp,
    backendApi,
    db,
    qa,
    leadResource,
    codeReview,
    attachments,
  } = req.body;

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    {
      projectName,
      shortDescription,
      design,
      html,
      website,
      mobileApp,
      backendApi,
      db,
      qa,
      leadResource,
      codeReview,
      attachments,
    },
    { new: true }
  );

  if (!updatedProject) {
    return res.status(404).json({ message: "Project not found" });
  }

  const response = new ApiResponse(
    200,
    updatedProject,
    "Project updated successfully"
  );
  res.status(200).json(response);
});

const deleteProject = asyncHandler(async (req, res, next) => {
  const projectId = req.params.id;

  const deletedProject = await Project.findByIdAndDelete(projectId);

  if (!deletedProject) {
    return res.status(404).json({ message: "Project not found" });
  }

  const response = new ApiResponse(
    200,
    deletedProject,
    "Project deleted successfully"
  );
  res.status(200).json(response);
});

export {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
