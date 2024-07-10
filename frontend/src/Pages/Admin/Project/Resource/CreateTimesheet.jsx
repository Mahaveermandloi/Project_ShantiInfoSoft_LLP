import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getApi, postApi } from "../../../../Utils/API.js";
import { Toast } from "../../../../Components/Toast.jsx";
import { toast } from "react-toastify";

const CreateTimesheet = ({ resourceName, setCreateTimesheetModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm();
  const { id } = useParams();
  const [projectName, setProjectName] = useState("");
  const [Sprint, setSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState("");

  const [Subtask, setSubTask] = useState([]);
  const [sprintName, setSprintName] = useState("");

  useEffect(() => {
    const fetchProjectName = async () => {
      const url = `/api/project/get-project/${id}`;
      try {
        const response = await getApi(url);
        console.log("Project Name:", response.data.data.projectName);
        setProjectName(response.data.data.projectName);
      } catch (error) {
        console.error("Error fetching project name:", error);
      }
    };

    const fetchSprints = async () => {
      const url = `/api/plan/get-all-plans/${id}`;
      try {
        const response = await getApi(url);
        console.log("Sprints:", response);
        if (response && response.data && response.data.success) {
          setSprints(response.data.data);
        } else {
          console.error(
            "Failed to fetch sprints:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching sprints:", error);
      }
    };

    fetchSprints();
    fetchProjectName();
  }, [id]);

  useEffect(() => {
    if (sprintName) {
      const fetchSubtasks = async () => {
        const url = `/api/project/get-subtask-by-name/${sprintName}`;
        try {
          const response = await getApi(url);

          setSubTask(response.data.data);
        } catch (error) {
          console.error("Error fetching subtasks:", error);
        }
      };

      fetchSubtasks();
    }
  }, [sprintName]);

  const onSubmit = async (data) => {
    const startTime = data.startTime;
    const endTime = data.endTime;

    if (startTime >= endTime) {
      setError("endTime", {
        type: "manual",
        message: "End time must be greater than start time",
      });
      return;
    } else {
      clearErrors("endTime");
    }

    try {
      const url = `/api/timesheet/create-timesheet`;

      const payload = { ...data, projectId: id, resourceName: resourceName };

      const response = await postApi(payload, url);

      console.log(response.data.statusCode);

      if (response.data.statusCode === 201) {
        toast.success("Timesheet Created Successfully!!");
      }
      setTimeout(() => {
        reset();
        setCreateTimesheetModal(false);
      }, 500);
    } catch (error) {
      console.error("Error creating timesheet", error);
    }
  };

  return (
    <>
      <Toast />
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-5 w-full max-w-md max-h-full">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {resourceName}
              <br />
              Create Timesheet
            </h3>
            <button
              onClick={() => setCreateTimesheetModal(false)}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center focus:outline-none"
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
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  disabled
                  defaultValue={projectName}
                />
              </div>

              <div>
                <label
                  htmlFor="sprint"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sprint:
                </label>
                <select
                  id="sprint"
                  {...register("sprintName", {
                    required: "Sprint is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedSprint(selectedValue);
                    setSprintName(selectedValue);
                  }}
                >
                  <option value="">Select Sprint</option>
                  {Sprint.map(({ epicName, _id }) => (
                    <option key={_id} value={epicName}>
                      {epicName}
                    </option>
                  ))}
                </select>
                {errors.sprintName && (
                  <span className="text-red-500 text-sm">
                    {errors.sprintName.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="subtask"
                  className="block text-sm font-medium text-gray-700"
                >
                  SubTask:
                </label>
                <select
                  id="subtask"
                  {...register("subTaskName", {
                    required: "Subtask is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm  "
                >
                  <option value="">Select SubTask</option>
                  {Subtask.map(({ name, _id }) => (
                    <option key={_id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {errors.subTaskName && (
                  <span className="text-red-500 text-sm">
                    {errors.subTaskName.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date", {
                    required: "Date is required",
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    {errors.date.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time:
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    {...register("startTime", {
                      required: "Start time is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.startTime && (
                    <span className="text-red-500 text-sm">
                      {errors.startTime.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time:
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    {...register("endTime", {
                      required: "End time is required",
                    })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.endTime && (
                    <span className="text-red-500 text-sm">
                      {errors.endTime.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Timesheet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTimesheet;
