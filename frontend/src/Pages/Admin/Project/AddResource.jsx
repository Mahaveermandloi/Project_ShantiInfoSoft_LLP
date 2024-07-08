import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getApi, postApi } from "../../../Utils/API.js";

const AddResource = ({ closeModal, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm();

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const url = `/api/employee/get-employees`;
        const response = await getApi(url);
        console.log(response.data.data);
        setEmployees(response.data.data); // Update devices state with API response data
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchEmployees();
  }, []);

  const { id } = useParams();

  const onSubmit = async (data) => {
    const url = `/api/resource/create-resource/${id}`;

    try {
      // Send formData to the server using postApi function
      const response = await postApi(data, url);

      if (response && response.data && response.data.success) {
        console.log("Resource added successfully:", response.data);

        setIsModalOpen(false);
        closeModal();

        reset();
        window.location.reload();
      } else {
        console.error(
          "Failed to add resource:",
          response && response.data ? response.data.message : "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  const dailyWorkingType = watch("dailyWorkingType");

  useEffect(() => {
    if (dailyWorkingType === "Full-time") {
      setValue("dailyHours", "8");
    } else {
      setValue("dailyHours", "");
    }
  }, [dailyWorkingType, setValue]);

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full max-w-md max-h-full">
        <div className="flex items-center justify-between border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Add Resource</h3>
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
            {/* Resource Name */}
            <div>
              <label
                htmlFor="resourceName"
                className="block text-sm font-medium text-gray-700"
              >
                Resource Name:
              </label>
              <select
                id="employees"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                {...register("resourceName", {
                  required: "Resource is required",
                })}
              >
                <option value="">Select Resource</option>
                {employees.map(({ _id, Name, Email }) => (
                  <option key={_id} value={Name}>
                    {Name}
                  </option>
                ))}
              </select>

              {errors.resourceName && (
                <span className="text-red-500 text-sm">
                  {errors.resourceName.message}
                </span>
              )}
            </div>

            {/* Working Start Date */}
            <div>
              <label
                htmlFor="workingStartDate"
                className="block text-sm font-medium text-gray-700"
              >
                Working Start Date:
              </label>
              <input
                type="date"
                id="workingStartDate"
                {...register("workingStartDate", {
                  required: "Working start date is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.workingStartDate && (
                <span className="text-red-500 text-sm">
                  {errors.workingStartDate.message}
                </span>
              )}
            </div>

            {/* Daily Working Type */}
            <div>
              <label
                htmlFor="dailyWorkingType"
                className="block text-sm font-medium text-gray-700"
              >
                Daily Working Type:
              </label>
              <select
                id="dailyWorkingType"
                {...register("dailyWorkingType", {
                  required: "Daily working type is required",
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              {errors.dailyWorkingType && (
                <span className="text-red-500 text-sm">
                  {errors.dailyWorkingType.message}
                </span>
              )}
            </div>

            {/* Daily Hours */}
            <div>
              <label
                htmlFor="dailyHours"
                className="block text-sm font-medium text-gray-700"
              >
                Daily Hours:
              </label>
              <input
                type="number"
                id="dailyHours"
                {...register("dailyHours", {
                  required: "Daily hours is required",
                  min: {
                    value: 1,
                    message: "Daily hours must be at least 1",
                  },
                  max: {
                    value: 12,
                    message: "Daily hours must not exceed 12",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Daily hours must be a number",
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.dailyHours && (
                <span className="text-red-500 text-sm">
                  {errors.dailyHours.message}
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
                {isSubmitting ? "Adding..." : "Add Resource"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
