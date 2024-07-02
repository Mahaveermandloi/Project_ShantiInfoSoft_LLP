import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getApi, putApi } from "../../Utils/API";
import { toast } from "react-toastify";
import { Toast } from "../../Components/Toast.jsx";

const AssignDevice = ({ assignDevice, setAssignDevice }) => {
  // alert(assignDevice);
  const deviceId = assignDevice;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [employees, setEmployees] = useState([]); // State for storing devices


  const onSubmit = async (data) => {
    try {
      const url = `/api/device/assign-device/${deviceId}`;
      const response = await putApi(data, url);
      console.log("this is response data", response.data);

      if (response.statusCode === 200) {
        toast.success("Device Assigned Successfully");
        setTimeout(() => {
          setAssignDevice(null);
          reset();
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.message || "Some Error Occurred");
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(error.response?.data?.message || "Some Error Occurred");
    }
  };

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
            <h3 className="text-xl font-semibold text-gray-900">Add Device</h3>
            <button
              onClick={() => {
                setAssignDevice(null);
              }}
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div>
                <label
                  htmlFor="device"
                  className="block text-sm font-medium text-gray-700"
                >
                  Receiver:
                </label>
                <select
                  id="employees"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("Name", {
                    required: "Receiver is required",
                  })}
                >
                  <option value="">Select Receiver</option>
                  {employees.map(({ _id, Name, Email }) => (
                    <option key={_id} value={Name}>
                      {Name}
                    </option>
                  ))}
                </select>
                {errors.Name && (
                  <span className="text-red-500 text-sm">
                    {errors.Name.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#ee4f50] text-white px-4 py-2 rounded hover:bg-[#e24b4b]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Assigning ..." : "Assign"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignDevice;
