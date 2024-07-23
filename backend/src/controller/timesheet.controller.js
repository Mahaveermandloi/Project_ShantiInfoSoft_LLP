import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Timesheet from "../models/timesheet.model.js";
import Employee from "../models/employees.model.js";

export const CreateTimesheet = asyncHandler(async (req, res) => {
  const {
    projectId,
    sprintName,
    subTaskName,
    date,
    totalTime,
    resourceName,
    department,
  } = req.body;

  // console.log(
  //   projectId,
  //   sprintName,
  //   subTaskName,
  //   date,
  //   totalTime,
  //   resourceName,
  //   department
  // );

  const newTimesheet = new Timesheet({
    projectId,
    sprintName,
    subTaskName,
    date,
    totalTime,
    resourceName,
  });

  const timesheet = await newTimesheet.save();

  const response = new ApiResponse(
    201,
    { timesheet },
    "Timesheet created successfully"
  );

  res.status(201).json(response);
});

// Get all timesheet entries
export const getAllTimesheets = asyncHandler(async (req, res) => {
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
});

// Get a single timesheet entry by ID
export const getTimesheetById = asyncHandler(async (req, res) => {
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
});

export const getTimesheetByDepartment = asyncHandler(async (req, res) => {
  const { department, sprintName } = req.query; // Retrieve from req.query for GET requests

  console.log(department, sprintName);

  if (!department || !sprintName) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Department and Sprint Name are required"));
  }

  // Fetch employees in the given department
  const employees = await Employee.find({ Job_Role: department });

  if (!employees.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No employees found in the given department"));
  }

  // Fetch timesheets for those employees in the given sprint
  const employeeNames = employees.map((emp) => emp.Name);

  const timesheets = await Timesheet.find({
    resourceName: { $in: employeeNames },
    sprintName,
  });

  if (!timesheets.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No timesheets found for the given sprint"));
  }

  // Aggregate total hours worked for each employee in that sprint
  const hoursWorked = {};
  timesheets.forEach((timesheet) => {
    const { resourceName, totalTime } = timesheet;
    if (!hoursWorked[resourceName]) {
      hoursWorked[resourceName] = 0;
    }
    hoursWorked[resourceName] += totalTime;
  });

  // Format the result
  const result = Object.keys(hoursWorked).map((resourceName) => ({
    resourceName,
    totalHours: hoursWorked[resourceName],
  }));

  res
    .status(200)
    .json(new ApiResponse(200, result, "Timesheets fetched successfully"));
});
