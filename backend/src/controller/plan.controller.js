import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Plan from "../models/plan.model.js";
import Subtask from "../models/subtask.model.js";

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

const createSubTask = asyncHandler(async (req, res) => {
  const { name, hours, type } = req.body;
  const { planName } = req.params;
  console.log(name, hours, type, planName);
  try {
    const existingSubtask = await Subtask.findOne({ name });
    if (existingSubtask) {
      return res.status(400).json({
        success: false,
        message: "Subtask with this name already exists",
      });
    }
    const subtask = await Subtask.create({
      name,
      hours,
      type,
      planName,
    });
    const response = new ApiResponse(
      200,
      { subtask },
      "Subtasks fetched successfully"
    );
    // console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetched Subtask",
    });
  }
});

// const getSubTasksByPlanId = asyncHandler(async (req, res) => {
//   const { planId } = req.params;

//   console.log(planId);

//   try {
//     const subtasks = await Subtask.find({ planId });

//     console.log(subtasks);

//     if (!subtasks || subtasks.length === 0) {
//       return res.status(404).json({
//         message: "Subtasks not found for the provided planId",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: subtasks,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch subtasks",
//       error: error.message,
//     });
//   }
// });

const getSubTasksByName = asyncHandler(async (req, res) => {
  const { name } = req.params;

  console.log(name);

  try {
    const subtasks = await Subtask.find({ planName : name });

    console.log(subtasks);

    if (!subtasks || subtasks.length === 0) {
      return res.status(404).json({
        message: "Subtasks not found for the provided planId",
      });
    }

    res.status(200).json({
      success: true,
      data: subtasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subtasks",
      error: error.message,
    });
  }
});



export {
  createPlan,
  getPlanById,
  getAllPlans,
  createSubTask,
  // getSubTasksByPlanId,
  getSubTasksByName,
};
