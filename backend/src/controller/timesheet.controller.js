import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Timesheet from "../models/timesheet.model.js";

export const CreateTimesheet = async (req, res) => {
  const {
    projectId,
    sprintName,
    subTaskName,
    date,
    startTime,
    endTime,
    resourceName,
  } = req.body;

  console.log(
    projectId,
    sprintName,
    subTaskName,
    date,
    startTime,
    endTime,
    resourceName
  );

  const newTimesheet = new Timesheet({
    projectId,
    sprintName,
    subTaskName,
    date,
    startTime,
    endTime,
    resourceName,
  });

  const timesheet = await newTimesheet.save();

  const response = new ApiResponse(
    201,
    { timesheet },
    "Timesheet created successfully"
  );

  res.status(201).json(response);
};

// Get all timesheet entries
export const getAllTimesheets = async (req, res) => {
  const { projectId } = req.params;
  
  console.log(projectId);

  const timesheets = await Timesheet.find({ projectId }); // Assuming plans are filtered by projectId

  if (!timesheets || timesheets.length === 0) {
    throw new ApiError(404, "No timesheets found");
  }

  const response = new ApiResponse(
    200,
    timesheets,
    "Timesheets fetched successfully"
  );
  res.status(200).json(response);
};

// Get a single timesheet entry by ID
export const getTimesheetById = async (req, res) => {
  const { id } = req.params;

  try {
    const timesheet = await Timesheet.findById(id).populate(
      "projectId",
      "projectName"
    );

    if (!timesheet) {
      return res.status(404).json({
        success: false,
        message: "Timesheet not found",
      });
    }

    res.status(200).json({
      success: true,
      data: timesheet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch timesheet",
      error: error.message,
    });
  }
};
