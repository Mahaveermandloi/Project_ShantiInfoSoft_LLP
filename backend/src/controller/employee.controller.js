import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Employee from "../models/employees.model.js";

const getEmployees = asyncHandler(async (req, res, next) => {
  const employees = await Employee.find();
  const response = new ApiResponse(
    200,
    employees,
    "Employees fetched successfully"
  );
  res.status(200).json(response);
});

const createEmployee = asyncHandler(async (req, res, next) => {
  const { Name, Email, Job_Role } = req.body;

  // Check if email already exists
  const existingEmployee = await Employee.findOne({ Email });
  if (existingEmployee) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newEmployee = new Employee({
    Name,
    Email,
    Job_Role,
  });

  const savedEmployee = await newEmployee.save();
  const response = new ApiResponse(
    201,
    savedEmployee,
    "Employee created successfully"
  );
  res.status(201).json(response);
});

const updateEmployee = asyncHandler(async (req, res, next) => {
  const employeeId = req.params.id;
  const { Name, Email, Job_Role } = req.body;

  console.log(Name, Email, Job_Role);
  
  // Find the employee to update
  const employeeToUpdate = await Employee.findById(employeeId);
  if (!employeeToUpdate) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (Email !== employeeToUpdate.Email) {
    const existingEmployee = await Employee.findOne({ Email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }

  // Update the employee
  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      Name,
      Email,
      Job_Role,
    },
    { new: true }
  );

  // Check if the update was successful
  if (!updatedEmployee) {
    return res.status(404).json({ message: "Employee not found after update" });
  }

  console.log(updatedEmployee);

  const response = new ApiResponse(
    200,
    updatedEmployee,
    "Employee updated successfully"
  );

  return res.status(200).json(response);
});

const deleteEmployee = asyncHandler(async (req, res, next) => {
  const employeeId = req.params.id;

  const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

  if (!deletedEmployee) {
    throw new ApiError(404, "Employee not found");
  }

  const response = new ApiResponse(
    200,
    deletedEmployee,
    "Employee deleted successfully"
  );
  res.status(200).json(response);
});

const getEmployeeById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const response = new ApiResponse(
    200,
    employee,
    "Employee fetched successfully"
  );

  res.status(200).json(response);
});

export {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
};
