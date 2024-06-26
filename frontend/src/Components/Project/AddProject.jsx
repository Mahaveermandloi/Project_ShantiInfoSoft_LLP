import React from "react";
import { useForm } from "react-hook-form";
import {postApi } from "../../Utils/API";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("this is data ", data);
    const url = "/api/project/create-project";

    // Create a FormData object to handle the file upload
    const formData = new FormData();

    // Append all form fields to the FormData object
    for (const key in data) {
      if (key === "attachments") {
        // Append the file input to the FormData object
        if (data.attachments.length > 0) {
          formData.append("attachments", data.attachments[0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    const response = await postApi(formData, url);
    console.log("Response: ", response);
    if (response.status === 201) {
      navigate("/project");
    }
  };

  const dropdownFields = [
    { label: "Design", name: "design", options: ["Design 1", "Design 2"] },
    {
      label: "HTML",
      name: "html",
      options: ["Not Started", "In Progress", "Completed"],
    },
    { label: "Website", name: "website", options: ["Option 1", "Option 2"] },
    {
      label: "Mobile App",
      name: "mobileApp",
      options: ["Option 1", "Option 2"],
    },
    {
      label: "Backend API",
      name: "backendApi",
      options: ["Option 1", "Option 2"],
    },
    { label: "Database", name: "db", options: ["Option 1", "Option 2"] },
    { label: "QA", name: "qa", options: ["Option 1", "Option 2"] },
    {
      label: "Lead Resource",
      name: "leadResource",
      options: ["Option 1", "Option 2"],
    },
    {
      label: "Code Review",
      name: "codeReview",
      options: ["Option 1", "Option 2"],
    },
  ];

  return (
    <div className="lg:w-10/12 lg:ml-auto">
      <h1 className="text-3xl font-semibold">Add New Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Project Name */}
        <div>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name:
          </label>
          <input
            type="text"
            id="projectName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("projectName", {
              required: "Project name is required",
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
          {errors.projectName && (
            <span className="text-red-500 text-sm">
              {errors.projectName.message}
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          ></textarea>
          {errors.shortDescription && (
            <span className="text-red-500 text-sm">
              {errors.shortDescription.message}
            </span>
          )}
        </div>

        {/* Dynamic Dropdowns */}
        <div className="lg:grid grid-cols-2 flex flex-col gap-4 lg:gap-3 ">
          {dropdownFields.map((field) => (
            <Dropdown
              key={field.name}
              label={field.label}
              name={field.name}
              options={field.options}
              register={register}
              errors={errors}
            />
          ))}
        </div>

        {/* Attachments */}
        <div>
          <label
            htmlFor="attachments"
            className="block text-sm font-medium text-gray-700"
          >
            Attachments:
          </label>
          <input
            type="file"
            id="attachments"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            {...register("attachments")}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
};

export default AddProject;

const Dropdown = ({ label, name, options, register, errors }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register(name, {
          required: `${label} is required`,
        })}
      >
        <option value="">Select Option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};
