import React from "react";
import { useForm } from "react-hook-form";
import CloseSvg from "../../../../Components/CloseSvg";
import { postApi } from "../../../../Utils/API";
import { Toast } from "../../../../Components/Toast";
import { toast } from "react-toastify";

const SubTask = ({ setSubTask, planName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const url = `/api/project/create-subtask/${planName}`;
    try {
      const response = await postApi(data, url);
      if (response && response.data && response.data.success) {
        toast.success("Subtask Added Successfully!!");
        setTimeout(() => {
          setSubTask(false);
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
              Add Feature
              <hr />
              {planName}
            </h3>
            <button
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center focus:outline-none"
              onClick={() => {
                setSubTask(false);
              }}
            >
              <CloseSvg />
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
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="hours"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hours (hr:mi):
                </label>
                <input
                  type="text"
                  id="hours"
                  {...register("hours", {
                    required: "Hours is required",
                    validate: {
                      validFormat: (value) =>
                        /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) ||
                        "Invalid time format. Use hr:mi format (e.g., 02:50)",
                    },
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                />
                {errors.hours && (
                  <span className="text-red-500 text-sm">
                    {errors.hours.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type:
                </label>
                <select
                  id="type"
                  {...register("type", { required: "Type is required" })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                >
                  <option value="">Select Type</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Frontend Web">Frontend Web</option>
                  <option value="API/Backend">API/Backend</option>
                  <option value="QA">QA</option>
                  <option value="Frontend Mobile">Frontend Mobile</option>
                  <option value="Design">Design</option>
                </select>
                {errors.type && (
                  <span className="text-red-500 text-sm">
                    {errors.type.message}
                  </span>
                )}
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add SubTask"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubTask;
