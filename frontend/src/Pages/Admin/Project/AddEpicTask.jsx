import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { postApi } from "../../../Utils/API.js"; // Assuming you have a postApi function
const AddEpicTask = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { id } = useParams();

  const onSubmit = async (data) => {
    const url = `/api/plan/create-plan/${id}`;

    // Ensure the file is correctly set up in the data object
    if (data.taskDocuments.length === 0) {
      alert("Task documents (file) are required");
      return;
    }

    console.log("this is form data ", data);

    alert(id);
    try {
      const response = await postApi(data, url);

      if (response.status === 201) {
        console.log("Plan created successfully:", response.data);
        navigate(`/project/projectdetail/${id}`); // Redirect to project page on success
      } else {
        console.error("Failed to create plan:", response.data);
        // Handle error scenario as needed
      }
    } catch (error) {
      console.error("Error creating plan:", error);
      // Handle network errors or other exceptions
    }
  };

  const dropdownFields = [
    {
      label: "Priority",
      name: "priority",
      options: ["Low", "Medium", "High", "Critical"],
    },
    {
      label: "Project Stage",
      name: "projectStage",
      options: [
        "Planning",
        "Development",
        "Testing",
        "Deployment",
        "Completed",
      ],
    },
  ];

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-3xl  flex items-center font-semibold">
        <span className="cursor-pointer hover:bg-gray-50">
          <IoArrowBackSharp
            onClick={() => navigate(`/project/projectdetail/${id}`)}
          />
        </span>
        Add New/Epic Task
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Form fields */}
        {/* Epic Name */}
        <div>
          <label
            htmlFor="epicName"
            className="block text-sm font-medium text-gray-700"
          >
            Epic Name:
          </label>
          <input
            type="text"
            id="epicName"
            {...register("epicName", {
              required: "Epic name is required",
              minLength: {
                value: 3,
                message: "Minimum length should be 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum length should be 20 characters",
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.epicName && (
            <span className="text-red-500 text-sm">
              {errors.epicName.message}
            </span>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Short Description:
          </label>
          <textarea
            id="shortDescription"
            {...register("shortDescription", {
              required: "Short description is required",
              minLength: {
                value: 10,
                message: "Minimum length should be 10 characters",
              },
              maxLength: {
                value: 200,
                message: "Maximum length should be 200 characters",
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          {errors.shortDescription && (
            <span className="text-red-500 text-sm">
              {errors.shortDescription.message}
            </span>
          )}
        </div>

        {/* Feature Name */}
        <div>
          <div className="flex items-center text-sm space-x-2">
            <span>
              <IoMdAddCircleOutline size={25} />
            </span>
            <div>Add Feature</div>
          </div>
          <label
            htmlFor="featureName"
            className="block text-sm font-medium text-gray-700"
          >
            Feature Name:
          </label>
          <input
            type="text"
            id="featureName"
            {...register("featureName", {
              required: "Feature name is required",
              minLength: {
                value: 3,
                message: "Minimum length should be 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Maximum length should be 20 characters",
              },
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.featureName && (
            <span className="text-red-500 text-sm">
              {errors.featureName.message}
            </span>
          )}
        </div>

        {/* Dropdowns */}
        <div className="lg:grid grid-cols-2 flex flex-col gap-4 lg:gap-3 ">
          {dropdownFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}:
              </label>
              <select
                id={field.name}
                {...register(field.name, {
                  required: `${field.label} is required`,
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select here</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors[field.name] && (
                <span className="text-red-500 text-sm">
                  {errors[field.name].message}
                </span>
              )}
            </div>
          ))}

          {/* Start Date */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate", { required: "Start date is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.startDate && (
              <span className="text-red-500 text-sm">
                {errors.startDate.message}
              </span>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date:
            </label>
            <input
              type="date"
              id="dueDate"
              {...register("dueDate", { required: "Due date is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.dueDate && (
              <span className="text-red-500 text-sm">
                {errors.dueDate.message}
              </span>
            )}
          </div>

          {/* Estimated Time */}
          <div>
            <label
              htmlFor="estimatedTime"
              className="block text-sm font-medium text-gray-700"
            >
              Estimated Time (hours):
            </label>
            <input
              type="number"
              id="estimatedTime"
              {...register("estimatedTime", {
                required: "Estimated time is required",
                min: {
                  value: 1,
                  message: "Minimum value should be 1 hour",
                },
                max: {
                  value: 1000,
                  message: "Maximum value should be 1000 hours",
                },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.estimatedTime && (
              <span className="text-red-500 text-sm">
                {errors.estimatedTime.message}
              </span>
            )}
          </div>

          {/* Task Documents */}
          <div>
            <label
              htmlFor="taskDocuments"
              className="block text-sm font-medium text-gray-700"
            >
              Task Documents:
            </label>
            <input
              type="file"
              id="taskDocuments"
              {...register("taskDocuments")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Epic Task"}
        </button>
      </form>
    </div>
  );
};

export default AddEpicTask;
