import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import { useForm } from "react-hook-form";
import { getApi, postApi } from "../../Utils/API.js";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FaEllipsisH } from "react-icons/fa";

const Resource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const url = `/api/resource/get-all-resources/${id}`;
        const response = await getApi(url);

        if (response && response.data && response.data.success) {
          setResources(response.data.data);
          const total = Math.ceil(response.data.data.length / itemsPerPage);
          setTotalPages(total);
        } else {
          console.error(
            "Failed to fetch resources:",
            response && response.data ? response.data.message : "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [id]);

  const itemsPerPage = 5; // Adjust based on your pagination needs

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredResources = resources.filter((resource) =>
    resource.resourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableHeaders = [
    "Name",
    "Working Start Date",
    "Department",
    "Daily Working Type",
  ];

  return (
    <>
      <div>
        <div className="flex lg:justify-end">
          <div className="flex space-x-5">
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="p-2 bg-gray-100 w-[250px] rounded-l-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <CiSearch size={40} className="bg-gray-100 p-2 rounded-r-md" />
           
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className=" bg-[#ee4f50] flex space-x-2 items-center p-2 rounded-lg text-white"
            >
              <span className="text-white">
                <NoteAddIcon />
              </span>
              <span className="hidden lg:block">Add Resource</span>
            </button>
          </div>
        </div>

        <div>
          <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
            {/* TABLE */}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-base text-black bg-gray-50 dark:text-gray-400">
                <tr>
                  {tableHeaders.map((header, index) => (
                    <th scope="col" className="px-6 py-3" key={index}>
                      <div className="flex items-center text-black">
                        {header}
                      </div>
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No resources found
                    </td>
                  </tr>
                ) : (
                  filteredResources
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((resource) => (
                      <tr key={resource._id} className="bg-white border-b">
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {resource.resourceName}
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {new Date(
                            resource.workingStartDate
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          Department Name
                        </td>
                        <td className="px-6 py-4 text-gray-900 whitespace-nowrap">
                          {resource.dailyWorkingType}
                        </td>
                        <td className="px-6 py-4">
                          <FaEllipsisH
                            onClick={() => navigate("/project/projectdetail")}
                          />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {isModalOpen && <AddTask closeModal={closeModal} />}

          {/* Pagination */}
          <nav
            className="mt-4 flex justify-center"
            aria-label="Page navigation"
          >
            <ul className="inline-flex space-x-2">
              <li>
                <button
                  className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    className={`px-3 py-2 rounded-md ${
                      index + 1 === currentPage
                        ? "bg-[#ee4f50] text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={`px-3 py-2 bg-gray-200 rounded-md text-gray-700 ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-300"
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Resource;
// --------------------------------------------------------------------------

const AddTask = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { id } = useParams();

  const onSubmit = async (data) => {
    const url = `/api/resource/create-resource/${id}`;

    try {
      // Send formData to the server using postApi function
      const response = await postApi(data, url);

      if (response && response.data && response.data.success) {
        console.log("Resource added successfully:", response.data);

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
              <input
                type="text"
                id="resourceName"
                {...register("resourceName", {
                  required: "Resource name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum length should be 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum length should be 50 characters",
                  },
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
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
                type="text"
                id="dailyHours"
                {...register("dailyHours", {
                  required: "Daily hours is required",
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
