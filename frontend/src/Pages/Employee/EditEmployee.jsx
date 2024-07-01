import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { deleteApi, getApi, postApi, putApi } from "../../Utils/API.js";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEllipsisH } from "react-icons/fa";
import { toast } from "react-toastify";
import { Toast } from "../../Components/Toast.jsx";
import Pagination from "../../Components/Pagination.jsx";
import EmployeeSearchBox from "./EmployeeSearchBox";
import { Svg } from "../../Components/Svg.jsx";
import AddEmployee from "./AddEmployee.jsx";

const EditEmployee = ({ closeModal, employeeId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [employeeData, setEmployeeData] = useState({
    Name: "",
    Email: "",
    Job_Role: "",
  });

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const url = `/api/employee/get-employee-by-id/${employeeId}`;
        const response = await getApi(url); // Implement getApi function to fetch data

        if (response && response.data && response.data.success) {
          const { Name, Email, Job_Role } = response.data.data;
          setEmployeeData({ Name, Email, Job_Role });
        } else {
          console.error(
            "Failed to fetch employee data:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeById();
  }, [employeeId]);

  const onSubmit = async (data) => {
    const url = `/api/employee/edit-employee/${employeeId}`;

    try {
      const response = await putApi(data, url); // Implement postApi function to send data
      console.log(response);
      if (response) {
        toast.success("Employee details updated successfully");
        closeModal();
        reset();
        window.location.reload(); // Reload page or update employee list as needed
      } else {
        console.error(
          "Failed to add employee:",
          response && response.data ? response.data.message : "Unknown error"
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const jobRoles = [
    "UI developer",
    "UX developer",
    "Backend developer",
    "Frontend developer",
    "Software Engineer",
  ];

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full max-w-md max-h-full">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Update Employee
          </h3>
          <button
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center focus:outline-none"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1 6 6m0 0 6-6M7 7l6 6M7 7L1 13"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("Name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum length should be 50 characters",
                  },
                })}
                defaultValue={employeeData.Name} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.Name && (
                <span className="text-red-500 text-sm">
                  {errors.Name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                {...register("Email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                defaultValue={employeeData.Email} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              {errors.Email && (
                <span className="text-red-500 text-sm">
                  {errors.Email.message}
                </span>
              )}
            </div>

            {/* Job Role */}
            <div>
              <label
                htmlFor="jobRole"
                className="block text-sm font-medium text-gray-700"
              >
                Job Role
              </label>
              <select
                id="jobRole"
                {...register("Job_Role", {
                  required: "Job role is required",
                })}
                defaultValue={employeeData.Job_Role} // Set default value
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {/* <option value="">Select a job role</option> */}

                {jobRoles.map((role) => (
                  <option
                    key={role}
                    value={role}
                    defaultValue={employeeData.Job_Role}
                  >
                    {role}
                  </option>
                ))}
              </select>
              {errors.Job_Role && (
                <span className="text-red-500 text-sm">
                  {errors.Job_Role.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
