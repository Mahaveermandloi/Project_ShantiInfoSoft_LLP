import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Resource from "../models/resource.model.js";
import Project from "../models/project.model.js"; // Import the Project model
import Employee from "../models/employees.model.js";
// Create a new resource
const createResource = asyncHandler(async (req, res) => {
  const { resourceId, workingStartDate, dailyWorkingType, dailyHours } =
    req.body;
  const { id } = req.params;

  if (
    !id ||
    !resourceId ||
    !workingStartDate ||
    !dailyWorkingType ||
    !dailyHours
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Find the employee to get the resourceName

  const employee = await Employee.findById(resourceId);
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }
  const resourceName = employee.Name;
  const department = employee.Job_Role;

  const newResource = new Resource({
    projectId: id,
    resourceName,
    workingStartDate: new Date(workingStartDate),
    dailyWorkingType,
    dailyHours,
    department,
  });

  const savedResource = await newResource.save();

  const response = new ApiResponse(
    201,
    savedResource,
    "Resource created successfully"
  );
  res.status(201).json(response);
});
// Get a resource by ID
const getResourceById = asyncHandler(async (req, res) => {
  const resourceId = req.params.id;

  const resource = await Resource.findById(resourceId);

  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  const response = new ApiResponse(
    200,
    resource,
    "Resource fetched successfully"
  );
  res.status(200).json(response);
});

const getAllResources = asyncHandler(async (req, res) => {
  // Fetch all resources from database

  const { id } = req.params;

  const resources = await Resource.find({ projectId: id });

  // If no resources found, throw an error
  if (!resources || resources.length === 0) {
    throw new ApiError(404, "No resources found");
  }

  // Create success response
  const response = new ApiResponse(
    200,
    resources,
    "All resources fetched successfully"
  );
  res.status(200).json(response);
});

export { createResource, getResourceById, getAllResources };
