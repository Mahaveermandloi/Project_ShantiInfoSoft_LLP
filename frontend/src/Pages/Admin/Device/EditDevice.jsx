import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { postApi, putApi, getApi } from "../../../Utils/API";
import { toast } from "react-toastify";
import { Toast } from "../../../Components/Toast";

const EditDevice = ({ closeModal, deviceId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    const fetchDeviceById = async () => {
      try {
        const url = `/api/device/get-device-by-id/${deviceId}`;
        const response = await getApi(url);
        if (response.status === 200) {
          const device = response.data.data;
          setValue("DeviceName", device.DeviceName);
          setValue("Category", device.Category);
          setValue("VendorName", device.VendorName);
          setValue("PurchasedDate", device.PurchasedDate);
          setValue("WarrantyStartDate", device.WarrantyStartDate);
          setValue("WarrantyYear", device.WarrantyYear);
          setValue("WarrantyMonth", device.WarrantyMonth);

          setDeviceData(device);
        } else {
          console.error(
            "Failed to fetch device details:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching device details:", error);
      }
    };

    if (deviceId) {
      fetchDeviceById();
    }
  }, [deviceId, setValue]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const url = `/api/device/edit-device/${deviceId}`;
      const response = await putApi(data, url, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.statusCode === 200) {
        toast.success("Device Updated Successfully!!");
        setTimeout(() => {
          closeModal();
          reset();
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error in Updating ");
      }
    } catch (error) {
      console.error("Error updating device:", error);
      alert("Some error occurred");
    }
  };

  const startYear = 2020;
  const numYears = 30;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const categories = ["Mouse", "Keyboard", "HeadPhone", "Laptop", "Printer"]; // Example categories

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
            <h3 className="text-xl font-semibold text-gray-900">Edit Device</h3>
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 max-h-[500px] lg:max-h-[600px] overflow-y-scroll"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Device Name */}
              <div>
                <label
                  htmlFor="deviceName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Device Name:
                </label>
                <input
                  type="text"
                  id="deviceName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("DeviceName", {
                    required: "Device name is required",
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
                {errors.DeviceName && (
                  <span className="text-red-500 text-sm">
                    {errors.DeviceName.message}
                  </span>
                )}
              </div>
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category:
                </label>
                <select
                  id="category"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("Category", {
                    required: "Category is required",
                  })}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.Category && (
                  <span className="text-red-500 text-sm">
                    {errors.Category.message}
                  </span>
                )}
              </div>
              {/* Vendor Name */}
              <div>
                <label
                  htmlFor="vendorName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vendor Name:
                </label>
                <input
                  type="text"
                  id="vendorName"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("VendorName", {
                    required: "Vendor name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length should be 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Maximum length should be 50 characters",
                    },
                  })}
                />
                {errors.VendorName && (
                  <span className="text-red-500 text-sm">
                    {errors.VendorName.message}
                  </span>
                )}
              </div>
              {/* Purchased Date */}
              <div>
                <label
                  htmlFor="purchasedDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Purchased Date:
                </label>
                <input
                  type="date"
                  id="purchasedDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("PurchasedDate", {
                    required: "Purchased date is required",
                  })}
                />
                {errors.PurchasedDate && (
                  <span className="text-red-500 text-sm">
                    {errors.PurchasedDate.message}
                  </span>
                )}
              </div>
              {/* Warranty Start Date */}
              <div>
                <label
                  htmlFor="warrantyStartDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Warranty Start Date:
                </label>
                <input
                  type="date"
                  id="warrantyStartDate"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  {...register("WarrantyStartDate", {
                    required: "Warranty start date is required",
                  })}
                />
                {errors.WarrantyStartDate && (
                  <span className="text-red-500 text-sm">
                    {errors.WarrantyStartDate.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Warranty Year */}
                <div className="">
                  <label
                    htmlFor="warrantyYear"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Warranty Year:
                  </label>
                  <select
                    id="warrantyYear"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register("WarrantyYear", {
                      required: "Warranty year is required",
                    })}
                  >
                    <option value="">Select Year</option>
                    {years.map((year, index) => (
                      <option key={index} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.WarrantyYear && (
                    <span className="text-red-500 text-sm">
                      {errors.WarrantyYear.message}
                    </span>
                  )}
                </div>
                {/* Warranty Month */}
                <div>
                  <label
                    htmlFor="warrantyMonth"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Warranty Month:
                  </label>
                  <select
                    id="warrantyMonth"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    {...register("WarrantyMonth", {
                      required: "Warranty month is required",
                    })}
                  >
                    <option value="">Select Month</option>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  {errors.WarrantyMonth && (
                    <span className="text-red-500 text-sm">
                      {errors.WarrantyMonth.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Device Image */}
                <div>
                  <label
                    htmlFor="deviceImage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Device Image:
                  </label>
                  <input
                    type="file"
                    id="Image"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    {...register("Image")}
                    accept="image/*"
                  />
                  {errors.Image && (
                    <span className="text-red-500 text-sm">
                      {errors.Image.message}
                    </span>
                  )}
                </div>
                {/* Bill */}
                <div>
                  <label
                    htmlFor="bill"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bill:
                  </label>
                  <input
                    type="file"
                    id="bill"
                    {...register("Bill")}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
                  />
                  {errors.Bill && (
                    <span className="text-red-500 text-sm">
                      {errors.Bill.message}
                    </span>
                  )}
                </div>
              </div>
              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ee4f50] hover:bg-[#dc4949] "
                >
                  {isSubmitting ? "Updating..." : "Update Device"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDevice;
