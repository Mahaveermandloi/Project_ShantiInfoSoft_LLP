import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Plan from "../models/plan.model.js";

// Create a new plan
const createPlan = asyncHandler(async (req, res) => {
  const {
    epicName,
    shortDescription,
    featureName,
    priority,
    projectStage,
    startDate,
    dueDate,
    estimatedTime,
  } = req.body;

  const { id } = req.params;
  console.log("Received data:", req.body);
  console.log("Received file:", req.file);

  if (!req.file) {
    throw new ApiError(400, "Task documents (file) are required");
  }

  const documentPath = `/uploads/plans/${req.file.filename}`;

  const newPlan = new Plan({
    projectId: id,
    epicName,
    shortDescription,
    featureName,
    priority,
    projectStage,
    startDate: new Date(startDate),
    dueDate: new Date(dueDate),
    estimatedTime,
    taskDocuments: documentPath,
  });

  const savedPlan = await newPlan.save();
  const response = new ApiResponse(201, savedPlan, "Plan created successfully");
  res.status(201).json(response);
});

// Get a plan by ID
const getPlanById = asyncHandler(async (req, res) => {
  const planId = req.params.id;

  const plan = await Plan.findById(planId);

  if (!plan) {
    throw new ApiError(404, "Plan not found");
  }

  const response = new ApiResponse(200, plan, "Plan fetched successfully");
  res.status(200).json(response);
});

const getAllPlans = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const plans = await Plan.find({ projectId: id }); // Assuming plans are filtered by projectId

  if (!plans || plans.length === 0) {
    throw new ApiError(404, "No plans found");
  }

  const response = new ApiResponse(200, plans, "Plans fetched successfully");
  res.status(200).json(response);
});

export { createPlan, getPlanById, getAllPlans };
