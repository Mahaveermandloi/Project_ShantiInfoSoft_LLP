// AddEmployee.js
import React from "react";
import { useForm } from "react-hook-form";
import { postApi } from "../../Utils/API";

const AddEmployee = ({ onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data: ", data);
    const url = "/api/project/add-employee"; // Replace with your API endpoint

    try {
      const response = await postApi(url, data);
      console.log("Response: ", response);

      if (response.status === 201) {
        // Handle success, e.g., show success message, update state, etc.
        onCancel(); // Close the form after successful submission
      } else {
        console.error("Failed to add employee:", response.message);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-3xl font-semibold">Add New Employee</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Form fields */}
        <div>
          <label
            htmlFor="employeeName"
            className="block text-sm font-medium text-gray-700"
          >
            Employee Name:
          </label>
          <input
            type="text"
            id="employeeName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("employeeName", {
              required: "Employee name is required",
              minLength: {
                value: 3,
                message: "Minimum length should be 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum length should be 20 characters",
              },
            })}
          />
          {errors.employeeName && (
            <span className="text-red-500 text-sm">
              {errors.employeeName.message}
            </span>
          )}
        </div>

        {/* Other form fields */}
        <div>
          <label
            htmlFor="jobRole"
            className="block text-sm font-medium text-gray-700"
          >
            Job Role:
          </label>
          <input
            type="text"
            id="jobRole"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("jobRole", {
              required: "Job role is required",
            })}
          />
          {errors.jobRole && (
            <span className="text-red-500 text-sm">{errors.jobRole.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status:
          </label>
          <input
            type="text"
            id="status"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("status", {
              required: "Status is required",
            })}
          />
          {errors.status && (
            <span className="text-red-500 text-sm">{errors.status.message}</span>
          )}
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full bg-[#ee4f50] text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
